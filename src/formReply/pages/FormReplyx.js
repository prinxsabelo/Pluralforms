
import { useState, useEffect, } from 'react';
import { useParams } from 'react-router-dom';
import cookie from "js-cookie";

import Welcome from '../components/Welcome';
import FormBody from '../components/FormBody';
import FormFooter from '../components/FormFooter';
import FormHeader from '../components/FormHeader';
import { useHttpClient } from '../../shared/hooks/http-hook';
import LoadingSpinner from '../../shared/collection/LoadingSpinner.';
import ThankYou from '../components/ThankYou';

export const FormReplyx = () => {
    // const { errorMessage } = useContext(FormReplyContext);
    // if (errorMessage) { }
    const [replyArr, setReplyArr] = useState([]);
    const [sectionIndex, setSectionIndex] = useState(0);

    const [beginConfirm, setBeginConfirm] = useState(true);
    const [endConfirm, setEndConfirm] = useState(true);
    const [beginMessage, setBeginMessage] = useState();
    const [endMessage, setEndMessage] = useState();
    const [token, setToken] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [loadReply, setLoadReply] = useState(false);
    const { sendRequest, isLoading } = useHttpClient();
    const [loader, setLoader] = useState(true)

    //Fetch  form_id from url..
    const { form_id, ref_id } = useParams();


    const new_token = Math.random().toString(36).substring(7);
    const triggerMove = (move) => {
        console.log(move);
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

                setEndConfirm(true);
            }
        } catch {
            setLoadReply(true);
        }
    }
    useEffect(() => {

        const fetchCookedReply = () => {
            const cookedReply = cookie.get("cookedReply");
            const addToken = async (token, submitted) => {
                try {
                    const data = await sendRequest(`http://localhost:8000/api/reply/token`,
                        'POST', JSON.stringify({ token, ref_id, form_id }));

                    if (data) {
                        console.log(data);
                        cookie.set("cookedReply", JSON.stringify({ token, ref_id, submitted }));
                    }
                } catch {
                    setLoadReply(true);
                }

            }
            const checkToken = async (token) => {
                console.log(token, ref_id);
                try {
                    const data = await sendRequest(`http://localhost:8000/api/reply/check`,
                        'POST', JSON.stringify({ token, ref_id, form_id }));
                    console.log(data);
                    if (data) {
                        console.log(data);
                        setLoadReply(true);
                    }
                } catch {
                    setLoader(false);
                }
            }
            if (typeof cookedReply === 'undefined') {
                console.log('new here..')
                setToken(new_token);
                setSubmitted(false);
                console.log(submitted);
                let token = new_token
                addToken(token, submitted)

            } else {
                let getCookedReply = JSON.parse(cookedReply);
                console.log(getCookedReply);
                if (!loadReply) {
                    checkToken(getCookedReply.token);
                }


                // const { token, submitted, ref_id } = JSON.parse(cookedReply);

                // if (getCookedReply.ref_id === ref_id) {
                //     checkToken(getCookedReply.token);
                //     // setSubmitted(getCookedReply.submitted);
                //     // if (getCookedReply.submitted) {
                //     //     console.log('submitted alreadyxx');
                //     //     setEndConfirm(true);

                //     // } 
                //     setTimeout(() => {
                //         setLoader(false);
                //     }, 1000)
                // } else {
                //     setToken(getCookedReply.token);
                //     addToken(token, submitted)
                // }


            }
        }
        fetchCookedReply();
        if (submitted) {
            console.log('done filling form..');
        } else {
            const getReply = async () => {
                setLoader(true);
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
                        setLoadReply(true);

                    }
                } catch {

                    setLoadReply(true);
                }

            }
            if (!loadReply && token) {
                getReply();

            }

        }
    }, [new_token, setToken, token, form_id, loadReply, ref_id, sendRequest, submitted])

    if (!isLoading && loader) {
        setTimeout(() => {
            setLoader(false);
        }, 1000)
    }

    return (
        <>

            {loader ?
                <>
                    {loader &&
                        <LoadingSpinner asOverLay>
                            Getting questions ready for you to fill..
                        </LoadingSpinner>}
                </> :
                <>
                    {beginConfirm && !endConfirm &&
                        <>

                            <Welcome beginMessage={beginMessage}
                                startForm={() => setBeginConfirm(false)} />


                        </>
                    }

                    {!beginConfirm && !endConfirm &&
                        <>
                            <FormHeader avatar={beginMessage.avatar} />
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
                    }
                    {
                        endConfirm &&
                        <>
                            <ThankYou endMessage={endMessage} />
                        </>
                    }
                </>



            }
        </>
    )
}