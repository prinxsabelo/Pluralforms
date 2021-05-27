import "./QDrawer.css";
import ReactDOM from "react-dom";
import { useContext } from "react";
import QTypeIcon from "./QTypeIcon";
import { CSSTransition } from "react-transition-group";
import { QuestionContext } from "../context/question-context";

const QDrawer = (props) => {
  const {
    addQuestion,
    currentType,
    setCurrentType,
    questionTypes,
    setDrawerIsOpen,
    typeAction,
    qDrawerPosition,
  } = useContext(QuestionContext);

  const setQType = (type) => {
    setDrawerIsOpen(false);
    if (typeAction === "new") {
      addQuestion(type);
    } else {
      if (type !== currentType) {
        setCurrentType(type);
      }
    }
  };
  let content;
  if (qDrawerPosition) {
    content = (
      <CSSTransition
        classNames={`${qDrawerPosition === "left" ? "slide-in-left" : "slide-in-right"
          }`}
        in={props.show}
        timeout={400}
        mountOnEnter
        unmountOnExit
      >
        <aside
          className={
            qDrawerPosition === "left" ? `q-left-drawer` : `q-right-drawer`
          }
          onClick={props.onClick}
        >
          <div className="flex justify-center mt-2 border-b-2">
            <h3 className="text-center px-6 py-3 text-lg">
              {typeAction === "new" ? "Choose " : "Change "} Question Type
            </h3>
          </div>
          <div>
            {questionTypes.map((qt) => (
              <div
                key={qt.typeId}
                onClick={() => setQType(qt.type)}
                className={`cursor-pointer flex space-x-4 border-r-2 m-2
                            shadow border-b-2 border-l-2 items-center hover:bg-gray-200 hover:text-gray-800
                            ${qt.type === currentType && typeAction !== "new"
                    ? "bg-gray-900  text-yellow-100"
                    : ""
                  }`}
              >
                <div className="p-2 ">
                  <QTypeIcon color="red" className="w-8" type={qt.type} />
                </div>
                <div className="tracking-wide">
                  <span className="text-normal"> {qt.label}</span>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </CSSTransition>
    );
  }

  return ReactDOM.createPortal(
    content,
    document.getElementById("qdrawer-hook")
  );
};
export default QDrawer;
