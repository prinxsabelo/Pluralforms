import { useContext, useEffect, useState, useRef } from "react";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/outline";
import { BuildQuestionContext } from "../../shared/contexts/build-question.context";
import BuildHeader from "../components/BuildHeader";
import Button from "../../shared/collection/Button";
// import BuildRequired from "../components/BuildRequired";
import QuestionType from "../questions/components/QuestionType";
import Properties from "../questions/components/Properties";
import { ReactComponent as PickQuestion } from '../../assets/pick-question.svg';

// import Slider from "../../shared/collection/Slider";qu
// import { useHttpClient } from "../../shared/hooks/http-hook";
const DesktopBuild = () => {
  const [question, setQuestion] = useState({})
  const inputElement = useRef(null);

  const { questionDetail, developQuestion, setGoToQuestion } = useContext(BuildQuestionContext)
  useEffect(() => {
    if (questionDetail) {
      setQuestion(questionDetail);
    }
  }, [questionDetail, setQuestion])
  const changeHandler = (e) => {

    const { q_id, form_id, properties, type, } = question;
    if (e.target.name === "title") {

      developQuestion({ title: e.target.value, q_id, form_id, type, properties, fix: "update", });
    }
  };
  const handleChoices = (choices) => {
    const { q_id, title, properties, form_id, type, } = question;
    properties.choices = choices;
    developQuestion({ title, q_id, form_id, type, properties, fix: "update", });
  }
  const goto = (checker, q_id) => {
    setGoToQuestion({ goto: checker, q_id });
  };
  const addQuestion = () => {
    console.log('add question..');
    // Calling out a parent button on formBuilder..
    document.getElementById(`addQuestion`).click();
  }

  return (
    <>

      {questionDetail && questionDetail.q_id ?

        <div className="hidden md:flex flex-col items-center build border shadow-lg p-2 m-2 ">

          <BuildHeader >
            <div className="flex space-x-2">

              {questionDetail.q_index > 0 ?
                <Button
                  onClick={() => goto("backward", question.q_id)}
                  className=" text-gray-500 bg-white flex items-center justify-center"
                >
                  <ChevronDoubleLeftIcon className="w-6" />
                </Button> :
                <Button className="cursor-not-allowed  text-gray-500 bg-white flex items-center justify-center">
                  <span className="w-5">.</span>
                </Button>
              }
              {questionDetail.q_index + 1 < questionDetail.q_count ?
                <Button
                  onClick={() => goto("forward", question.q_id)}
                  className=" text-gray-500 bg-white flex items-center justify-center"
                >
                  <ChevronDoubleRightIcon className="w-6" />
                </Button>
                :
                <Button
                  onClick={() => goto("forward", question.q_id)}
                  className="cursor-not-allowed  text-gray-500 bg-white flex items-center justify-center"
                >
                  <span className="w-5">.</span>
                </Button>
              }

            </div>
            {/* <div>
              <BuildRequired {...question} />
            </div> */}

          </BuildHeader>
          <form className="flex flex-col md:justify-end  p-1 bg-white w-3/4 border shadow">
            <div>
              <textarea
                ref={inputElement}
                className="px-4 py-2 border w-full text-xl rounded-md question-textarea border-gray-600
                                    focus:outline-none focus:border-red-400 hover:shadow-md"
                name="title"
                onChange={changeHandler}

                placeholder="Type your Question Here.."
                value={question.title}
              ></textarea>
            </div>

            {question && question.type && (
              <>
                <QuestionType handleChoices={handleChoices} {...question} />
              </>
            )}
          </form>
          <div className=" w-3/4 flex items-center justify-between p-2 shadow">
            <div className="w-8/12">
              <Properties {...question} index={questionDetail.index} />
            </div>
            <div>
              <Button className="bg-gray-900 uppercase" onClick={addQuestion}>
                Add Question
              </Button>
            </div>
          </div>

        </div>
        :
        <div className="flex w-10/12 justify-center">
          <div className="flex flex-col -space-y-16 justify-center   w-2/3">
            <PickQuestion className="w-full" />
            <div className="flex flex-col space-y-2 w-full items-center justify-center">
              <div className="text-3xl ">
                Pick Question
              </div>

              <div className="text-sm w-full flex justify-center items-center">
                Let me build question picking from questions showing on the left..
              </div>
            </div>

          </div>
        </div>
      }

    </>
  )
}

export default DesktopBuild;
