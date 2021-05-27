import { useContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Context } from '../context/context';
import { FormContext } from '../context/form-context';

import Backdrop from './Backdrop';
import Button from './Button';

const Dialog = (props) => {
    const { dialog, showDialog, closeDialog, DialogContent, } = useContext(Context);
    const { submitForm } = useContext(FormContext);
    const { header, placeholder } = DialogContent;
    const [title, setTitle] = useState("");
    const [form, setForm] = useState({
        form_id: "",
        title: ""
    })
    useEffect(() => {
        if (DialogContent.type === "form") {
            setForm(DialogContent.form);
        }
    }, [setForm, DialogContent])

    const changeHandler = e => {
        const { value } = e.target;
        const { form_id } = form;
        setForm({ form_id, title: value })

    }
    const { q_id } = DialogContent;
    return <>
        {dialog &&
            <>
                <Backdrop onClick={closeDialog} />
                {DialogContent.type === "form" &&
                    <>
                        <form className="fixed bg-white text-gray-800
                                top-28 left-2 right-2 p-4 z-50 rounded
                                md:top-1/4 md:bottom-1/4 md:left-1/3 md:w-1/3">
                            <header className="border-b-2 p-2 flex justify-center">
                                <h3 className="text-2xl md:text-2xl">{header}</h3>
                            </header>
                            <main className="p-2 py-4">
                                <input autoFocus autoComplete="off" value={form.title} placeholder={placeholder} name="title" onChange={changeHandler}
                                    className="p-2 w-full border-2 rounded text-lg" />
                            </main>
                            <footer className="flex justify-between space-x-4 px-2">
                                <button type="button"
                                    className="text-md underline font-black outline-none focus:outline-none"
                                    onClick={closeDialog}>
                                    Cancel
                                </button>
                                <Button className="bg-gray-900 text-lg w-48" onClick={() => submitForm(form)}>
                                    Save
                                </Button>

                            </footer>
                        </form>
                    </>

                }
                {DialogContent.type === "delete" &&
                    <div className="fixed bg-white text-gray-800
                                    top-1/2 left-5 right-5 p-4 z-50 rounded
                                    md:top-1/4 md:left-1/3 mx-20 md:w-1/4 flex flex-col space-y-1
                    ">
                        <h3 className="text-lg tracking-wide flex w-full  justify-center">Are you Sure to Delete Question? </h3>

                        <div className="flex w-full justify-end space-x-4 text-sm pt-1 justify-center ">
                            <Button className="bg-gray-100 p-1 rounded-lg text-gray-900" onClick={() => props.cancel()}>Cancel</Button>
                            <Button className="bg-red-700 p-1 rounded-lg" onClick={() => props.onDelete(q_id)}>Delete</Button>

                        </div>
                    </div>
                }
            </>
        }
    </>
}
export default Dialog;