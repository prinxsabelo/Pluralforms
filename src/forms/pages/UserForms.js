import { useContext, useEffect, useState } from "react";


// import DeleteModal from "../../shared/collection/DeleteModal";
import { Context } from "../../shared/contexts/context";
import { FormContext } from "../../shared/contexts/form.context";
import CustomHeader from "../../shared/header/CustomHeader";
import FormList from "../component/FormList";
import ClosedFormList from "../component/ClosedFormList";
import { useHttpClient } from "../../shared/hooks/http-hook";

// import { useHistory } from "react-router-dom";
import LoadingSpinner from "../../shared/collection/LoadingSpinner.";
import FormDialog from "../../shared/collection/FormDialog";
import DeleteModal from "../../shared/collection/DeleteModal";
import { toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ReactComponent as NoForm } from '../../assets/no-form.svg';
import { ReactComponent as Empty } from '../../assets/empty.svg';

import Button from "../../shared/collection/Button";
import { BuildQuestionContext } from "../../shared/contexts/build-question.context";
const UserForms = () => {

  const { openDeleteModal, showDialog, setDialogContent, closeDeleteModal } = useContext(Context);
  // const history = useHistory();
  const { upForm, setUpForm, resetUpForm } = useContext(FormContext);
  const { setQuestionDetail } = useContext(BuildQuestionContext);
  const [formId, setFormId] = useState();
  if (formId) { }
  const { isLoading, sendRequest } = useHttpClient();
  const [forms, setForms] = useState([{ form_id: null }]);
  const [closedForms, setClosedForms] = useState([]);
  // const [loading, setLoading] = useState(false);
  const [showFormDialog, setShowFormDialog] = useState(false);
  const [loadForms, setLoadForms] = useState(false);
  const { addForm } = useContext(FormContext);

  useEffect(() => {
    const ac = new AbortController();

    const fetchForms = async () => {
      try {
        const data = await sendRequest(`https://pluralforms.com/pluralforms-api/public/api/user/forms`);
        if (data) {
          let activeForms = data.filter(f => f.status === "ACTIVE");
          // console.log(activeForms);
          setForms(activeForms);
          let closedForms = data.filter(c => c.status !== "ACTIVE");
          setClosedForms(closedForms);
          setLoadForms(true)
        }


      } catch {
        NotifyError('An errror occured..')
        setForms([]);
        setClosedForms([]);
        setLoadForms(true)

      }
    }
    if (!loadForms) {
      fetchForms();
    }
    if (upForm) {
      const { form, fix } = upForm;
      //Update form here..
      if (fix === "update") {
        setLoadForms(false);
        resetUpForm({ form, fix });
      } else {
        //Or rather update form..
        setForms([...forms, form]);
        resetUpForm({ form, fix });

      }


    }
    //Setting to empty to avoid showing question for one form in another form for large device.. 
    setQuestionDetail();
    return () => ac.abort(); // Abort both fetches on unmount
  }, [setQuestionDetail, sendRequest, loadForms, upForm, forms, setForms, setUpForm, resetUpForm]);

  const checkDelete = (form_id) => {
    setFormId(form_id);
    openDeleteModal();
  };
  const deleteForm = async () => {
    closeDeleteModal();
    try {
      let form_id = formId;
      const data = await sendRequest(`https://pluralforms.com/pluralforms-api/public/api/user/forms/delete`, 'DELETE', JSON.stringify({ form_id }));
      if (data) {
        const newClosedForms = closedForms.filter(f => f.form_id !== form_id);
        setClosedForms(newClosedForms);
      }
    } catch { }

  }
  const NotifySuccess = (message) => {
    toast.configure();
    const notify = () => toast.success(`${message} 😎`, {
      transition: Zoom,
      position: "bottom-center",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: 0,

    })
    notify();
  }

  const NotifyError = (message) => {
    toast.configure();
    const notify = () => toast.error(`${message} `, {
      transition: Zoom,
      position: "bottom-center",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: 0,

    })
    notify();
  }
  const updateForm = (form) => {
    console.log(form);
  }
  const closeForm = async (form) => {
    const { form_id } = form;
    const data = await sendRequest(`https://pluralforms.com/pluralforms-api/public/api/user/forms/close`, 'PUT', JSON.stringify({ form_id }));
    if (data) {
      const newActiveForms = forms.filter(f => f.form_id !== form_id);
      setForms(newActiveForms);
      // console.log(newActiveForms);
      setClosedForms([...closedForms, data]);
      NotifySuccess('Form closed successfully..')

    }
  }
  const restoreForm = async (form) => {
    const { form_id } = form;
    const data = await sendRequest(`https://pluralforms.com/pluralforms-api/public/api/user/forms/restore`, 'PUT', JSON.stringify({ form_id }));
    if (data) {
      const newClosedForms = closedForms.filter(f => f.form_id !== data.form_id);
      setClosedForms(newClosedForms);
      setForms([...forms, data]);
      NotifySuccess('Form restored successfully..')
    }

  }

  const copyForm = async (form) => {
    //Function here computes and all all numbers found in string..
    function sum_digits_from_string(dstr) {
      var dsum = 0;

      for (var i = 0; i < dstr.length; i++) {

        if (/[0-9]/.test(dstr[i])) dsum += parseInt(dstr[i])
      }
      return dsum;
    }
    // Firstly fetch out the form from the list of forms..
    const filteredForm = forms.find(({ form_id }) => form_id === form.form_id);
    console.log(filteredForm);

    let form_title = "";
    //Then replace all numbers and brackets found and keep safe first..
    form_title = filteredForm.title.replace(/[0-9]/g, "");
    form_title = form_title.replace(/\(\)/g, "");
    filteredForm.title = form_title;

    // Generate a length for new form here..
    form_title = form_title + forms.filter(f => String(f.title).startsWith(form_title)).length;

    // Adding up all digits in form here.. 
    let sum = sum_digits_from_string(form_title);
    //Then enclosing form in brances here..
    filteredForm.title = `${filteredForm.title}(${sum})`;

    const { title, } = filteredForm;
    const { form_id } = form;
    console.log(title, form.form_id);
    try {
      const data = await sendRequest(`https://pluralforms.com/pluralforms-api/public/api/user/forms/copy`, 'POST',
        JSON.stringify({ title, form_id }));
      if (data) {
        // console.log(data);
        // const newForms = [...forms, data];
        // console.log(newForms);
        // setForms();
        // setForms(newForms);
        setLoadForms(false);
        NotifySuccess('Form copied successfully..')
      }
    } catch { }



  }
  const renameForm = (form) => {
    // console.log(form);

    // Dialog is being opened right here..
    if (form) {
      const { title, form_id } = form;
      setShowFormDialog(true)
      setDialogContent({
        header: "Edit Form",
        placeholder: "form name.",
        type: "form",
        form: { title, form_id },
      });
      showDialog(true);

    }

  }
  return (
    <>

      <div className="md:mx-2 h-screen relative overflow-y-hidden">
        <CustomHeader />
        <>
          {isLoading &&

            <LoadingSpinner asOverlay />

          }
          {!isLoading && forms &&
            <>
              {window.location.pathname === `/user/forms` || window.location.pathname === `/user` ?
                <>
                  {
                    forms.length > 0 ?
                      <FormList forms={forms} copyForm={copyForm} renameForm={renameForm} closeForm={closeForm} />
                      :
                      <div className="absolute top-20 left-50 bottom-0 left-0 right-0 flex flex-col items-center justify-center space-y-6 ">
                        <div>
                          <NoForm width="100%" height="100%" />
                        </div>
                        <div className="flex flex-col space-y-4 items-center">
                          <div className="text-3xl ">
                            No form found
                          </div>
                          <div className="text-base  tracking-wider">
                            Feel free to create a form too..
                          </div>
                          <div>
                            <Button onClick={() => addForm()}
                              className="bg-gray-900 tracking-wider w-56 h-12
                                             text-lg uppercase md:text-lg ">Create Form</Button>
                          </div>
                        </div>
                      </div>

                  }
                </>
                :
                <>
                  {
                    closedForms.length > 0 ?
                      <ClosedFormList closedForms={closedForms} checkDelete={checkDelete} restoreForm={restoreForm} />
                      :
                      <div className="absolute top-20 left-50 bottom-0 left-0 right-0 flex flex-col items-center justify-center space-y-6 ">
                        <div>
                          <Empty width="100%" height="100%" />
                        </div>
                        <div className="flex flex-col space-y-4 items-center">
                          <div className="text-3xl">
                            You have no closed form..
                          </div>

                        </div>
                      </div>
                  }
                </>
              }
            </>

          }

          {forms && forms.length > 0 &&
            <div className="flex fixed bottom-0 left-0 right-0 md:hidden w-full justify-center my-1 mt-3 py-1 bg-gray-50">
              <button className={`text-gray-100 bg-gray-900 rounded-lg  tracking-widest
                               w-full mx-1 p-3  uppercase text-base font-bold
                                ${window.location.pathname.search('closed_forms') === -1 ? 'visible' : 'invisible'}
                              `}
                onClick={() => addForm()}>Create Form</button>
            </div>
          }
        </>



      </div>
      <DeleteModal
        onDelete={deleteForm}
        message="Do you really want to delete form?"
      />
      <FormDialog dialog={showFormDialog} updateForm={updateForm} />


    </>
  );
};
export default UserForms;
