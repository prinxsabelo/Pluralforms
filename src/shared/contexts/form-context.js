import { useState, createContext, useContext } from "react";
import { Context } from "./context";
import { useHttpClient } from "../hooks/http-hook";

export const FormContext = createContext();
const FormContextProvider = (props) => {
    const { sendRequest, isLoading } = useHttpClient();
    // const { setShowDialog, setDialogContent } = useContext(Context);
    const { showDialog, setDialogContent } = useContext(Context);
    const [forms, setForms] = useState([]);
    const [title, setTitle] = useState("");
    const submitForm = async (form) => {
        console.log(form);
        console.log(isLoading);
        if (form.form_id) {
            //UPDATE EXISTING FORM
            try {
                const { title, form_id } = form;
                const response = await sendRequest(`http://localhost:8000/api/user/forms/update`, 'POST', JSON.stringify({ title, form_id }));
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
                alert(response.form_id);
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
    const renameForm = (title, form_id) => {
        let formIndex = forms.findIndex((f) => f.id === form_id);
        if (formIndex !== -1) {
            forms[formIndex].title = title;
            setForms(forms);
        }
    };
    const deleteForm = (form_id) => {
        const filteredForms = forms.filter((f) => f.id !== form_id);
        setForms(filteredForms);
    };
    // const getForms = async () => {
    //     console.log('xx');
    //     // try {
    //     //     const response = await sendRequest(`http://localhost:8000/api/user/forms`);
    //     // }
    //     // catch { }
    // }

    const getForms = async () => {
        //Fetch forms here.. If there's any error set forms to empty..
        try {
            const response = await sendRequest(`http://localhost:8000/api/user/forms`);
            setForms(response);
        } catch {
            setForms([]);
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
                getForms
            }}
        >
            {props.children}
        </FormContext.Provider>
    );
};
export default FormContextProvider;
