
import Button from "../../shared/collection/Button";

import QuestionList from "../questions/components/QuestionList";
import { ReactComponent as NoQuestion } from '../../assets/no-question.svg';

const Questions = ({ questions, q_count, begin_header, end_header, addQuestion, copyQuestion, handleLanding, handleQuestionDelete }) => {
  // console.log(questions);
  // console.log(q_count);
  return (
    <>
      {questions.length > 0 ? (
        <>

          <QuestionList q_count={q_count} questions={questions} handleQuestionDelete={handleQuestionDelete} copyQuestion={copyQuestion} />
          <div className="fixed bottom-0 left-0 right-0 md:relative">
            <div className="flex pt-2 bg-white py-1 space-x-1 w-full border-b-2 justify-end px-1">
              <div className="md:hidden text-sm flex items-center w-1/4 ">{questions.length} {questions.length > 1 ? 'Questions' : 'Question'} </div>
              <Button
                className={` uppercase py-2 text-xs  truncate
                            ${begin_header ? 'bg-yellow-500' : 'bg-red-500'}`}
                onClick={() => handleLanding("begin")}> Edit Welcome Page</Button>
              <Button
                className={` uppercase py-2 text-xs  truncate
                         ${end_header ? 'bg-yellow-500' : 'bg-red-600'}`}
                onClick={() => handleLanding("end")}> Edit Thank you Page</Button>
            </div>
            <div className="md:hidden w-full my-2 flex justify-center items-center bg-white ">

              <Button
                onClick={addQuestion}
                className="text-gray-100 bg-gray-800 rounded-lg
                tracking-wider w-full p-3  uppercase text-lg"
              >
                Create Question
              </Button>
            </div>

          </div>

        </>)
        :

        <>
          <div className="hidden md:flex flex-col justify-center items-center mt-2 space-y-2">
            <Button
              className={`uppercase py-2 text-xs w-11/12
                    ${begin_header ? 'bg-purple-500' : 'bg-red-500'} `}
              onClick={() => handleLanding("begin")}> Edit Welcome Page </Button>
            <Button
              className={`bg-red-500 uppercase py-2 text-xs  w-11/12
                     ${end_header ? 'bg-purple-500' : 'bg-red-500'}`}
              onClick={() => handleLanding("end")} > Edit Thank you Page</Button>
          </div>
          <div className="md:hidden flex w-full flex-col items-center justify-center">
            <div className="w-full">
              <NoQuestion className="w-full" />
            </div>

            <div className="flex flex-col items-center space-y-3">
              <div className="text-2xl">
                Start creating your questions
              </div>
              <div>
                <Button
                  onClick={addQuestion}
                  className="bg-gray-900 px-4 py-3 w-56 uppercase text-base"
                >
                  Create Question
                </Button>
              </div>
            </div>
          </div>
          {/* Starting afresh here.. */}
          {/* <div className="flex flex-col  w-full justify-center items-center">
            <div>Feel free to create questionsx..</div>
            <Button
              onClick={addQuestion}
              className="bg-gray-900 py-2 w-11/12 uppercase text-base"
            >
              Create Question
            </Button>
          </div>
          <div className="flex flex-col justify-center py-4  w-full items-center mt-2 space-y-2 justify-center border-b-2">

            <Button
              className={`uppercase py-2 text-xs w-11/12
                    ${begin_header ? 'bg-purple-500' : 'bg-red-500'} `}
              onClick={() => handleLanding("begin")}> Edit Welcome Page </Button>
            <Button
              className={`bg-red-500 uppercase py-2 text-xs  w-11/12
                     ${end_header ? 'bg-purple-500' : 'bg-red-500'}`}
              onClick={() => handleLanding("end")} > Edit Thank you Page</Button>
          </div> */}
        </>

      }
    </>
  )
};
export default Questions;
