import "./RDrawer.css";
import ReactDOM from "react-dom";

import { CSSTransition } from "react-transition-group";

import QTypeIcon from "./QTypeIcon";

const RDrawer = (props) => {
  const { detail } = props;

  let content = (
    <CSSTransition
      classNames="slide-in-right"
      in={props.show}
      timeout={400}
      mountOnEnter
      unmountOnExit
    >
      <aside className="r-right-drawer" onClick={props.onClick}>
        <div className="container px-6 py-3 shadow">
          <h3 className="text-lg">Respondent {detail.index}</h3>
          <h5 className="text-base pt-3">20-12-2011</h5>
        </div>
        <div className="p-4 overflow-y-scroll content-h overflow-x-hidden">
          {detail.answers && (
            <div className="flex flex-col">
              {detail.answers.map((answer, index) => (
                <div
                  className="flex text-md py-2 px-4 m-2 shadow-md space-x-4 "
                  key={index}
                >
                  <div className="w-1/12 ">Q{index + 1}</div>

                  <div className=" flex-auto ">
                    <div className="text-md">{answer.title}</div>
                    {answer.skipped === false ? (
                      <>
                        {answer.type !== "RATING" ? (
                          <div className="pt-2 text-base flex-auto w-7/12 overflow-x-auto">
                            {answer.text}
                          </div>
                        ) : (
                          <div className="flex space-x-1 pt-2">
                            {Array.from(
                              Array(parseInt(answer.value)),
                              (rating, index) => {
                                return (
                                  <QTypeIcon
                                    key={index}
                                    color="red"
                                    className="w-8 text-gray-800"
                                    type={answer.type}
                                    shape={answer.shape}
                                  />
                                );
                              }
                            )}
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="pt-3">..</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </aside>
    </CSSTransition>
  );
  return ReactDOM.createPortal(
    content,
    document.getElementById("rdrawer-hook")
  );
};
export default RDrawer;
