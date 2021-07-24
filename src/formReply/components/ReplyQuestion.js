
import { useContext } from "react";
import { FormReplyContext } from "../../shared/contexts/form-reply.context";
import { useParams } from 'react-router-dom';
import Rating from "./types/Rating";
import Choice from "./types/Choice";
import Text from "./types/Text";
import YN from "./types/YN";
import cookie from "js-cookie";
import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ReplyQuestion = ({ moveSection, rq, index, fullpageApi, length, submitForm }) => {
    const { sendReply } = useContext(FormReplyContext);
    const { form_id } = useParams();
    const cookedReply = cookie.get("cookedReply");
    const { token } = JSON.parse(cookedReply);
    // console.log(rq)
    // console.log(index);
    const fillReply = (answer, q_id, a_id) => {
        const sender = () => {
            sendReply({ form_id, answer, q_id, a_id, token });

            if (length > index + 1) {
                moveSection("down", index += 1, fullpageApi)
            }
        }

        if (rq.type === "YN" && !rq.submitted) {
            let f_index = rq.feedback.findIndex(feed => feed.occupy === answer);
            if (f_index !== -1) {
                sendReply({ form_id, answer, q_id, a_id, token });
                if (rq.feedback[f_index].label) {
                    toast.configure();
                    const notify = () => toast.info(`${rq.feedback[f_index].label}`, {
                        transition: Bounce,
                        position: "bottom-center",
                        autoClose: 4000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: 0,

                    })
                    notify();
                    setTimeout(() => {
                        if (length > index + 1) {
                            moveSection("down", index += 1, fullpageApi)
                        }
                    }, 4000)
                }
                else {
                    moveSection("down", index += 1, fullpageApi)
                }
            }
        } else {
            sender();
        }

        rq.submitted = true;
        rq.answer = answer;
    }

    return (
        <div key={rq.q_id} className={` section bg-white w-screen h-screen flex 
                                         items-center justify-center
                                         `}>
            <div className="w-full h-full flex mt-36 justify-center">
                <div className="w-full md:w-2/3 h-2/3">
                    <div
                        className={`
                                ${rq.type !== "CHOICE" && 'flex w-full w-10/12  h-full flex-col px-2  md:px-16 py-32'}
                                ${rq.type === "CHOICE" && 'flex w-full w-10/12  h-full flex-col justify-center'}
                        `}>
                        <div className="flex space-x-2">
                            <div className="flex justify-center py-2 rounded-full ">
                                {index + 1}=
                            </div>
                            <div className={`flex-col space-y-4 pt-1 w-full `}>

                                <div className="text-2xl md:text-3xl md:pb-2 flex-wrap break-words w-full">
                                    {rq.title}
                                </div>

                                {rq.type === "YN" && (
                                    <YN index={index} q_id={rq.q_id} a_id={rq.a_id} length={length}
                                        answer={rq.answer} feedback={rq.feedback}
                                        fillReply={fillReply} submitForm={submitForm}
                                    />
                                )}

                                {rq.type === "RATING" && (
                                    <Rating index={index} q_id={rq.q_id} a_id={rq.a_id} length={length}
                                        answer={rq.answer} shape={rq.shape}
                                        fillReply={fillReply} submitForm={submitForm}
                                    />
                                )}


                                {rq.type === "CHOICE" && (
                                    <Choice allow_multiple_selection={rq.allow_multiple_selection} length={length}
                                        index={index} q_id={rq.q_id} a_id={rq.a_id}
                                        answer={rq.answer} choices={rq.choices}
                                        fillReply={fillReply} submitForm={submitForm}
                                    />
                                )}


                                {rq.type === "TEXT" && (
                                    <Text index={index} q_id={rq.q_id} a_id={rq.a_id} length={length}
                                        answer={rq.answer} fillReply={fillReply} submitForm={submitForm}
                                    />
                                )}

                            </div>
                        </div>


                    </div>
                </div>
            </div>

            <div className="flex hidden w-full space-x-4 justify-center">

                <button id={`down${index}`} onClick={() => moveSection("down", index + 1, fullpageApi)} className={`up${index} bg-green-500 py-4 py-2 w-24`}>
                    down = {index + 1}
                </button>
                <button id={`up${index}`} onClick={() => moveSection("up", index - 1, fullpageApi)} className={`down${index} bg-green-500  py-4 py-2 w-24`}>
                    up = {index - 1}
                </button>
            </div>

        </div >
    )
}
export default ReplyQuestion