import { useState } from "react";
import {
    CheckIcon
} from "@heroicons/react/outline";
import Button from "../../../shared/collection/Button";

const Choice = ({ allow_multiple_selection, answer, q_id, a_id, choices, fillReply, index, length, submitForm }) => {
    // console.log(answer);
    const [arr, setArr] = useState([]);
    const [loading, setLoading] = useState(true);
    if (allow_multiple_selection) {
        if (loading) {
            if (answer) {
                //Confirm here if we have an array as response..
                if (answer && answer.includes(`${"["}`) && answer.length !== 0) {
                    setArr(JSON.parse(answer));
                }

            }


            setLoading(false);
        }

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
        fillReply(JSON.stringify(arr), q_id, a_id);
        if (index + 1 === length) {
            submitForm();
        }
    }
    const handleSubmit = () => {
        submitForm();
    }

    return (
        <div className="w-11/12 md:max-w-md  tracking-wide">
            {/* Confirm if multiple selection first then.. */}
            {allow_multiple_selection ?
                <>
                    <div className="text-sm md:text-sm">
                        Choose as many as you like..
                    </div>

                    {choices.map((choice, index) =>

                        <div key={choice.choice_id} onClick={() => confirmChoice(choice.label)}
                            className={` bg-gray-300 my-2  p-2 min-w-1/4 rounded-xl flex items-center
                                 border-2 cursor-pointer hover:border-red-800 
                                
                             ${arr.includes(choice.label) ? 'border-green-400 bg-green-100' : 'border-gray-400 hover:shadow-md hover:p-8'}   
                            `}

                        >
                            <div className="flex items-center w-11/12 text-base">
                                <div className="pr-3">
                                    <div className={`flex font-bold text-white text-sm p-3 w-8 h-8 rounded-xl justify-center items-center
                                  ${arr.includes(choice.label) ? 'bg-green-800 ' : 'bg-gray-100 text-gray-800'}   
                            `}>
                                        {String.fromCharCode(index + 1 + 64)}
                                    </div>
                                </div>
                                <div>
                                    {choice.label}
                                </div>
                            </div>
                            <div className="w-1/12 flex items-center justify-end">
                                {arr.includes(choice.label) &&
                                    <CheckIcon className="w-6 text-green-800" />
                                }

                            </div>

                        </div>

                    )}
                    <div>

                        <Button className="bg-gray-900 p-2 mt-4 w-full text-lg md:text-xl  tracking-widest" onClick={() => submitChoices()}>
                            {index + 1 === length ? <>Submit Form</> : <>Continue</>}
                        </Button>

                    </div>
                </>
                :
                <>
                    {/* Else it is single choice.. */}
                    {choices.map((choice, index) =>

                        <div key={choice.choice_id} onClick={() => fillReply(choice.label, q_id, a_id)}
                            className={` bg-gray-300 my-2  p-2 min-w-1/4 rounded-xl flex items-center
                             border-2 cursor-pointer
                            
                         ${answer === choice.label ? 'border-green-400  bg-green-100' : 'border-gray-400  hover:border-red-800 hover:shadow-md hover:p-8'}   
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

                    {/* If last question.. submit form.. */}
                    {index + 1 === length ?
                        <Button className="bg-gray-900 p-2 mt-4 w-full text-lg md:text-lg  tracking-widest" onClick={() => handleSubmit()}>
                            Submit Form
                        </Button> :
                        <Button className="bg-gray-900 p-2 mt-4 w-full text-lg md:text-lg  tracking-widest" onClick={() => submitChoices()}>
                            Continue
                        </Button>
                    }
                </>
            }
            {choices.length === 0 && index + 1 < length &&
                <div className="flex flex-col space-y-2 p-2">
                    <div className="text-lg">
                        Just continue nothing for you to fill..
                    </div>
                    <Button className="bg-gray-900 p-2 mt-2 text-lg md:text-xl"
                        onClick={() => submitChoices()}>
                        Continue
                    </Button>
                </div>
            }
        </div>
    )
}
export default Choice;
