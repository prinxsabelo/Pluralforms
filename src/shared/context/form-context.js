import { useState, createContext, useContext } from "react";
import { Context } from "./context";
import { v4 as uuid } from "uuid";

export const FormContext = createContext();
const FormContextProvider = (props) => {
    // const { setShowDialog, setDialogContent } = useContext(Context);
    const { Dialog, showDialog, setDialogContent } = useContext(Context);

    const [title, setTitle] = useState("");
    const submitForm = (form) => {
        console.log(form);
        //Add new Form here..
        if (form.form_id === "") {
            setForms([
                ...forms,
                {
                    title: form.title,
                    updated_at: "Nov 20, 2020",
                    form_id: uuid(),
                    no_questions: 5,
                    no_responses: 5,
                },
            ]);
        }
        //Update Forms here..
        else {
            let index = forms.findIndex(({ form_id }) => form_id === form.form_id);
            if (index != -1) {
                forms[index].title = form.title;
                setForms(forms);
            }
        }
        showDialog(false);
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
        let formIndex = forms.findIndex((f) => f.form_id === form_id);
        if (formIndex !== -1) {
            forms[formIndex].title = title;
            setForms(forms);
        }
    };
    const deleteForm = (form_id) => {
        const filteredForms = forms.filter((f) => f.form_id !== form_id);
        setForms(filteredForms);
    };
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
            form_id: "3",
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
            }}
        >
            {props.children}
        </FormContext.Provider>
    );
};
export default FormContextProvider;
