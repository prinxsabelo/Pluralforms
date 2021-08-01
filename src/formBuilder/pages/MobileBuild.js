import { CheckIcon } from "@heroicons/react/outline";
import { useContext, } from "react";
import { useHistory } from "react-router-dom";
import Button from "../../shared/collection/Button";
import LoadingSpinner from "../../shared/collection/LoadingSpinner.";
import { BuildQuestionContext } from "../../shared/contexts/build-question.context";
import BuildHeader from "../components/BuildHeader";
import FormLabel from "../components/FormLabel";
import Properties from "../questions/components/Properties";
import QuestionType from "../questions/components/QuestionType";

const MobileBuild = ({ form }) => {
  const history = useHistory();
  const { questionDetail, developQuestion, setQuestionDetail } = useContext(BuildQuestionContext)

  //Function applicable for mobile..
  const saveQuestion = () => {
    if (form && form.questions) {

      const { form_id } = questionDetail;

      setQuestionDetail();
      history.push(`/user/form/${form_id}/questions`);
    }
  }

  const changeHandler = (e) => {
    // Update question..
    const { q_id, form_id, properties, type, q_index, q_count } = questionDetail
    if (e.target.name === "title") {
      developQuestion(({
        title: e.target.value, q_index, q_count, q_id,
        form_id, type, properties, fix: "update",
      }));
    }
  };


  return (
    <>

      <header>
        <FormLabel form={form} />
      </header>
      <main>
        {questionDetail ?
          <>

            <BuildHeader >
              <Button
                className="bg-gray-900"
                onClick={() => saveQuestion()}
              >
                <CheckIcon className="w-8 h-8" />

              </Button>
            </BuildHeader>
            <div
              className="w-full bg-white h-5/6  flex justify-center mobile-build
                                                px-1 shadow rounded  relative"
            >
              <form className="flex flex-col space-y-2 w-full ">
                <div>
                  <textarea
                    autoFocus={true}
                    className="p-2 border w-full text-base rounded-md question-textarea border-2 border-red-400
                                    focus:outline-none focus:shadow-md hover:shadow-md "
                    name="title"
                    placeholder="Type your Question Here.."
                    value={questionDetail.title}
                    onChange={changeHandler}
                    spellCheck="true"
                  ></textarea>
                </div>
                <QuestionType />

                <Properties {...questionDetail} />
              </form>
            </div>
          </>
          :
          <>
            <LoadingSpinner asOverlay>
              ..
            </LoadingSpinner>
          </>
        }
      </main>
      {/* <footer className="fixed bottom-0 bg-white border-t w-full p-3 tracking-wider uppercase text-sm">
        pluralforms made of love for you..
      </footer> */}
    </>
  )
}
export default MobileBuild;
