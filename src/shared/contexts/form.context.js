import { useState, createContext, useContext } from "react";
import { Context } from "./context";
import { useHttpClient } from "../hooks/http-hook";
import { useHistory } from 'react-router-dom';
export const FormContext = createContext();
const FormContextProvider = (props) => {
    const history = useHistory();
    const { sendRequest, isLoading } = useHttpClient();
    // const { setShowDialog, setDialogContent } = useContext(Context);
    const { showDialog, setDialogContent } = useContext(Context);
    const [forms, setForms] = useState([]);
    const [closedForms, setClosedForms] = useState([]);

    const [title, setTitle] = useState("");
    const submitForm = async (form) => {
        console.log(form);
        console.log({ isLoading });
        if (form.form_id) {
            //UPDATE EXISTING FORM
            try {
                const { title, begin_desc, begin_header, end_desc, end_header, form_id } = form;
                const response = await sendRequest(`http://localhost:8000/api/user/forms/update`, 'PUT',
                    JSON.stringify({ title, form_id, begin_desc, begin_header, end_desc, end_header }));
                if (response) {
                    let index = forms.findIndex(form => form_id === form.form_id);
                    let newForms = [...forms];
                    newForms[index] = response;
                    setForms(newForms);
                }
            } catch { }
            showDialog(false);
        } else {
            //CREATE NEW FORM..
            try {
                const { title } = form;
                const response = await sendRequest(`http://localhost:8000/api/user/forms`, 'POST', JSON.stringify({ title }));
                if (response) {
                    // alert('continue');
                    console.log(response);
                    console.log(forms);
                    setForms([...forms, response]);
                }
                showDialog(false);
                //REDIRECT TO FORM..
                const { form_id } = response;
                history.push(`/user/form/${form_id}/build`);
            } catch {
                showDialog(false);
            }
        }
        console.log(isLoading);
    };
    const addForm = () => {
        setDialogContent({
            header: "Create Form",
            placeholder: "Give your form a name",
            type: "form",
            form: { title: "", form_id: "" },
        });
        showDialog(true);
    };
    const editForm = (form) => {
        const { title, form_id } = form;
        setDialogContent({
            header: "Edit Form",
            placeholder: "form name.",
            type: "form",
            form: { title, form_id },
        });
        showDialog(true);
    };
    const renameForm = async (title, form_id) => {
        const response = await sendRequest(`http://localhost:8000/api/user/forms/update`, 'PUT', JSON.stringify({ title, form_id }));
        if (response) {
            let index = forms.findIndex(form => form_id === form.form_id);
            let newForms = [...forms];
            newForms[index] = response;
            setForms(newForms);
        }
    };
    const deleteForm = async (form_id) => {
        const response = await sendRequest(`http://localhost:8000/api/user/forms/delete`, 'DELETE', JSON.stringify({ form_id }));
        if (response) {
            const newClosedForms = closedForms.filter(f => f.form_id !== form_id);
            setClosedForms(newClosedForms);
        }
    };
    const closeForm = async (form_id) => {
        const response = await sendRequest(`http://localhost:8000/api/user/forms/close`, 'PUT', JSON.stringify({ form_id }));
        if (response) {
            const newActiveForms = forms.filter(f => f.form_id !== response.form_id);
            setForms(newActiveForms);
            setClosedForms([...closedForms, response]);
        }
    }
    const restoreForm = async (form_id) => {
        const response = await sendRequest(`http://localhost:8000/api/user/forms/restore`, 'PUT', JSON.stringify({ form_id }));
        if (response) {
            const newClosedForms = closedForms.filter(f => f.form_id !== response.form_id);
            setClosedForms(newClosedForms);
            setForms([...forms, response]);
        }
    }
    const getForms = async () => {
        //Fetch forms here.. If there's any error set forms to empty..
        try {
            const response = await sendRequest(`http://localhost:8000/api/user/forms`);
            let activeForms = response.filter(f => f.status === "active");
            setForms(activeForms);
            let closedForms = response.filter(c => c.status !== "active");
            setClosedForms(closedForms);
        } catch {
            setForms([]);
            setClosedForms([]);
        }

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
                submitForm,
                deleteForm,
                getForms,
                closedForms,
                closeForm,
                restoreForm
            }}
        >
            {props.children}
        </FormContext.Provider>
    );
};
export default FormContextProvider;
