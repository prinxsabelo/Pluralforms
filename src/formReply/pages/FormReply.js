
import { useState, useEffect, useCallback } from 'react';
import cookie from "js-cookie";
import { useHttpClient } from '../../shared/hooks/http-hook';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../../shared/collection/LoadingSpinner.';
import Welcome from '../components/Welcome';
import ThankYou from '../components/ThankYou';
import FormBody from '../components/FormBody';
import FormFooter from '../components/FormFooter';
import useFade from '../../shared/hooks/fade-hook';
import FormHeader from '../components/FormHeader';

//Lmao.. This page is kinda.. 😏


export const FormReply = () => {
    const [loader, setLoader] = useState(true)
    const [isVisible, setVisible, fadeProps] = useFade();

    const { sendRequest, isLoading } = useHttpClient();
    const [token, setToken] = useState();
    const { form_id, ref_id } = useParams();

    // Monitoring the landing page here..
    const [beginMessage, setBeginMessage] = useState();
    const [endMessage, setEndMessage] = useState();
    const [beginConfirm, setBeginConfirm] = useState(true);
    const [endConfirm, setEndConfirm] = useState(true);



    const [replyArr, setReplyArr] = useState([])

    const [sectionIndex, setSectionIndex] = useState(0);


    const cookedReply = cookie.get("cookedReply");



    //Triggering action with respect to the hidden button here..
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
        //Making sure the form_footer appears..
        let form_footer = document.getElementById("form_footer");
        form_footer.classList.remove("invisible");
    }

    //Submitting form here..
    const submitForm = async () => {
        //Calling to submit and also confirming if thankYou message exists.. If it does it appears.
        try {
            const data = await sendRequest(`http://localhost:8000/api/reply/submit`,
                'POST', JSON.stringify({ token, ref_id, form_id }));

            if (data) {
                setBeginConfirm(false);
                setEndConfirm(true);
            }
        } catch {

        }
    }

    //Getting reply for audience here..
    const getReply = useCallback(async () => {
        try {
            const data = await sendRequest(`http://localhost:8000/api/reply`,
                'POST', JSON.stringify({ token, ref_id, form_id }));
            if (data) {
                setBeginConfirm(true);
                setEndConfirm(false);
                const { begin_header, begin_desc, avatar, end_header, end_desc } = data;
                setBeginMessage({ begin_header, begin_desc, avatar });
                setEndMessage({ end_header, end_desc, avatar });
                setReplyArr(data.arr);
                // console.log(data);
                setVisible(true)

            }
        } catch { }
    }, [token, ref_id, form_id, sendRequest, setVisible])

    const checkForm = useCallback(async () => {
        //Adding a new token here if it does not exist already..
        const addToken = async () => {
            let token = Math.random().toString(36).substring(7);
            try {
                const data = await sendRequest(`http://localhost:8000/api/reply/token`,
                    'POST', JSON.stringify({ token, ref_id, form_id }));
                if (data) {
                    // console.log(data);
                    cookie.set("cookedReply", JSON.stringify({ token, ref_id }));
                    setToken(token);

                }
            } catch {

            }
        }

        if (typeof cookedReply === 'undefined') {
            addToken();
        } else {
            //Getting existing token for usage here..
            let getCookedReply = JSON.parse(cookedReply);
            const { token } = getCookedReply;
            //confirm if user is the one previewing his/her form..
            const userData = cookie.get("userData");
            let email;
            if (userData) {
                const { user } = JSON.parse(userData);
                email = user.email;
            }

            try {
                const data = await sendRequest(`http://localhost:8000/api/reply/check`,
                    'POST', JSON.stringify({ token, ref_id, form_id, email }));
                if (data) {
                    //If token does not exist.. create a new one here..
                    if (data.ok && !data.tokenExist) {
                        addToken();

                    }
                    //If token exist and form is available continue here..
                    else if (data.ok && data.tokenExist) {
                        setToken(token);
                    } else {
                        setBeginConfirm(false);
                        setEndConfirm(true);
                        setVisible(true)

                    }
                }
            } catch {

            }
        }


    }, [cookedReply, form_id, ref_id, setToken, setVisible, sendRequest])
    if (!isLoading) {
        setTimeout(() => {
            setLoader(false);
        }, 1000);
        //Start animation loading here..
    }

    useEffect(() => {

        checkForm()

        if (token) {

            getReply();
        }
    }, [checkForm, token, getReply]);

    return (
        <>

            {loader ?
                <>
                    <LoadingSpinner asOverLay>
                        Getting questions ready for you to fill..
                    </LoadingSpinner>
                </> :
                <>
                    {beginConfirm && <>
                        {isVisible &&
                            <div {...fadeProps}>
                                <Welcome beginMessage={beginMessage}
                                    startForm={() => setBeginConfirm(false)} />
                            </div>
                        }
                    </>}
                    {endConfirm && <>
                        {isVisible &&
                            <div {...fadeProps}>
                                <ThankYou endMessage={endMessage} />
                            </div>
                        }
                    </>

                    }
                    {!beginConfirm && !endConfirm && (
                        <>
                            {isVisible &&
                                <div {...fadeProps}>
                                    {/* <FormHeader avatar={beginMessage.avatar} /> */}
                                    <FormHeader length={replyArr.length} sectionIndex={sectionIndex} />
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
                                </div>
                            }
                        </>
                    )}
                </>
            }
        </>
    )

}