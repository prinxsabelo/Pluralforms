import { useContext, useEffect, useState } from "react";


import DeleteModal from "../../shared/collection/DeleteModal";
import { Context } from "../../shared/contexts/context";
import { FormContext } from "../../shared/contexts/form.context";
import CustomHeader from "../../shared/header/CustomHeader";
import FormList from "../component/FormList";
import ClosedFormList from "../component/ClosedFormList";

const UserForms = () => {
  const { openDeleteModal, closeModal } = useContext(Context);
  const { deleteForm, getForms, forms, closedForms, closeForm, restoreForm } = useContext(FormContext);
  const [formId, setFormId] = useState();
  const [checker, setChecker] = useState(false);
  useEffect(() => {


    if (!checker) {
      console.log('xx');
      getForms();
      if (forms) {
        setChecker(true);
      }
    }

    // console.log(forms);
  }, [forms, getForms, checker]);
  const checkDelete = (form_id) => {
    setFormId(form_id);
    openDeleteModal();
  };
  const handleDelete = () => {
    closeModal();
    deleteForm(formId);
  };
  const close = (form) => {
    closeForm(form);
    alert('form closed..')
  }
  const restore = (form) => {
    restoreForm(form);
    alert('restored..');
  }
  return (
    <>
      <div className="md:mx-2">
        <CustomHeader />
        <>
          {window.location.pathname === `/user/forms` ?
            <>
              <FormList forms={forms} checkDelete={checkDelete} closeForm={close} />
            </>
            :
            <>
              <ClosedFormList closedForms={closedForms} checkDelete={checkDelete} restoreForm={restore} />
            </>
          }
        </>


      </div>
      <DeleteModal
        onDelete={handleDelete}
        message="Hmnm.. Really want to erase form?"
      />
    </>
  );
};
export default UserForms;
