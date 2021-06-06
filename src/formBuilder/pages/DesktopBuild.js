import { useContext, useEffect, useState, useRef } from "react";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/outline";
import { BuildQuestionContext } from "../../shared/contexts/build-question.context";
import BuildHeader from "../components/BuildHeader";
import Button from "../../shared/collection/Button";
import BuildRequired from "../components/BuildRequired";
import QuestionType from "../questions/components/QuestionType";
import Properties from "../questions/components/Properties";

const DesktopBuild = () => {
  const {
    showQuestion,
    questionDetail,
    form,
    currentType,
    developQuestion,
    drawerIsOpen,
    setDrawerIsOpen,
    setTypeAction,
    setQDrawerPosition,
  } = useContext(BuildQuestionContext);
  const { q_id } = questionDetail;

  const [question, setQuestion] = useState();
  const [index, setIndex] = useState(0);
  const inputElement = useRef(null);
  const arr = [
    {
      id: 1,
      label: "Required",
      value: false,
      name: "required",
    },
  ];
  const addQuestion = () => {
    drawerIsOpen ? closeDrawer() : openDrawer();
  };
  const openDrawer = () => {
    setTypeAction("new");
    setQDrawerPosition("right");
    setDrawerIsOpen(true);
  };
  const closeDrawer = () => {
    setDrawerIsOpen(false);
  };
  const changeHandler = (e) => {
    const { q_id, properties, type } = question;
    if (e.target.name === "title") {
      developQuestion({ title: e.target.value, q_id, type, properties });
    }
  };

  const goto = (checker, q_id) => {
    console.log(checker, q_id);
    let index = form.questions.findIndex((quest) => quest.q_id === q_id);
    if (checker === "backward") {
      if (form.questions[index - 1]) {
        const { q_id, type } = form.questions[index - 1];
        showQuestion(q_id, type);
      }
    } else if (checker === "forward") {
      if (form.questions[index + 1]) {
        const { q_id, type } = form.questions[index + 1];
        showQuestion(q_id, type);
      }
    }
  };

  useEffect(() => {

    if (form && form.questions) {
      let qIndex = form.questions.findIndex((qn) => qn.q_id === q_id);
      setIndex(qIndex + 1);
      let q = form.questions[qIndex];

      setQuestion(q);
      if (q && q.type !== currentType) {
        let { q_id, title, properties } = q;
        developQuestion({ title, q_id, type: currentType, properties });
      }
    }
  }, [form, question, q_id, currentType, developQuestion]);
  if (question && question.properties) {
    const { properties } = question;
    const { required } = properties;
    arr[0].value = required;
    if (inputElement.current && question.properties.choices === []) {
      inputElement.current.focus();
    }
  }

  return (
    <>
      <div className="hidden md:flex flex-col items-center build border shadow-lg p-2 m-2 ">
        {currentType && question ? (
          <>
            <BuildHeader {...question}>
              <div className="flex space-x-2">
                <Button
                  onClick={() => goto("backward", question.q_id)}
                  className=" text-gray-500 bg-white flex items-center justify-center"
                >
                  {index > 1 ? (
                    <ChevronDoubleLeftIcon className="w-6" />
                  ) : (
                    <span className="w-5">.</span>
                  )}
                </Button>
                <Button
                  onClick={() => goto("forward", question.q_id)}
                  className=" text-gray-500 bg-white flex items-center justify-center"
                >
                  {
                    form.questions &&
                    <>
                      {index < form.questions.length ? (
                        <ChevronDoubleRightIcon className="w-6" />
                      ) : (
                        <span className="w-5">.</span>
                      )}
                    </>
                  }

                </Button>
              </div>
              <div>
                <BuildRequired {...question} />
              </div>

              {/* <Properties {...question} index={index} /> */}
            </BuildHeader>
            <form className="flex flex-col md:justify-end  p-1 bg-white w-3/4 border shadow">
              <div>
                <textarea
                  ref={inputElement}
                  className="px-4 py-2 border w-full text-xl rounded-md question-textarea
                                    focus:outline-none focus:border-red-400 hover:shadow-md"
                  name="title"
                  onChange={changeHandler}

                  placeholder="Type your Question Here.."
                  value={question.title}
                ></textarea>
              </div>

              {question && question.type && (
                <>
                  <QuestionType {...question} />
                </>
              )}
            </form>
            <div className=" w-3/4 flex justify-between p-2 shadow">
              <div className="w-8/12">
                <Properties {...question} index={index} />
              </div>
              <div>
                <Button className="bg-gray-900 uppercase" onClick={addQuestion}>
                  Add Question
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div>Pick Question</div>
        )}
      </div>
    </>
  );
};

export default DesktopBuild;
