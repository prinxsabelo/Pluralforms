import { useState, createContext, useContext } from "react";
import { Context } from "./context";
import { useHttpClient } from "../hooks/http-hook";
import { useHistory } from 'react-router-dom';
import { ViewportContext } from "./viewport-context";
export const FormContext = createContext();
const FormContextProvider = (props) => {
    const history = useHistory();
    const { sendRequest, isLoading } = useHttpClient();
    // const { setShowDialog, setDialogContent } = useContext(Context);
    const { showDialog, setDialogContent } = useContext(Context);
    const [forms, setForms] = useState([]);
    const [closedForms, setClosedForms] = useState([]);
    const [upForm, setUpForm] = useState();
    const [title, setTitle] = useState("");
    const [landingOpen, setLandingOpen] = useState(false);
    const [landingContent, setLandingContent] = useState();
    const [recieveForm, sendForm] = useState(

    );
    const { width } = useContext(ViewportContext)
    const breakpoint = 768;
    const fixForm = async (form, { fix }) => {
        // console.log(form, fix);
        if (fix === "update") {
            let index = forms.findIndex(f => f.form_id === form.form_id);
            let newForms = [...forms];
            newForms[index] = form;
            setForms(newForms);
            setUpForm({ form, fix });
        } else {
            setForms([...forms, form]);
            setUpForm({ form, fix });
        }
        showDialog(false);
    };
    const addForm = () => {
        // Dialog is being opened right here..
        setDialogContent({
            header: "Create Form",
            placeholder: "Give your form a name",
            type: "form",
            form: { title: "", form_id: "" },
        });
        showDialog(true);
    };
    const editForm = (form) => {
        // Dialog is being opened right here..
        // const { title, form_id } = form;
        // setDialogContent({
        //     header: "Edit Form",
        //     placeholder: "form name.",
        //     type: "form",
        //     form: { title, form_id },
        // });
        // showDialog(true);
    };
    const renameForm = async (title, form_id) => {
        const data = await sendRequest(`https://pluralforms.com/pluralforms-api/public/api/user/forms/update`, 'PUT', JSON.stringify({ title, form_id }));
        if (data) {
            let index = forms.findIndex(form => form_id === form.form_id);
            let newForms = [...forms];
            newForms[index] = data;
            setForms(newForms);
        }
    };
    const deleteForm = async (form_id) => {
        const data = await sendRequest(`https://pluralforms.com/pluralforms-api/public/api/user/forms/delete`, 'DELETE', JSON.stringify({ form_id }));
        if (data) {
            const newClosedForms = closedForms.filter(f => f.form_id !== form_id);
            setClosedForms(newClosedForms);
        }
    };
    const closeForm = async (form_id) => {
        const data = await sendRequest(`https://pluralforms.com/pluralforms-api/public/api/user/forms/close`, 'PUT', JSON.stringify({ form_id }));
        if (data) {
            const newActiveForms = forms.filter(f => f.form_id !== data.form_id);
            setForms(newActiveForms);
            setClosedForms([...closedForms, data]);
        }
    }
    const restoreForm = async (form_id) => {
        const data = await sendRequest(`https://pluralforms.com/pluralforms-api/public/api/user/forms/restore`, 'PUT', JSON.stringify({ form_id }));
        if (data) {
            const newClosedForms = closedForms.filter(f => f.form_id !== data.form_id);
            setClosedForms(newClosedForms);
            setForms([...forms, data]);
        }
    }
    const resetUpForm = ({ form, fix }) => {
        setUpForm();
        if (fix === "new") {
            const { form_id } = form;
            if (width > breakpoint) {
                history.push(`/user/form/${form_id}/build`);
            } else {
                history.push(`/user/form/${form_id}/questions`);
            }

            return;
        }


    }
    const getForms = async () => {
        //Fetch forms here.. If there's any error set forms to empty..
        console.log({ isLoading });
        try {
            const data = await sendRequest(`https://pluralforms.com/pluralforms-api/public/api/user/forms`);
            let activeForms = data.filter(f => f.status === "ACTIVE");
            // console.log(activeForms);
            setForms(activeForms);
            let closedForms = data.filter(c => c.status !== "ACTIVE");
            setClosedForms(closedForms);
        } catch {
            setForms([]);
            setClosedForms([]);
        }
        console.log({ isLoading });
        // console.log({ isLoading });
    }


    const closeLandingModal = () => {

        setLandingOpen(false);
    }
    const openLandingModal = (landing_type, form) => {
        form.landing_type = landing_type;
        setLandingContent(form);
        setLandingOpen(true);
    }


    return (
        <FormContext.Provider
            value={{
                addForm,
                editForm,
                renameForm,
                forms,
                title,
                setTitle,
                fixForm,
                deleteForm,
                getForms,
                closedForms,
                closeForm,
                restoreForm,
                upForm,
                setUpForm,
                resetUpForm,
                landingOpen,
                openLandingModal,
                closeLandingModal,
                landingContent,
                setLandingContent,
                recieveForm,
                sendForm
            }}
        >
            {props.children}
        </FormContext.Provider>
    );
};
export default FormContextProvider;
