import { useContext, useEffect, useState } from "react";


import DeleteModal from "../../shared/collection/DeleteModal";
import { Context } from "../../shared/contexts/context";
import { FormContext } from "../../shared/contexts/form-context";
import CustomHeader from "../../shared/header/CustomHeader";
import FormList from "../component/FormList";
const UserForms = () => {
  const { openDeleteModal, closeModal } = useContext(Context);
  const { deleteForm, getForms, forms } = useContext(FormContext);
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

  return (
    <>
      <div className="md:mx-2">
        <CustomHeader />
        {forms &&
          <FormList forms={forms} checkDelete={checkDelete} />
        }

      </div>
      <DeleteModal
        onDelete={handleDelete}
        message="Hmnm.. Really want to erase form?"
      />
    </>
  );
};
export default UserForms;
