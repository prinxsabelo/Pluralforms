import { useContext, useEffect, useState, } from "react";
import Backdrop from "../../shared/collection/Backdrop";
import Button from "../../shared/collection/Button";
import QDrawer from "../../shared/collection/QDrawer";
import QTypeIcon from "../../shared/collection/QTypeIcon";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/outline";
import { BuildQuestionContext } from "../../shared/contexts/build-question.context";
const BuildHeader = (props) => {
  const { children, } = props;
  const { questionDetail, developQuestion, questionTypes, setGoToQuestion } = useContext(BuildQuestionContext)
  useEffect(() => {

  }, [])
  const [currentType, setCurrentType] = useState("");
  const [typeAction, setTypeAction] = useState("");
  const [qDrawerPosition, setQDrawerPosition] = useState("left");
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const qType = questionTypes.find((qt) => qt.type === questionDetail.type);
  const openDrawer = () => {
    if (questionDetail.type) {
      setCurrentType(questionDetail.type);
    }
    setQDrawerPosition("right");
    setDrawerIsOpen(true);
    setTypeAction("edit");
  };
  const closeDrawer = () => {
    setDrawerIsOpen(false);
  };
  const progressQuestion = (type) => {
    let { q_id, form_id, title, properties, q_count, q_index } = questionDetail;
    developQuestion({ title, q_id, form_id, type, properties, fix: "update", q_count, q_index });
  }

  const goto = (checker, q_id) => {
    // console.log(checker, q_id);
    setGoToQuestion({ goto: checker, q_id });

  };

  return <>

    <div className="flex  justify-between items-center justify-end  p-1 bg-gray-100 w-full md:w-3/4 text-right">
      <div className="md:hidden flex w-44 items-center">
        <Button className="text-gray-800 w-16 h-10 bg-white flex items-center justify-center">

          {questionDetail.q_index > 0 ? (

            <ChevronDoubleLeftIcon
              className="w-6"
              onClick={() => goto("backward", questionDetail.q_id)}
            />
          ) : (
            <span className="w-5">.</span>
          )}

        </Button>
        <Button className="text-gray-800 w-16 h-10  bg-white flex items-center justify-center">
          {questionDetail.q_index + 1 < questionDetail.q_count ? (
            <ChevronDoubleRightIcon
              className="w-6"
              onClick={() => goto("forward", questionDetail.q_id)}
            />
          ) : (
            <span className="w-5">.</span>
          )}
        </Button>

      </div>
      <div className="text-sm px-4">{questionDetail.q_index + 1}/{questionDetail.q_count}</div>
      <div className="flex w-full justify-end md:space-x-4 ">
        <div className="flex space-x-5">{children}</div>
        <div>
          {qType &&

            <Button className="bg-gray-900 uppercase md:text-sm" onClick={openDrawer}>
              <span className="flex items-center">
                <div className="px-1 ">
                  <QTypeIcon
                    color="yellow"
                    className="w-8 md:w-6 text-gray-100"
                    type={questionDetail.type}
                    shape={questionDetail.properties.shape}
                  />
                </div>
                {qType.label}
              </span>
            </Button>
          }

          {/* <Button className="bg-gray-900 uppercase md:text-sm" onClick={openDrawer}>
            <span className="flex items-center">
              <div className="px-1 ">
                <QTypeIcon
                  color="yellow"
                  className="w-8 text-gray-100"
                  type={questionDetail.type}
                  shape={questionDetail.properties.shape}
                />
              </div>
              {questionDetail.label}
            </span>
          </Button> */}

        </div>


      </div>
    </div>
    <QDrawer show={drawerIsOpen}
      progressQuestion={progressQuestion}
      currentType={currentType}
      setCurrentType={setCurrentType}
      typeAction={typeAction}
      setDrawerIsOpen={setDrawerIsOpen}
      qDrawerPosition={qDrawerPosition}
    // form_id={form.form_id}
    />
    {drawerIsOpen && <Backdrop onClick={closeDrawer} />}
  </>
};
export default BuildHeader;
