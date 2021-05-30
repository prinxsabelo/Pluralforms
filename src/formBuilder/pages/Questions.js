import { useContext } from "react";
import Backdrop from "../../shared/collection/Backdrop";
import Button from "../../shared/collection/Button";
import QDrawer from "../../shared/collection/QDrawer";
import { QuestionContext } from "../../shared/contexts/question-context";
import QuestionList from "../questions/components/QuestionList";

const Questions = () => {
  const {
    form,
    drawerIsOpen,
    setDrawerIsOpen,
    setTypeAction,
    setQDrawerPosition,
  } = useContext(QuestionContext);
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

  return (
    <div>
      {form && (
        <>
          <div className="flex p-1 md:hidden">
            <input
              placeholder="Search Question"
              className="border h-8 border-red-500 w-full p-2 rounded-lg focus:rounded-lg"
            />
          </div>
          {form && form.questions.length > 0 ? (
            <>
              <QuestionList questions={form.questions} />
              <div className="md:hidden absolute bottom-1 p-2 w-full flex justify-between items-center bg-white">
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
              <div className="flex flex-col w-full justify-center items-center">
                <div>Feel free to create questions..</div>
                <Button
                  onClick={addQuestion}
                  className="bg-gray-900 py-2 w-1/2 uppercase"
                >
                  Create Question
                </Button>
              </div>
            </>
          )}
        </>
      )}
      <QDrawer show={drawerIsOpen} />
      {drawerIsOpen && <Backdrop onClick={closeDrawer} />}
    </div>
  );
};
export default Questions;
