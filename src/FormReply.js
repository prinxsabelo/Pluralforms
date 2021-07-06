import ReactFullpage from '@fullpage/react-fullpage'; // will return static version on server and "live" version on client
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/outline";
import { useState, useContext, useEffect } from 'react';

import FormBeginx from './FormBeginx';
import { FormReplyContext } from './shared/contexts/form-reply.context';

export const FormReplyx = () => {
    const { getReply, data } = useContext(FormReplyContext);
    const [loading, setLoading] = useState(true);

    const triggerMove = (move) => {
        console.log(sectionIndex);
        if (move === "down") {
            document.getElementById(`down${sectionIndex}`).click();
        } else {
            document.getElementById(`up${sectionIndex}`).click();
        }
    }
    const moveSection = (mover, index, fullpageApi) => {
        setSectionIndex(index);
        if (mover === "down") {
            fullpageApi.moveSectionDown()
        } else {
            fullpageApi.moveSectionUp()
        }

    }
    const token = 1;
    const form_id = 1;
    useEffect(() => {
        if (loading) {
            getReply({ form_id, token });
            setLoading(false);
        }

    }, [getReply, data, form_id, token, loading])
    const [beginConfirm, setBeginConfirm] = useState(true);

    const [avatar, setAvatar] = useState("xxx");
    const [replyArr, setReplyArr] = useState([]);
    const [sectionIndex, setSectionIndex] = useState(0);
    const beginData = {};
    if (data && data.arr) {
        const { begin_header, begin_desc, arr } = data;
        beginData.header = begin_header;
        beginData.desc = begin_desc;
        if (data.avatar) {
            beginData.avatar = data.avatar;
            setAvatar(data.avatar);
        }
        if (replyArr.length == 0 && data.arr.length > 0) {
            setReplyArr(data.arr);
        }

    }

    const arr = [{ title: "me", bg: "bg-red-400" }, { title: "flow", bg: "bg-green-400" }, { title: "positions", bg: "bg-yellow-500" }, { title: "something", bg: "bg-purple-500" }];
    return (
        <>

            {(beginConfirm) ?
                <FormBeginx beginData={beginData} startForm={() => setBeginConfirm(false)} />
                :
                <>
                    <div className="mmm-b bg-indigo-900 text-white flex justify-end items-center space-x-2">
                        <div>
                            PLURALFORMS = {sectionIndex}
                        </div>
                        <div className="flex space-x-4  ">

                            {sectionIndex - 1 === -1 ?
                                <button disabled={true} className="bg-green-600 cursor-not-allowed disabled:opacity-50 p-2 rounded-xl w-full flex items-center justify-center"
                                    onClick={() => triggerMove('up')}>
                                    <ChevronUpIcon className="w-7" />
                                </button> :
                                <button className="bg-green-600  p-2 rounded-xl w-full flex items-center justify-center"
                                    onClick={() => triggerMove('up')}>
                                    <ChevronUpIcon className="w-7" />
                                </button>
                            }
                            {
                                sectionIndex + 1 === replyArr.length ?
                                    <button disabled={true} className="bg-green-600 cursor-not-allowed disabled:opacity-50 p-2 rounded-xl w-full flex items-center justify-center"
                                        onClick={() => triggerMove('down')}>
                                        <ChevronDownIcon className="w-7" />
                                    </button> :
                                    <button className="bg-green-600 p-2 rounded-xl w-full flex items-center justify-center"
                                        onClick={() => triggerMove('down')}>
                                        <ChevronDownIcon className="w-7" />
                                    </button>
                            }

                        </div>
                    </div>
                    <div className="mmm-t ">
                        {/* Progress bar will be displayed here.. */}
                        <div className="w-full h-3 bg-gray-100 fixed top-0 left-0 right-0 text-xs flex items-center">
                            ..
                        </div>
                        <div className="bg-white relative top-2 -left-1 rounded-full w-14 h-14 flex items-center justify-center">
                            {avatar}
                        </div>
                    </div>
                    <ReactFullpage
                        //fullpage options
                        licenseKey={'YOUR_KEY_HERE'}
                        scrollingSpeed={1000} /* Options here */

                        render={({ state, fullpageApi }) => {
                            return (
                                <ReactFullpage.Wrapper>
                                    {
                                        replyArr.map((rq, index) =>
                                            <div key={rq.q_id} className={` section bg-gray-200`}>
                                                <div className="flex justify-center p-2">
                                                    {rq.title}
                                                </div>
                                                <div className="flex w-full space-x-4 justify-center">

                                                    <button id={`down${index}`} onClick={() => moveSection("down", index + 1, fullpageApi)} className={`up${index} bg-green-500 py-4 py-2 w-24`}>
                                                        down = {index + 1}
                                                    </button>
                                                    <button id={`up${index}`} onClick={() => moveSection("up", index - 1, fullpageApi)} className={`down${index} bg-green-500  py-4 py-2 w-24`}>
                                                        up = {index - 1}
                                                    </button>
                                                </div>

                                            </div>
                                        )
                                    }


                                </ReactFullpage.Wrapper>
                            );
                        }}
                    />
                </>

            }

        </>
    );
};
