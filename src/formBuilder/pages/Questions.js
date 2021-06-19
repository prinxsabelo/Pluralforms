import { useContext } from "react";
import { useState } from "react/cjs/react.development";
import Backdrop from "../../shared/collection/Backdrop";
import Button from "../../shared/collection/Button";
import EditModal from "../../shared/collection/EditModal";
import QDrawer from "../../shared/collection/QDrawer";
import { BuildQuestionContext } from "../../shared/contexts/build-question.context";
import { Context } from "../../shared/contexts/context";
import { FormContext } from "../../shared/contexts/form.context";
import QuestionList from "../questions/components/QuestionList";

const Questions = () => {
  const [editType, setEditType] = useState("");
  const {
    form,
    drawerIsOpen,
    setDrawerIsOpen,
    setTypeAction,
    setQDrawerPosition,

  } = useContext(BuildQuestionContext);
  const { openEditModal, closeEditModal } = useContext(Context);
  const { submitForm } = useContext(FormContext);
  const addQuestion = () => {
    drawerIsOpen ? closeDrawer() : openDrawer();
  };
  const openDrawer = () => {
    setTypeAction("new");
    setQDrawerPosition("left");
    setDrawerIsOpen(true);
  };
  const closeDrawer = () => {
    setDrawerIsOpen(false);
  };
  const edit = (data) => {
    submitForm(data);
    closeEditModal();
  }
  const handleEdit = (param) => {
    setEditType(param);
    openEditModal();
  }
  return (
    <div>
      {form && (
        <>
          {/* Here questions exist already for form.. */}
          {form.questions && form.questions.length > 0 ? (
            <>
              <QuestionList questions={form.questions} />

              <div className="flex py-1 space-x-1 w-full border-b-2 justify-end px-2">
                <Button className="bg-red-500 uppercase py-2 text-xs  truncate" onClick={() => handleEdit("logo")}>Logo</Button>
                <Button
                  className={` uppercase py-2 text-xs  truncate
                            ${form && form.begin_header ? 'bg-purple-500' : 'bg-red-500'}`}
                  onClick={() => handleEdit("begin")}> Edit Welcome Page</Button>
                <Button
                  className={` uppercase py-2 text-xs  truncate
                         ${form && form.end_header ? 'bg-purple-500' : 'bg-red-500'}`}
                  onClick={() => handleEdit("end")}> Edit Thank you Page</Button>
              </div>
              <div className="md:hidden p-1 w-full flex justify-between items-center bg-white">
                <div>Total Questions = {form.questions.length}</div>
                <Button
                  onClick={addQuestion}
                  className="bg-gray-900 py-3 uppercase"
                >
                  Create Question
                </Button>
              </div>
            </>
          ) : (
            <>
              {/* Starting afresh here.. */}
              <div className="flex flex-col  w-full justify-center items-center">
                <div>Feel free to create questions..</div>
                <Button
                  onClick={addQuestion}
                  className="bg-gray-900 py-2 w-1/2 uppercase text-base"
                >
                  Create Question
                </Button>
              </div>
              <div className="flex flex-col justify-center py-4  w-full items-center mt-2 space-y-2 justify-center border-b-2">
                <Button className="bg-red-500 uppercase py-2 text-xs w-1/2">Logo</Button>
                <Button
                  className={`uppercase py-2 text-xs w-1/2
                    ${form && form.begin_header ? 'bg-purple-500' : 'bg-red-500'} `}
                  onClick={() => handleEdit("begin")}> Edit Welcome Page </Button>
                <Button
                  className={`bg-red-500 uppercase py-2 text-xs w-1/2
                     ${form && form.end_header ? 'bg-purple-500' : 'bg-red-500'}`}
                  onClick={() => handleEdit("end")} > Edit Thank you Page</Button>
              </div>
            </>
          )}

        </>
      )}
      <QDrawer show={drawerIsOpen} />
      {drawerIsOpen && <Backdrop onClick={closeDrawer} />}
      <EditModal onEdit={edit} editType={editType} form={form} />
    </div>
  );
};
export default Questions;
