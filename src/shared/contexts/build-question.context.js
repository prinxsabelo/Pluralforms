import { createContext, useContext, useState, useCallback } from "react";

import { useHistory } from "react-router-dom";

import { ViewportContext } from "./viewport-context";
import { useHttpClient } from "../hooks/http-hook";
import useDebounceForQuestionUpdate from "../hooks/use-debounce-for-question-update.hook";

const breakpoint = 768;

export const BuildQuestionContext = createContext();
const BuildQuestionProvider = (props) => {
  const history = useHistory();
  const { width } = useContext(ViewportContext);
  const [form, setForm] = useState();
  const { sendRequest, isLoading } = useHttpClient();

  const [questionDetail, setQuestionDetail] = useState({
    q_id: null,
    index: 0,
  });
  const [currentType, setCurrentType] = useState("");
  const [typeAction, setTypeAction] = useState("");

  //Default QDrawer position should be left..
  const [qDrawerPosition, setQDrawerPosition] = useState("left");
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  // Question is being updated in the function useDebounceForQuestionUpdate.. 
  const [updateQuestion] = useDebounceForQuestionUpdate();
  const [question, setQuestion] = useState();
  const [questionTypes, setQuestionTypes] = useState([
    { typeId: 1, label: "Text", type: "TEXT" },
    { typeId: 2, label: "Choice", type: "CHOICE" },
    { typeId: 4, label: "Rating", type: "RATING" },
    { typeId: 5, label: "Yes/No", type: "YN" },
  ]);

  const getForm = async (form_id) => {
    setForm({});
    //Fetch forms here.. If there's any error set forms to empty..
    try {
      const response = await sendRequest(`http://localhost:8000/api/user/form`, 'POST', JSON.stringify({ form_id }));
      if (response) {
        setForm(response.form);
      }

    } catch {
      setForm({});
    }
  };
  //Question is being developed here so as to have effect on all areas that extracted data from it..
  const developQuestion = useCallback((qn) => {
    if (!qn.title) qn.title = "";
    if (qn.type === "RATING" && typeof qn.properties.shape === "undefined") {
      qn.properties.shape = "star";
    }
    qn.form_id = form.form_id;
    updateQuestion(qn);

    const questions = form.questions.map((q) => (q.q_id === qn.q_id ? qn : q));
    setForm({ ...form, questions });

  }, [setForm, form, updateQuestion]);

  //ShowQuestion function works only on desktop..
  const showQuestion = (q_id, type) => {
    console.log(q_id, type);
    setQuestionDetail({ q_id, type });
    let questionType = questionTypes.find((q) => q.type === type);
    if (questionType) {
      //Setting the type to default first..
      if (type === questionType.type) {
        setCurrentType("xxx");
      }
      setCurrentType(type);
    }
    if (typeAction === "new") {
      setTypeAction("edit");
      // If screen size is mobile.. Navigate to questions..
      if (width <= breakpoint) {
        history.push(`/user/form/${form.form_id}/questions/${q_id}`);
      }
    }
  };

  // Question is being added here..
  const addQuestion = async (type) => {
    const { form_id } = form;
    try {
      const qn = await sendRequest(`http://localhost:8000/api/user/form/build`, 'POST', JSON.stringify({ type, form_id }));
      if (qn) {
        form.questions = [...form.questions, qn];
        showQuestion(qn.q_id, type);
      }

    } catch { }
  };

  const copyQuestion = (question) => {
    // let index = form.questions.findIndex((q) => q.q_id === question.q_id);

    // const { title, type, properties } = form.questions[index];
    // console.log(title, type, properties);
    // console.log(qn);
    // const questions = form.questions.concat(qn);
    // setForm({ ...form, questions });
    // showQuestion(qn.q_id, qn.type);
  };

  const deleteQuestion = async ({ q_id }) => {
    const { form_id } = form;
    const qn = await sendRequest(`http://localhost:8000/api/user/form/build/delete`, 'DELETE', JSON.stringify({ q_id, form_id }));
    if (qn) {
      if (form.questions.length > 0) {
        const questions = form.questions.filter(q => q.q_id !== q_id);
        setForm({ ...form, questions });
      }

      let index = form.questions.findIndex((q) => q.q_id === q_id);
      if (index > 0) {
        const { type, q_id } = form.questions[index - 1];
        showQuestion(q_id, type);

      }
    }
  };

  return (
    <BuildQuestionContext.Provider
      value={{
        getForm,
        setForm,
        form,
        question,
        setQuestion,
        addQuestion,
        deleteQuestion,
        copyQuestion,
        showQuestion,
        questionDetail,

        developQuestion,
        currentType,
        setCurrentType,
        questionTypes,
        setQuestionTypes,
        drawerIsOpen,
        setDrawerIsOpen,
        typeAction,
        setTypeAction,
        qDrawerPosition,
        setQDrawerPosition,
        isLoading
      }}

    >
      {props.children}
    </BuildQuestionContext.Provider>
  );
};
export default BuildQuestionProvider;
