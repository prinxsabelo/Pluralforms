import { useContext, useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';
import { Context } from '../contexts/context';
import { FormContext } from '../contexts/form.context';
import { useHttpClient } from '../hooks/http-hook';

import Backdrop from './Backdrop';
import Button from './Button';

const FormDialog = (props) => {
    // let history = useHistory();
    const { sendRequest } = useHttpClient();
    const [loader, setLoader] = useState(false);
    const { dialog, closeDialog, DialogContent, } = useContext(Context);
    const { fixForm } = useContext(FormContext);
    const [header, setHeader] = useState("");
    const [placeholder, setPlaceholder] = useState("");
    const [form, setForm] = useState({
        form_id: "",
        title: ""
    })

    useEffect(() => {
        setLoader(false);
        const ac = new AbortController();
        if (DialogContent) {
            if (DialogContent.header) {
                setHeader(DialogContent.header);
            }
            if (DialogContent.placeholder) {
                setPlaceholder(DialogContent.placeholder)
            }
            if (DialogContent.type === "form") {
                setForm(DialogContent.form);
            }
        }


        return () => ac.abort(); // Abort both fetches on unmount
    }, [setForm, DialogContent])

    const changeHandler = e => {
        const { value } = e.target;
        if (form) {
            const { form_id } = form;
            setForm({ form_id, title: value })
        }


    }
    const handleSubmit = async (ev) => {
        ev.preventDefault();
        setLoader(true);
        const ac = new AbortController();

        if (form) {
            if (form.form_id) {
                try {
                    const { title, begin_desc, begin_header, end_desc, end_header, form_id } = form;
                    const data = await sendRequest(`https://pluralforms.com/pluralforms-api/public/api/user/forms/update`, 'PUT',
                        JSON.stringify({ title, form_id, begin_desc, begin_header, end_desc, end_header }));
                    if (data) {
                        fixForm(data, { fix: "update" });

                    }

                } catch { }

            } else {
                //CREATE NEW FORM..
                if (form.title) {

                    const { title } = form;
                    const data = await sendRequest(`https://pluralforms.com/pluralforms-api/public/api/user/forms`, 'POST', JSON.stringify({ title }));

                    setTimeout(() => {
                        if (data && data.form_id) {
                            fixForm(data, { fix: "new" });

                        }
                    }, 1000)




                }

            }
        }

        return () => ac.abort(); // Abort both fetches on unmount

    }

    return <>
        {dialog &&
            <>
                <Backdrop onClick={closeDialog} />
                {DialogContent.type === "form" && form &&
                    <>

                        <form className="fixed bg-white text-gray-800
                                top-28 left-2 right-2 p-4 z-50 rounded
                                md:top-1/4 md:bottom-1/4 md:left-1/3 md:w-1/3"
                            onSubmit={handleSubmit}
                        >

                            <header className="border-b-2 p-2 flex justify-center">
                                <h3 className="text-2xl md:text-2xl">{header}</h3>
                            </header>
                            <main className="p-2 py-4">
                                <input autoFocus autoComplete="off" value={form.title} placeholder={placeholder} name="title"
                                    onChange={changeHandler}
                                    className="p-2 w-full border-2 rounded text-lg form-title" />
                            </main>
                            <footer className="flex justify-between space-x-4 px-2">
                                <button type="button"
                                    className="text-md underline font-black outline-none focus:outline-none shadow p-3"
                                    onClick={closeDialog}>
                                    Cancel
                                </button>



                                {loader ?
                                    <Button type="submit" className="bg-gray-500 text-lg w-48 uppercase tracking-widest">
                                        Save
                                    </Button> :
                                    <Button type="submit" onClick={handleSubmit} className="bg-gray-900 text-lg w-48 uppercase tracking-widest">
                                        Save
                                    </Button>


                                }


                            </footer>
                        </form>
                    </>

                }

            </>
        }
    </>
}
export default FormDialog;