import FormLabel from "../components/FormLabel";

import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import QTypeIcon from "../../shared/collection/QTypeIcon";
import { ResultContext } from "../../shared/contexts/result-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Moment from 'react-moment';

const RespondentDetail = () => {
    let { form_id, token } = useParams();
    const { sendRequest } = useHttpClient();
    const [respondent, setRespondent] = useState([]);
    const { getFormResponses, formResponses } = useContext(ResultContext);
    const [index, setIndex] = useState(0);
    const [loadResponses, setLoadResponses] = useState(false);
    const [form, setForm] = useState();

    useEffect(() => {

        const fetchResponses = async () => {
            try {
                const data = await sendRequest(`http://localhost:8000/api/user/forms/response`, 'POST', JSON.stringify({ form_id }));
                if (data) {
                    if (data.form && data.form.respondents) {
                        const { respondents } = data.form;
                        setRespondent(respondents.find(r => r.token === token));
                        setIndex(respondents.findIndex(resp => resp.token === token) + 1);
                        setLoadResponses(true);
                        setForm(data.form)
                    }
                }
            } catch { setLoadResponses(true); }
        }

        if (!loadResponses) {
            fetchResponses();
        }


    }, [getFormResponses, formResponses, token, loadResponses, sendRequest, form_id])


    return (
        <>
            {respondent ?
                <>
                    <header>

                        <FormLabel form={form} />
                        <div className="pl-4 pr-6 py-3 shadow-lg border-b flex items-center justify-between">
                            <div className="">
                                Respondent {index}
                            </div>
                            <div className="text-sm">
                                <Moment fromNow>{respondent.submittedAt}</Moment>

                            </div>
                        </div>
                    </header>
                    <main className="ra-list mb-4">
                        {respondent.answers && respondent.answers.length > 0 ?
                            <>
                                {respondent.answers.map((answer, index) =>
                                    <div key={index} className="p-4 pt-6 border-b-2 ">
                                        <div className="flex space-x-4">
                                            <span >{index + 1}. </span>
                                            <span>{answer.title} </span>
                                        </div>
                                        <div className="flex space-x-4 px-8 py-2 bg-gray-200">
                                            {answer.skipped === false ?
                                                <>

                                                    {answer.type !== "RATING" ?
                                                        <>
                                                            {answer.allow_multiple_selection === false ?
                                                                <div className="flex space-x-1">
                                                                    {answer.answer}
                                                                </div>
                                                                :
                                                                <div className="flex w-full truncate ...">
                                                                    {
                                                                        (answer.answer).includes(`${"["}`) && (answer.answer).length !== 0 ?
                                                                            <div className="flex flex-col w-full">
                                                                                {JSON.parse((answer.answer)).map(an =>
                                                                                    <span key={an} className="pr-1 border-b-2 border-red-300 w-full">{an}
                                                                                        {JSON.parse(answer.answer).length > 1 && <>.. </>}
                                                                                    </span>
                                                                                )}
                                                                            </div> :
                                                                            <></>
                                                                    }

                                                                </div>
                                                            }
                                                        </>
                                                        :

                                                        <div className="flex space-x-1">
                                                            {answer.answer &&
                                                                <>
                                                                    {Array.from(Array(parseInt(answer.answer)), (rating, index) => {
                                                                        return (

                                                                            <QTypeIcon key={index} color="red" className="w-8 text-gray-800"
                                                                                type={answer.type} shape={answer.shape} />
                                                                        )
                                                                    })}
                                                                </>
                                                            }

                                                        </div>

                                                    }
                                                </>
                                                :
                                                <div className="px-1">
                                                    ..
                                                </div>
                                            }
                                        </div>
                                    </div>
                                )}
                            </>
                            : <div>
                                No answer found..
                            </div>
                        }


                    </main>
                    <footer className="fixed bottom-0 bg-white border-t w-full p-3 tracking-wider uppercase text-sm">
                        pluralforms made of love for you..
                    </footer>
                </>
                :
                <div>RESPODENT NOT FOUND..</div>
            }

        </>
    );
}
export default RespondentDetail;