import { useEffect, useState } from "react";
import Button from "../../../../shared/collection/Button";

const Choice = (props) => {

    const [label, setLabel] = useState("xxx");
    useEffect(() => {
        setLabel(props.label);
    }, [props, setLabel])
    const handleChoice = (event, index) => {

        setLabel(event.target.value);
        props.onChange(event, index)
    }
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            props.addChoice()
        }
    }
    return (
        <>

            <div className=" flex space-x-1 items-center">
                <input autoFocus={props.index === 0 || props.index + 1 == props.choicesLength} autoComplete="off" placeholder={`Choice ${props.index + 1}`}
                    className="border w-full p-3  outline-none rounded focus:border-black"
                    onChange={(event) => handleChoice(event, props.index)}
                    onKeyDown={handleKeyDown}
                    index={props.index}
                    name={`choice${props.index}`}
                    value={label}
                />

                <Button className="bg-transparent text-gray-800 rounded-full md:rounded-lg" onClick={() => props.deleteChoice(props)}>
                    <svg className="w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </Button>


            </div>

        </>
    )
}
export default Choice;