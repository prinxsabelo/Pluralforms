import { useState, createContext, useContext } from "react";
import { Context } from "./context";
import { v4 as uuid } from "uuid";
import { useHttpClient } from "../hooks/http-hook";

export const FormContext = createContext();
const FormContextProvider = (props) => {
    const { sendRequest } = useHttpClient();
    // const { setShowDialog, setDialogContent } = useContext(Context);
    const { showDialog, setDialogContent } = useContext(Context);

    const [title, setTitle] = useState("");
    const submitForm = async (form) => {
        console.log(form);
        if (form.form_id) {
            //UPDATE
            try {
                const { title, form_id } = form;
                const response = await sendRequest(`http://localhost:8000/api/user/forms/update`, 'POST', JSON.stringify({ title, form_id }));
                if (response) {
                    console.log(response);
                    alert('continue');

                }
                showDialog(false);
            } catch {
                showDialog(false);
            }

        } else {
            try {
                const { title } = form;
                const response = await sendRequest(`http://localhost:8000/api/user/forms`, 'POST', JSON.stringify({ title }));
                if (response) {
                    alert('continue');
                    console.log(response);
                    // setForms(...forms, response);
                }
                showDialog(false);
            } catch {
                showDialog(false);
            }
        }

        // console.log(form);
        // //Add new Form here..
        // if (form.id === "") {
        //     setForms([
        //         ...forms,
        //         {
        //             title: form.title,
        //             updated_at: "Nov 20, 2020",
        //             form_id: uuid(),
        //             no_questions: 5,
        //             no_responses: 5,
        //         },
        //     ]);
        // }
        // //Update Forms here..
        // else {
        //     let index = forms.findIndex(({form_id }) =>form_id === form.id);
        //     if (index !== -1) {
        //         forms[index].title = form.title;
        //         setForms(forms);
        //     }
        // }
        // showDialog(false);
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
    const getForms = async () => {
        console.log('xx');
        // try {
        //     const response = await sendRequest(`http://localhost:8000/api/user/forms`);
        // }
        // catch { }
    }
    const [forms, setForms] = useState([
        {
            form_id: "1",
            title: "Black cofee game",
            no_questions: 12,
            no_responses: 5,
            updated_at: "Dec 25, 2020",
        },
        {
            form_id: "2",
            title: "Danegrous introduction",
            no_questions: 12,
            no_responses: 5,
            updated_at: "Jan 1, 2021",
        },
        {
            form_id: "10",
            title: "Reconsider Baby",
            no_questions: 12,
            no_responses: 5,
            updated_at: "OCt 21, 1997",
        },
        // {
        //   form_id: "4",
        //   title: "Dirty for you beyond",
        //   no_questions:12,
        //   no_responses: 5,
        //   updated_at: "May 11, 2007",
        // },
        // {
        //   form_id: "5",
        //   title: "Starting Introducion",
        //   no_questions:12,
        //   no_responses: 5,
        //   updated_at: "Jun 11, 3007",
        // },
        // {
        //   form_id: "6",
        //   title: "Tell visual fault",
        //   no_questions:12,
        //   no_responses: 5,
        //   updated_at: "Feb 13, 2000",
        // },
        // {
        //   form_id: "7",
        //   title: "Sleep and worried",
        //   no_questions:12,
        //   no_responses: 5,
        //   updated_at: "Nov 11, 2003",
        // },
        // {
        //   form_id: "8",
        //   title: "My thoughts",
        //   no_questions:12,
        //   no_responses: 5,
        //   updated_at: "Sep 11, 2002",
        // },
        // {
        //   form_id: "9",
        //   title: "Wetin dey xup",
        //   no_questions:12,
        //   no_responses: 5,
        //   updated_at: "Jan 23, 2004",
        // },
        // {
        //   form_id: "10",
        //   title: "Dirty for you beyond",
        //   no_questions:12,
        //   no_responses: 5,
        //   updated_at: "May 11, 2007",
        // },
        // {
        //   form_id: "11",
        //   title: "Starting Introducion",
        //   no_questions:12,
        //   no_responses: 5,
        //   updated_at: "Jun 11, 3007",
        // },
        // {
        //   form_id: "12",
        //   title: "Tell visual fault",
        //   no_questions:12,
        //   no_responses: 5,
        //   updated_at: "Feb 13, 2000",
        // },
    ]);
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
