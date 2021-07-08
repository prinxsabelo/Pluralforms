import { useState, useEffect } from "react";
import {
    CheckIcon
} from "@heroicons/react/outline";
const Choice = ({ allow_multiple_selection, answer, q_id, a_id, choices, fillReply }) => {
    const [arr, setArr] = useState([]);
    if (allow_multiple_selection) {
        if (answer && arr.length === 0) {
            setArr(JSON.parse(answer));
        }
        // if (answer.length > 0) {
        // setArr(JSON.parse(answer));
        // }

    }
    const confirmChoice = (label) => {
        let index = arr.findIndex(x => x === label);

        if (index === -1) {
            setArr([...arr, label])
        } else {
            setArr(arr.filter(x => x !== label))
        }

    }
    const submitChoices = () => {
        console.log(arr);
        fillReply(JSON.stringify(arr), q_id, a_id)
    }
    useEffect(() => {
        console.log(arr);

    }, [arr, answer])
    return (
        <div className="w-11/12 md:max-w-md">
            {allow_multiple_selection ?
                <>
                    <div className="text-lg md:text-sm">
                        Choose as many as you like..
                    </div>

                    {choices.map((choice, index) =>

                        <div key={choice.choice_id} onClick={() => confirmChoice(choice.label)}
                            className={` bg-gray-300 my-2  p-2 min-w-1/4 rounded-xl flex items-center
                                 border-2 cursor-pointer
                                
                             ${answer === choice.label ? 'border-green-400 ' : 'border-gray-400'}   
                            `}

                        >
                            <div className="flex items-center w-11/12">
                                <div className="pr-3">
                                    <div className={`flex font-bold text-white text-sm p-3 w-8 h-8 rounded-xl justify-center items-center
                                   ${answer === choice.label ? 'bg-green-800 ' : 'bg-gray-100 text-gray-800'}   
                            `}>
                                        {String.fromCharCode(index + 1 + 64)}
                                    </div>
                                </div>
                                <div>
                                    {choice.label}
                                </div>
                            </div>
                            <div className="w-1/12 flex items-center justify-end">
                                {answer === choice.label &&
                                    <CheckIcon className="w-6 text-green-800" />
                                }

                            </div>

                        </div>

                    )}
                    <div>
                        <button className="bg-red-400 p-2 m-2 text-2xl" onClick={() => submitChoices()}>
                            Submit
                        </button>
                    </div>
                </>
                :
                <>
                    {choices.map((choice, index) =>

                        <div key={choice.choice_id} onClick={() => fillReply(choice.label, q_id, a_id)}
                            className={` bg-gray-300 my-2  p-2 min-w-1/4 rounded-xl flex items-center
                             border-2 cursor-pointer
                            
                         ${answer === choice.label ? 'border-green-400 ' : 'border-gray-400'}   
                        `}

                        >
                            <div className="flex items-center w-11/12">
                                <div className="pr-3">
                                    <div className={`flex font-bold text-white text-sm p-3 w-8 h-8 rounded-xl justify-center items-center
                               ${answer === choice.label ? 'bg-green-800 ' : 'bg-gray-100 text-gray-800'}   
                        `}>
                                        {String.fromCharCode(index + 1 + 64)}
                                    </div>
                                </div>
                                <div>
                                    {choice.label}
                                </div>
                            </div>
                            <div className="w-1/12 flex items-center justify-end">
                                {answer === choice.label &&
                                    <CheckIcon className="w-6 text-green-800" />
                                }

                            </div>

                        </div>

                    )}
                </>
            }
        </div>
    )
}
export default Choice;
