import Button from "../../../shared/collection/Button";

const YN = ({ answer, q_id, a_id, fillReply, index, length, submitForm }) => {

    const arr = [
        { label: "Yes", occupy: "Yes" },
        { label: "No", occupy: "No" }
    ]
    const handleSubmit = () => {
        submitForm();
    }
    return (
        <div className="w-1/2 md:w-1/4 space-y-4 tracking-wide">
            {arr.map((choice, index) =>
                <div key={index} onClick={() => fillReply(choice.occupy, q_id, a_id)} className={` bg-gray-300 my-2  p-2 min-w-1/4 rounded-xl flex items-center
                border-2 cursor-pointer 
                ${answer === choice.occupy ? 'border-green-400 bg-green-100' : 'border-gray-400  hover:border-red-800 hover:shadow-md hover:p-8'} 
                `}
                >
                    <div className="flex items-center w-11/12 text-base">
                        <div className="pr-3">
                            <div className={`flex font-bold text-white text-sm p-3 w-8 h-8 rounded-xl justify-center items-center
                                    
                                  ${answer === choice.occupy ? 'bg-green-800 ' : 'bg-gray-100 text-gray-800'}
                            `}>
                                {String.fromCharCode(index + 1 + 64)}
                            </div>
                        </div>
                        <div>
                            {choice.label}
                        </div>
                    </div>

                </div>
            )
            }


            <div className="mt-4 w-full ">
                {index + 1 === length ?
                    <Button className="bg-gray-900 p-2  w-full text-lg md:text-xl  tracking-widest" onClick={() => handleSubmit()}>
                        Submit Form
                    </Button> :
                    <Button className="bg-gray-900 p-2  w-full  text-lg md:text-xl  tracking-widest" onClick={() => { fillReply(answer, q_id, a_id) }}>
                        Continue
                    </Button>
                }
            </div>

        </div >
    )
}
export default YN;