import { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import BuildHeader from "../components/BuildHeader";
import FormLabel from "../components/FormLabel";
import Button from "../../shared/collection/Button";
import QuestionType from "../questions/components/QuestionType";
import Properties from "../questions/components/Properties";
import { QuestionContext } from "../../shared/contexts/question-context";

const MobileBuild = () => {
  const history = useHistory();
  const {
    form,
    setForm,
    getForm,
    currentType,
    setTypeAction,
    typeAction,
    setCurrentType,
    developQuestion,
  } = useContext(QuestionContext);
  let { form_id, q_id } = useParams();

  const [question, setQuestion] = useState();
  useEffect(() => {
    if (!form) {
      getForm(form_id);
    }
    if (form && form.questions) {
      console.log(form);
      let q = form.questions.find((x) => x.q_id === q_id);
      if (q) {
        if (q.type && !currentType) {
          setCurrentType(q.type);
        }

        if (typeAction === "edit") {
          if (q && q.type !== currentType) {
            let { q_id, title, properties } = q;
            setCurrentType(currentType);
            developQuestion({ title, q_id, properties, type: currentType });
          }
        } else {
          setCurrentType(q.type);
        }

        setQuestion(q);
      }
    }
  }, [
    q_id,
    form_id,
    form,
    setForm,
    getForm,
    currentType,
    setCurrentType,
    developQuestion,
    setTypeAction,
    typeAction,

  ]);

  const changeHandler = (e) => {
    //  console.log(e);
    const { q_id, properties, type } = question;
    // console.log(q_id);
    // Check locally.. until save..
    if (e.target.name === "title") {
      developQuestion({ title: e.target.value, q_id, type, properties });
    }
  };
  const saveQuestion = (q) => {
    //  console.log(q);
    developQuestion(q);
    history.push(`/user/form/${form.form_id}/questions`);
  };
  return (
    <>
      <header>
        <FormLabel />
      </header>
      <main>
        {currentType && question ? (
          <div>
            <BuildHeader {...question}>
              <Button
                className="bg-gray-900"
                onClick={() => saveQuestion(question)}
              >
                <svg
                  className="w-8 h-8"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
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
                    className="p-2 border w-full text-base rounded-md question-textarea
                                    focus:outline-none focus:shadow-md hover:shadow-md "
                    name="title"
                    placeholder="Type your Question Here.."
                    value={question.title}
                    onChange={changeHandler}
                  ></textarea>
                </div>
                <QuestionType {...question} />
                <Properties {...question} />
              </form>
            </div>
            <footer className="fixed bottom-0 bg-white border-t w-full p-3 tracking-wider uppercase text-sm">
              form made of love for you..
            </footer>
          </div>
        ) : (
          <div>Not Found..</div>
        )}
      </main>

      {/* */}
    </>
  );
};
export default MobileBuild;
