import { useState, useEffect } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { toast, Zoom } from 'react-toastify';
import { WhatsappIcon, WhatsappShareButton, FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon } from 'react-share';
import LoadingSpinner from "../../shared/collection/LoadingSpinner.";
const Share = (props) => {
    const { sendRequest, isLoading } = useHttpClient();
    const [loader, setLoader] = useState(true);
    const form_id = window.location.pathname.match(/\d+/)[0];
    const [ref_id, setRefId] = useState("");
    const [formUrl, setFormUrl] = useState("");
    const [initLoad, setInitLoad] = useState(true);
    const handleChange = (e) => {

    }
    useEffect(() => {
        const ac = new AbortController();

        const fetchForm = async () => {
            setLoader(true);
            if (form_id) {
                try {
                    const data = await sendRequest(`http://localhost:8000/api/user/form`, 'POST', JSON.stringify({ form_id }));
                    if (data.form) {
                        setRefId(data.form.ref_id)
                        setFormUrl(`http://localhost:3000/form/${form_id}/${data.form.ref_id}`);
                        setInitLoad(false);
                    } else {

                    }

                } catch {
                    setInitLoad(false);
                }
            }
        }
        if (initLoad) {
            fetchForm();
        }
        return () => ac.abort(); // Abort both fetches on unmount

    }, [form_id, initLoad, sendRequest]);
    if (!isLoading && loader) {
        setTimeout(() => {
            setLoader(false)
        }, 1000)
    }
    const copyLink = () => {
        console.log('xx');
        navigator.clipboard.writeText(formUrl);
        toast.configure();
        const notify = () => toast.success(`Go ahead and use link.. 😎`, {
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
    return (
        <>
            {loader ? <div className="h-screen"><LoadingSpinner /></div> :
                <div className="flex w-screen justify-center pt-8">
                    <div className="w-full md:w-1/2 flex flex-col p-2 space-y-2">
                        <div className="text-lg flex tracking-wider justify-center">
                            Share link for form anyway you want it..
                        </div>

                        <div className="flex w-full justify-center -space-x-1">

                            <input isreadonly="true" onChange={handleChange} value={formUrl} className="border-2 text-sm md:w-9/12 px-2" />
                            <button className="bg-gray-600 text-yellow-100 hover:bg-yellow-600 rounded-0
                                                px-4 tracking-wider py-2"
                                onClick={() => copyLink()}
                            >Copy Link</button>
                        </div>
                        <div className="flex justify-center">
                            <div>
                                <a href={formUrl} target="_blank" className="underline text-sm" rel="noopener noreferrer">Open link in new tab</a>
                                <p className="text-xs">If you decide to open tab, after filling form you can delete your response under *results.</p>
                            </div>
                        </div>
                        <div className="flex justify-center  w-full h-3 space-x-4 pt-8">
                            <div >
                                <WhatsappShareButton url={`http://localhost:3000/form/${form_id}/${ref_id}`}
                                    title={"Please do take your time to fill form.."}
                                >
                                    <WhatsappIcon className="w-full rounded-full" />
                                </WhatsappShareButton>

                            </div>
                            <div >
                                <TwitterShareButton url={`http://localhost:3000/form/${form_id}/${ref_id}`}
                                    title={"Please do take your time to fill form.."}
                                >
                                    <TwitterIcon className="w-full rounded-full" />
                                </TwitterShareButton>

                            </div>
                            <div >
                                <FacebookShareButton url={`http://localhost:3000/form/${form_id}/${ref_id}`}
                                    title={"Please do take your time to fill form.."}
                                >
                                    <FacebookIcon className="w-full rounded-full" />
                                </FacebookShareButton>

                            </div>
                        </div>

                    </div>
                </div >

            }
        </>
    )
}
export default Share;