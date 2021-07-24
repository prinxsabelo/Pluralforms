
import { useState, useEffect, } from 'react';
import { useParams } from 'react-router-dom';
import cookie from "js-cookie";
import LoadingSpinner from '../../shared/collection/LoadingSpinner.';

import { useHttpClient } from '../../shared/hooks/http-hook';
import Welcome from '../components/Welcome';
import ThankYou from '../components/ThankYou';
// import FormHeader from '../components/FormHeader';
import FormBody from '../components/FormBody';
import FormFooter from '../components/FormFooter';


export const FormReply = () => {

    const [loader, setLoader] = useState(true)
    const { form_id, ref_id } = useParams();
    const [loadReply, setLoadReply] = useState(true);
    const new_token = Math.random().toString(36).substring(7);
    const [token, setToken] = useState("");
    const [fillForm, setFillForm] = useState(false);
    const { sendRequest, error, isLoading } = useHttpClient();

    const [beginMessage, setBeginMessage] = useState();
    const [endMessage, setEndMessage] = useState();
    const [beginConfirm, setBeginConfirm] = useState(true);
    const [endConfirm, setEndConfirm] = useState(true);
    const [replyArr, setReplyArr] = useState([])
    const [sectionIndex, setSectionIndex] = useState(0);

    const triggerMove = (move) => {
        if (move === "down") {
            document.getElementById(`down${sectionIndex}`).click();
        } else {
            document.getElementById(`up${sectionIndex}`).click();
        }
    }
    const moveSection = (mover, index, fullpageApi) => {
        setSectionIndex(index, sectionIndex);
        if (mover === "down") {
            fullpageApi.moveSectionDown()
        } else {
            fullpageApi.moveSectionUp()
        }

    }

    const submitForm = async () => {
        try {
            const data = await sendRequest(`http://localhost:8000/api/reply/submit`,
                'POST', JSON.stringify({ token, ref_id, form_id }));

            if (data) {
                console.log(data);
                let submitted = true;
                cookie.set("cookedReply", JSON.stringify({ token, ref_id, submitted }));
                setBeginConfirm(false);
                setEndConfirm(true);
            }
        } catch {
            setLoadReply(false);
        }
    }

    useEffect(() => {
        const getReply = async (token) => {
            setLoader(true);
            if (token) {
                try {

                    const data = await sendRequest(`http://localhost:8000/api/reply`,
                        'POST', JSON.stringify({ token, ref_id, form_id }));

                    if (data) {
                        console.log(data);
                        setBeginConfirm(true);
                        setEndConfirm(false);
                        const { begin_header, begin_desc, avatar, end_header, end_desc } = data;
                        setBeginMessage({ begin_header, begin_desc, avatar });
                        setEndMessage({ end_header, end_desc, avatar });
                        setReplyArr(data.arr);
                        setLoadReply(false);

                    }
                } catch {

                    setLoadReply(false);

                }

            }

        }
        const addToken = () => {
            console.log('new token here..');
        }
        // const addToken = async (token) => {
        //     console.log('sending' + token);
        //     try {
        //         const data = await sendRequest(`http://localhost:8000/api/reply/token`,
        //             'POST', JSON.stringify({ token, ref_id, form_id }));
        //         if (data) {
        //             // console.log(data);
        //             cookie.set("cookedReply", JSON.stringify({ token, ref_id }));
        //             setToken(token);
        //             setFillForm(true);
        //             setBeginConfirm(true);
        //             setEndConfirm(false);
        //             console.log('progress..')
        //             getReply(token);
        //         }
        //     } catch {
        //         setLoadReply(false);
        //     }
        //     setLoadReply(false);
        // }

        //Might be kinda comlicated.. There's a need to understand the trick here..
        const checkToken = async () => {
            const cookedReply = cookie.get("cookedReply");
            if (typeof cookedReply === 'undefined') {
                addToken(new_token);
            } else {
                let getCookedReply = JSON.parse(cookedReply);
                const { token } = getCookedReply;
                try {
                    const data = await sendRequest(`http://localhost:8000/api/reply/check`,
                        'POST', JSON.stringify({ token, ref_id, form_id }));
                    if (data) {
                        if (data.ok) {
                            if (!data.tokenExist) {
                                console.log('new here..');
                                addToken(new_token);
                            } else {
                                setFillForm(true);
                                setToken(token);
                            }
                        } else {
                            console.log('submitted..');
                            setEndConfirm(true);
                            setBeginConfirm(false);

                        }
                        setLoadReply(false);

                    }

                    setLoadReply(false);
                } catch {

                }
                console.log(error);

            }
        }


        if (loadReply) {
            checkToken();

        }
        if (fillForm) {
            if (loadReply) {
                setBeginConfirm(true);
                setEndConfirm(false);
                console.log(ref_id, form_id, token);
                getReply(token);
            }

        }
        if (!isLoading)
            setTimeout(() => {
                setLoader(false);
            }, 1000)

    }, [form_id, loadReply, new_token, ref_id, token, fillForm, sendRequest, error, isLoading]);
    return (
        <>
            {loader ?
                <> <LoadingSpinner asOverLay>
                    Getting questions ready for you to fill..
                </LoadingSpinner>
                </> :
                <>
                    {beginConfirm && beginMessage && <>
                        <Welcome beginMessage={beginMessage}
                            startForm={() => setBeginConfirm(false)} />
                    </>}
                    {endConfirm && <ThankYou endMessage={endMessage} />}
                    {!beginConfirm && !endConfirm && (
                        <>
                            {/* <FormHeader avatar={beginMessage.avatar} /> */}
                            {replyArr && replyArr.length > 0
                                ?
                                <>
                                    <FormBody submitForm={submitForm} sectionIndex={sectionIndex} triggerMove={triggerMove} length={replyArr.length} replyArr={replyArr} moveSection={moveSection} />

                                    <FormFooter submitForm={submitForm} sectionIndex={sectionIndex} triggerMove={triggerMove} length={replyArr.length} />
                                </> :
                                <div>
                                    Not found.
                                </div>
                            }
                        </>
                    )}
                </>
            }
        </>
    )
}