import { Redirect, useParams } from "react-router-dom";

import FormLabel from "../components/FormLabel";
import Tabs from "../components/tabs/Tabs";
import { useContext, useState, useEffect, useCallback } from "react";
import Questions from "./Questions";
import { BuildQuestionContext } from "../../shared/contexts/build-question.context";
import TabContent from "../components/tabs/TabContent";
import { ViewportContext } from "../../shared/contexts/viewport-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import QDrawer from "../../shared/collection/QDrawer";
import Backdrop from "../../shared/collection/Backdrop";
import useDebounceForQuestionUpdate from "../../shared/hooks/use-debounce-for-question-update.hook";
import LoadingSpinner from "../../shared/collection/LoadingSpinner.";

import { FormContext } from "../../shared/contexts/form.context";
import MobileBuild from "./MobileBuild";
import Button from "../../shared/collection/Button";
import Slider from "../../shared/collection/Slider";
import InnerLoader from "../../shared/collection/InnerLoader";
import { toast, Zoom } from 'react-toastify';
import { ReactComponent as NoQuestion } from '../../assets/no-question.svg';

import 'react-toastify/dist/ReactToastify.css';
import ToggleSwitch from "../../shared/collection/ToggleSwitch";

const FormBuilder = () => {
    //Deounce hook works partly for large device for now..
    const [updateQuestion, fetchLoader] = useDebounceForQuestionUpdate();

    const { sendRequest, isLoading } = useHttpClient();
    const { showQuestion, questionDetail, setQuestionDetail, goToQuestion } = useContext(BuildQuestionContext);
    //form_id is needed to fetch question..
    let { form_id } = useParams();

    const breakpoint = 768;
    const [form, setForm] = useState();
    const [forms, setForms] = useState([]);

    const [loader, setLoader] = useState(true);
    //The content here functions for landing content *Thank You* and *Welcome" Message..
    const { openLandingModal, closeLandingModal, recieveForm, sendForm } = useContext(FormContext);
    const [currentType, setCurrentType] = useState("");
    const [typeAction, setTypeAction] = useState("");
    const [qDrawerPosition, setQDrawerPosition] = useState("left");
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);
    const { width } = useContext(ViewportContext);
    const [loadForm, setLoadForm] = useState(false);
    const [loadForms, setLoadForms] = useState(false);
    const [notifyLoader, setNotifyLoader] = useState(false);
    const [notifyMe, setNotifyMe] = useState(false);
    const onToggleChange = async (index, e) => {
        console.log(form.form_id);
        console.log(index, e);
        setLoader(true);
        setNotifyLoader(true);
        const notify_me = e;
        const data = await sendRequest(`http://localhost:8000/api/user/forms/update`, 'PUT',
            JSON.stringify({ form_id, notify_me }));
        if (data) {
            setNotifyMe(data.notify_me);
            if (data.notify_me) {

                toast.configure();
                const notify = () => toast.success(`You'll get mail when form is filled.. `, {
                    transition: Zoom,
                    position: "bottom-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: 0,

                })
                notify();
            }

            setTimeout(() => {
                setNotifyLoader(false);
            }, 1000);
        }
    }

    //After form is been submitted and there's a need for form refresh mainly for mobile..
    const initForm = useCallback(async () => {
        setLoader(true);
        if (form_id) {
            try {
                const data = await sendRequest(`http://localhost:8000/api/user/form`, 'POST', JSON.stringify({ form_id }));
                if (data.form) {
                    setForm(data.form);
                    if (data.form.questions.length === 0) {
                        setQuestionDetail();
                    }
                }

            } catch {
                setForm({});
            }
        }


    }, [form_id, sendRequest, setForm, setQuestionDetail])

    useEffect(() => {
        const ac = new AbortController();

        const fetchForm = async () => {
            setLoader(true);
            if (form_id) {
                try {
                    const data = await sendRequest(`http://localhost:8000/api/user/form`, 'POST', JSON.stringify({ form_id }));
                    if (data.form) {
                        setForm(data.form);
                        if (data.form.questions.length === 0) {
                            setQuestionDetail();
                        }
                    } else {
                        setQuestionDetail();
                    }
                    setLoadForm(true)
                } catch {
                    setForm({});
                    setLoadForm(true)
                }
            }


        }

        const fetchForms = async () => {
            try {
                const data = await sendRequest(`http://localhost:8000/api/user/forms`);

                let activeForms = data.filter(f => f.status === "ACTIVE");
                // console.log(activeForms);
                setForms(activeForms);
                setLoadForms(true)
            } catch {
                setForms([]);
                setLoadForms(true)
            }
        }
        if (!loadForm && !form) {
            setTimeout(() => {
                fetchForm();

            }, 500)
        }
        if (!loadForms && !forms) {
            setTimeout(() => {
                fetchForms();
            }, 500)

        }
        if (form && form.questions && form.questions.length > 0) {

            //The conditions below function on both mobile and large devices..
            // Function to process next/prev questions..
            if (goToQuestion) {

                const { goto, q_id } = goToQuestion;
                const q_index = form.questions.findIndex(q => q.q_id === q_id);

                if (goto === "forward") {
                    if (form.questions[q_index + 1]) {
                        form.questions[q_index + 1].q_index = q_index + 1;
                        form.questions[q_index + 1].q_count = form.questions.length;
                        showQuestion(form.questions[q_index + 1]);
                    }
                } else {
                    if (form.questions[q_index - 1]) {
                        form.questions[q_index - 1].q_index = q_index - 1;
                        form.questions[q_index - 1].q_count = form.questions.length;
                        showQuestion(form.questions[q_index - 1]);
                    }
                }
            }

            //Function here works to update question on large device..
            if (questionDetail && questionDetail.q_id) {

                if (questionDetail.fix === "update" && width > breakpoint) {

                    setLoader(true);
                    if (questionDetail.type === "RATING" &&
                        typeof questionDetail.properties.shape === "undefined") {
                        questionDetail.properties.shape = "star";
                    }

                    updateQuestion(questionDetail);
                    delete questionDetail.fix;
                    const questions = form.questions.map((q) => (q.q_id === questionDetail.q_id ? questionDetail : q));
                    setForm({ ...form, questions });
                    //FetchLoader is retrieved from debounce on question input..
                    if (!fetchLoader && loader) {
                        setTimeout(() => {
                            setLoader(false);
                        }, 1000)

                    }
                } else {
                    setTimeout(() => {
                        setLoader(false);
                    }, 1000)
                }
            }

            //Function here works on reload of question on mobile..
            if (questionDetail && !questionDetail.q_id) {

                //Firstly getting the question link here..
                let lastIndex = window.location.pathname.lastIndexOf("/");

                let q_id = window.location.pathname.slice(lastIndex);
                // Parsing out the q_id here
                q_id = parseInt(q_id.replace("/", ""));
                // console.log(window.location.pathname[q_id]);
                const q_index = form.questions.findIndex(q => q.q_id === q_id);
                if (form.questions[q_index]) {
                    form.questions[q_index].q_index = q_index;
                    form.questions[q_index].q_count = form.questions.length;
                    showQuestion(form.questions[q_index]);
                }

            }

        }
        if (recieveForm) {
            setLoader(true);
            //Form will be submitted here.. Specifically saving the landing page.. *Welcome/ThankYou Message..
            // console.log(recieveForm);
            const { begin_header, begin_desc, end_header, end_desc } = recieveForm;
            const data = sendRequest(`http://localhost:8000/api/user/forms/update`, 'PUT', JSON.stringify({ begin_header, begin_desc, end_header, end_desc, form_id }));
            if (data) {
                let f_index = forms.findIndex(form => form.form_id === form_id);
                let newForms = [...forms];
                newForms[f_index] = data;
                setForms(newForms);
                sendForm();
            }

            closeLandingModal();
        }
        return () => ac.abort(); // Abort both fetches on unmount

    }, [sendRequest, loader, loadForms, loadForm, fetchLoader, updateQuestion, width,
        goToQuestion, form_id, setQuestionDetail, form, forms, questionDetail, showQuestion,
        recieveForm, sendForm, closeLandingModal]);
    if (!isLoading && loader) {
        setTimeout(() => {
            setLoader(false);
        }, 1000)
    }

    const renameForm = async (title, form_id) => {
        console.log(title, form_id);
        const data = await sendRequest(`http://localhost:8000/api/user/forms/update`, 'PUT', JSON.stringify({ title, form_id }));
        if (data) {
            let f_index = forms.findIndex(form => form.form_id === form_id);
            let newForms = [...forms];
            newForms[f_index] = data;
            setForms(newForms);
        }
    }
    const addQuestion = () => {
        setCurrentType("");
        console.log('add question..');
        drawerIsOpen ? closeDrawer() : openDrawer();
    }

    //Working for adding question..
    const progressQuestion = async (type) => {
        setLoader(true);
        try {
            const qn = await sendRequest(`http://localhost:8000/api/user/form/build`, 'POST', JSON.stringify({ type, form_id }));
            if (qn) {
                qn.q_index = form.questions.length;
                qn.q_count = form.questions.length + 1;
                form.questions = [...form.questions, qn];
                setQuestionDetail();
                setQuestionDetail(qn);
                showQuestion(qn);

            }
        } catch { }
    }

    const handleQuestionDelete = async ({ q_id, form_id }) => {
        setLoader(true);
        const data = await sendRequest(`http://localhost:8000/api/user/form/build/delete`, 'DELETE', JSON.stringify({ q_id, form_id }));
        if (data && form.questions && form.questions.length > 0) {

            const questions = form.questions.filter(q => q.q_id !== q_id);
            setForm({ ...form, questions });


            let q_index = form.questions.findIndex((q) => q.q_id === q_id);

            if (q_index > 0) {
                setQuestionDetail();
                if (width > breakpoint) {
                    showQuestion(form.questions[q_index - 1]);
                }

            } else {
                setQuestionDetail();
            }

        }
    }

    const copyQuestion = async ({ q_id, form_id }) => {
        // console.log(q_id, form_id);
        const qn = await sendRequest(`http://localhost:8000/api/user/form/build/copy`, 'POST', JSON.stringify({ q_id, form_id }));
        if (qn && form.questions && form.questions.length > 0) {
            qn.q_index = form.questions.length;
            qn.q_count = form.questions.length + 1;
            form.questions = [...form.questions, qn];
            setQuestionDetail();
            if (width > breakpoint) {
                setQuestionDetail(qn);
            }
            toast.configure();
            const notify = () => toast.success(`Question copied successfully. 😎`, {
                transition: Zoom,
                position: "bottom-center",
                autoClose: 1500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: 0,

            })
            notify();
        }
    }
    const handleLanding = (param) => {
        openLandingModal(param, form);
    }

    const openDrawer = () => {
        setTypeAction("new");
        setQDrawerPosition("left");
        setDrawerIsOpen(true);
    };
    const closeDrawer = () => {
        setDrawerIsOpen(false);
    };

    const openRightDrawer = () => {
        setTypeAction("new");
        setQDrawerPosition("right");
        setDrawerIsOpen(true);
    }
    const previewForm = () => {
        const formUrl = `https://pluralforms.com/form/${form.form_id}/${form.ref_id}`;
        const win = window.open(formUrl, "_blank");
        win.focus();
    }
    let mobileTabs = [];
    let desktopTabs = []
    if (form && form.questions && form.questions.length > 0) {
        mobileTabs = [
            { id: 1, label: "Questions", link: `questions` },
            // { id: 2, label: "Share", link: `share` },
            { id: 3, label: "Results", link: `results` },
            // { id: 4, label: "Settings", link: `settings` },
        ];
        desktopTabs = [
            { id: 1, label: "Build", link: `build` },
            { id: 2, label: "Share", link: `share` },
            { id: 3, label: "Results", link: `results` },
            // { id: 4, label: "Settings", link: `settings` },
        ];
    } else {
        mobileTabs = [
            { id: 1, label: "Questions", link: `questions` },

        ];
        desktopTabs = [
            { id: 1, label: "Build", link: `build` },

        ];
    }
    return (
        <>
            {form && form.questions &&
                <>

                    {window.location.pathname === `/user/form/${form_id}/build` &&
                        width <= breakpoint && <Redirect to={`/user/form/${form_id}/questions`} />}
                    {/* Redirect to fit in for large devices.. */}
                    {window.location.pathname === `/user/form/${form_id}/questions` &&
                        width > breakpoint && <Redirect to={`/user/form/${form_id}/build`} />}

                    {/* Works only on larger device.. */}
                    {width > breakpoint && (
                        <div className="hidden md:block builder-block hidden overflow-none h-24">

                            <header
                                className={`flex w-full justify-between shadow bg-white z-50 `}
                            >
                                <div className="w-1/2">
                                    <FormLabel form={form} addQuestion={addQuestion} renameForm={renameForm} />
                                </div>

                                <div className="w-3/5 flex-grow">
                                    <Tabs tabs={desktopTabs} />
                                </div>
                                <div className="w-1/2 px-1  flex justify-end">
                                    {

                                        <div className="w-full flex justify-between items-center  space-x-1 ">
                                            <div className="w-36 text-sm">
                                                {!notifyLoader &&
                                                    <ToggleSwitch className="label-md" label="Notify Me" value={notifyMe} index={0} onToggleChange={onToggleChange} />

                                                }

                                            </div>
                                            <div
                                                className={`h-full  w-52 flex items-center px-2
                                                ${window.location.pathname === `/user/form/${form_id}/build` ? 'bg-yellow-400' : ''}`}
                                            >
                                                {window.location.pathname === `/user/form/${form_id}/build`
                                                    && loader &&
                                                    <InnerLoader />
                                                }

                                            </div>
                                            <div className="flex ">
                                                {
                                                    <>

                                                        {form.questions.length > 0 &&
                                                            <Button onClick={() => previewForm()}
                                                                className={` bg-gray-900 text-sm my-1 mx-3
                                                                    uppercase tracking-widest
                                                                    rounded-xl
                                                                  ${window.location.pathname === `/user/form/${form_id}/build`
                                                                        && form.questions.length > 0
                                                                        ? 'visible' : 'invisible'}`}

                                                            >Preview </Button>
                                                        }


                                                    </>
                                                }
                                            </div>

                                        </div>
                                    }
                                </div>

                            </header>

                            <main className="flex w-full relative bottom-0 top-0">

                                {window.location.pathname === `/user/form/${form_id}/build` && (
                                    <div className="w-1/3 border-r shadow-xl h-screen">
                                        {form && form.questions &&
                                            <>
                                                <Questions
                                                    q_count={form.questions.length}
                                                    begin_header={form.begin_header}
                                                    begin_desc={form.begin_desc}
                                                    end_header={form.end_header}
                                                    end_desc={form.end_desc}
                                                    addQuestion={addQuestion}
                                                    questions={form.questions}
                                                    handleLanding={handleLanding}
                                                    copyQuestion={copyQuestion}
                                                    handleQuestionDelete={handleQuestionDelete}
                                                />
                                            </>
                                        }

                                    </div>
                                )}
                                {
                                    form.questions.length > 0 ?
                                        <div className="flex-auto">

                                            <TabContent />
                                        </div> :
                                        <div className="h-screen w-full flex flex-col space-y-4 items-center ">
                                            <div className="flex flex-col items-center space-y-2">
                                                <NoQuestion />
                                                <div className="text-3xl capitalize">
                                                    No question found.
                                                </div>
                                                <div className="text-sm tracking-widest">
                                                    Lol.. Don't be shy to ask those questions..
                                                </div>
                                            </div>

                                            <div>
                                                <Button onClick={addQuestion}
                                                    className="bg-gray-900 uppercase tracking-widest">Create Question</Button>
                                            </div>
                                        </div>


                                }

                            </main>
                        </div>
                    )}

                    {/* //For Mobile Form buider here.. */}
                    {width <= breakpoint && form && (
                        <>
                            <div className="h-1">
                                {isLoading && <Slider />}
                            </div>
                            {
                                questionDetail && questionDetail.q_id ?
                                    <>
                                        <MobileBuild form={form} />
                                    </>
                                    :
                                    <div className="md:hidden">

                                        <header className="shadow">
                                            <FormLabel form={form} addQuestion={addQuestion} renameForm={renameForm} />
                                            <Tabs tabs={mobileTabs} />
                                        </header>
                                        <main className="border-t-2">

                                            {window.location.pathname === `/user/form/${form_id}/questions` ? (
                                                <>
                                                    {isLoading || !form ?

                                                        <LoadingSpinner>
                                                            Getting your questions ready..
                                                        </LoadingSpinner>
                                                        :
                                                        <>
                                                            {form.questions &&
                                                                <Questions
                                                                    q_count={form.questions.length}
                                                                    begin_header={form.begin_header}
                                                                    begin_desc={form.begin_desc}
                                                                    end_header={form.end_header}
                                                                    end_desc={form.end_desc}
                                                                    addQuestion={addQuestion}
                                                                    questions={form.questions}
                                                                    handleLanding={handleLanding}
                                                                    copyQuestion={copyQuestion}
                                                                    handleQuestionDelete={handleQuestionDelete}
                                                                />
                                                            }
                                                        </>
                                                    }
                                                </>
                                            ) :
                                                <TabContent />
                                            }
                                        </main>
                                    </div>

                            }
                        </>
                    )}

                    <button id="refreshForm" onClick={() => initForm()}></button>

                    {/* Button can be called from any other page.. */}
                    <button id="addQuestion" onClick={openRightDrawer}> </button>
                    {/* *** */}
                    <QDrawer show={drawerIsOpen}
                        progressQuestion={progressQuestion}
                        currentType={currentType}
                        setCurrentType={setCurrentType}
                        typeAction={typeAction}
                        setDrawerIsOpen={setDrawerIsOpen}
                        form_id={form.form_id}
                        qDrawerPosition={qDrawerPosition}
                    />

                    {drawerIsOpen && <Backdrop onClick={closeDrawer} />}

                </>
            }



        </>
    );
};
export default FormBuilder;

