import { useContext, useEffect, useState } from "react";


import DeleteModal from "../../shared/collection/DeleteModal";
import { Context } from "../../shared/context/context";
import { FormContext } from "../../shared/context/form-context";
import CustomHeader from "../../shared/header/CustomHeader";
import FormList from "../component/FormList";
const UserForms = () => {
  const { openDeleteModal, closeModal } = useContext(Context);
  const { deleteForm, getForms } = useContext(FormContext);
  const [formId, setFormId] = useState();
  const [forms, setForms] = useState([]);
  useEffect(() => {
    getForms();
  }, [getForms]);
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
        {/* {forms &&
          <FormList forms={forms} checkDelete={checkDelete} />
        } */}

      </div>
      <DeleteModal
        onDelete={handleDelete}
        message="Hmnm.. Really want to erase form?"
      />
    </>
  );
};
export default UserForms;
