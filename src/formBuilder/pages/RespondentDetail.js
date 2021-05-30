import FormLabel from "../components/FormLabel";

import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import QTypeIcon from "../../shared/collection/QTypeIcon";
import { ResultContext } from "../../shared/contexts/result-context";

const RespondentDetail = () => {
    let { form_id, token } = useParams();
    // console.log(token);
    const [respondent, setRespondent] = useState([]);
    const { getFormResponses, formResponses } = useContext(ResultContext);
    const [index, setIndex] = useState(0);
    useEffect(() => {
        getFormResponses(form_id);
        if (formResponses) {
            if (formResponses.respondents) {
                let respondents = formResponses.respondents;
                if (respondents) {
                    setRespondent(respondents.find(r => r.token === token));
                    setIndex(respondents.findIndex(resp => resp.token === token) + 1);
                }
            }
        }
    }, [getFormResponses, formResponses, token, form_id])


    return (
        <>
            {respondent ?
                <>
                    <header>
                        <FormLabel />
                        <div className="pl-4 pr-6 py-3 shadow-lg border-b flex items-center justify-between">
                            <div className="">
                                Respondent {index}
                            </div>
                            <div className="text-sm">
                                10-20-2011
                                </div>
                        </div>
                    </header>
                    <main className="ra-list">
                        {respondent.answers && respondent.answers.length > 0 ?
                            <>
                                {respondent.answers.map((answer, index) =>
                                    <div key={index} className="p-4 pt-6 border-b-2 ">
                                        <div className="flex space-x-4">
                                            <span >{index + 1}. </span>
                                            <span>{answer.title} </span>
                                        </div>
                                        <div className="flex space-x-4 px-8 pt-2">
                                            {answer.skipped === false ?
                                                <>
                                                    {answer.type !== "RATING" ?
                                                        <div className="px-1">{answer.text}</div>
                                                        :

                                                        <div className="flex space-x-1">
                                                            {Array.from(Array(parseInt(answer.value)), (rating, index) => {
                                                                return (

                                                                    <QTypeIcon key={index} color="red" className="w-8 text-gray-800"
                                                                        type={answer.type} shape={answer.shape} />
                                                                )
                                                            })}
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
                        form made of love for you..
                        </footer>
                </>
                :
                <div>RESPODENT NOT FOUND..</div>
            }

        </>
    );
}
export default RespondentDetail;