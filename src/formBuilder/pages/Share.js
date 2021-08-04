import { useState, useEffect } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { toast, Zoom } from 'react-toastify';
import { WhatsappIcon, WhatsappShareButton, FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon } from 'react-share';
import LoadingSpinner from "../../shared/collection/LoadingSpinner.";
const Share = (props) => {
    const { sendRequest, isLoading } = useHttpClient();
    const [loader, setLoader] = useState(true);
    const form_id = window.location.pathname.match(/\d+/)[0];
    const [formUrl, setFormUrl] = useState("");
    const [initLoad, setInitLoad] = useState(true);
    const [form, setForm] = useState();
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

                        setForm(data.form);
                        setFormUrl(`https://pluralforms.com/form/${form_id}/${data.form.ref_id}`);
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
        <div className="flex justify-center">
            {loader ? <div className="h-screen"><LoadingSpinner /></div> :
                <div className="container max-w-screen-sm p-2 md:p-4 border shadow flex flex-col items-center space-y-6 mt-4">
                    <div className="w-9/12  flex flex-col space-y-2 p-2">
                        <div className="text-lg flex flex-col space-y-3 tracking-wider ">
                            Share link for form anyway you want..
                        </div>
                        <div className="flex -space-x-2 w-full  rounded-lg ">
                            <input isreadonly="true" onChange={handleChange}
                                value={formUrl} className="rounded-l-lg border-2 text-xs w-9/12 md:text-sm md:w-8/12 px-2" />
                            <button className="bg-gray-700 flex-auto text-yellow-100 hover:bg-yellow-600 rounded-0
                                                   px-4 tracking-wider py-2  rounded-r-lg "
                                onClick={() => copyLink()}
                            >Copy Link</button>
                        </div>
                        <div className="w-full ">
                            <a href={formUrl} target="_blank" rel="noopener noreferrer"
                                className="bg-gray-700 px-4 py-2 flex px-20 rounded-lg   tracking-widest font-black text-white  text-base  block">
                                Preview Form on a new tab
                            </a>

                        </div>
                        <div className="flex flex-col space-y-1 w-full ">
                            <div className="border-2 border-gray-300 shadow h-12 rounded-lg  ">
                                <WhatsappShareButton url={`https://pluralforms.com/form/${form.form_id}/${form.ref_id}`}
                                    title={"Please do take your time to fill form.."}
                                    className="w-full flex h-full items-center space-x-8 block    border-2 border-gray-800  whatsapp"
                                >
                                    <span className="wb px-2 h-full flex items-center">
                                        <WhatsappIcon className="h-8 w-8 rounded-full" />
                                    </span>

                                    <span className="tracking-widest font-black  text-base"> Share on WhatsApp</span>
                                </WhatsappShareButton>
                            </div>
                            <div className="border-2 border-gray-300 shadow h-12 rounded-lg ">
                                <FacebookShareButton url={`https://pluralforms.com/form/${form.form_id}/${form.ref_id}`}
                                    title={"Please do take your time to fill form.."}
                                    className="w-full flex h-full items-center space-x-8 block    border-2 border-gray-800  whatsapp"
                                >
                                    <span className="fb px-2 h-full flex items-center">
                                        <FacebookIcon className="h-8 w-8 rounded-full" />
                                    </span>

                                    <span className="tracking-widest font-black text-base"> Share on Facebook</span>
                                </FacebookShareButton>
                            </div>

                            <div className="border-2 border-gray-300 shadow h-12 rounded-lg  ">
                                <TwitterShareButton url={`https://pluralforms.com/form/${form.form_id}/${form.ref_id}`}
                                    title={"Please do take your time to fill form.."}
                                    className="w-full flex h-full items-center space-x-8 block    border-2 border-gray-800  whatsapp"
                                >
                                    <span className="tb px-2 h-full flex items-center">
                                        <TwitterIcon className="h-8 w-8 rounded-full" />
                                    </span>

                                    <span className="tracking-widest font-black text-base"> Share on Twitter</span>
                                </TwitterShareButton>
                            </div>

                        </div>

                    </div>
                </div>
            }
        </div>
    )
}
export default Share;