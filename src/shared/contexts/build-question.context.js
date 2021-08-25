import { createContext, useContext, useState, useCallback } from "react";


import { ViewportContext } from "./viewport-context";
import { useHttpClient } from "../hooks/http-hook";
import useDebounceForQuestionUpdate from "../hooks/use-debounce-for-question-update.hook";
import { useHistory } from "react-router-dom";

const breakpoint = 768;

export const BuildQuestionContext = createContext();
const BuildQuestionProvider = (props) => {
    const history = useHistory();
    const [updateQuestion, fetchLoader] = useDebounceForQuestionUpdate();
    if (fetchLoader) { }

    const { width } = useContext(ViewportContext);
    const [form, setForm] = useState();
    const { sendRequest, isLoading } = useHttpClient();
    const [goToQuestion, setGoToQuestion] = useState()

    const [questionDetail, setQuestionDetail] = useState({
        q_id: undefined,
        q_count: null,
        q_index: null,
        form_id: null,
        index: 0,
        title: "",
        fix: "update",
        properties: {
            shape: "star"
        }
    });
    const [questionsLength, setQuestionsLength] = useState(0)
    const [currentType, setCurrentType] = useState("");
    const [typeAction, setTypeAction] = useState("");

    //Default QDrawer position should be left..
    const [qDrawerPosition, setQDrawerPosition] = useState("left");
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);

    // Question is being updated in the function useDebounceForQuestionUpdate.. 
    // const [updateQuestion, fetchLoader] = useDebounceForQuestionUpdate();
    // if (fetchLoader) { }
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

        setQuestionDetail(qn);

        if (width <= breakpoint) {
            updateQuestion(qn);
        }


    }, [width, updateQuestion]);


    //ShowQuestion function works only on desktop..
    const showQuestion = (question) => {
        // console.log(question);
        // If screen size is mobile.. Navigate to question for mobile build..
        if (width <= breakpoint) {
            setQuestionDetail(question);
            if (question && question.form_id) {
                history.push(`/user/form/${question.form_id}/questions/${question.q_id}`);
            }

        } else {
            setQuestionDetail(question);
        }

        setGoToQuestion();
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

    const deleteQuestion = async ({ q_id, form_id }) => {
        // const { form_id } = form;
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
                setQuestionDetail,
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
                isLoading,
                goToQuestion,
                setGoToQuestion,
                questionsLength,
                setQuestionsLength
            }}

        >
            {props.children}
        </BuildQuestionContext.Provider>
    );
};
export default BuildQuestionProvider;
