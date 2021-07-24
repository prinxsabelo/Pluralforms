import { useEffect, useState } from "react";
import Button from "../../../../shared/collection/Button";

const Choice = (props) => {

    const [label, setLabel] = useState("");
    useEffect(() => {
        if (!props.label) {
            setLabel("");
        } else {
            setLabel(props.label);
        }
    }, [props, setLabel])
    const handleChoice = (event, c_index) => {

        setLabel(event.target.value);
        props.onChange(event, c_index)
    }
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            props.addChoice()
        }
    }
    return (
        <>

            <div className=" flex space-x-1 items-center">
                <input autoFocus={props.c_index === 0 || props.c_index + 1 === props.choicesLength}

                    autoComplete="off"
                    placeholder={`Enter Choice ${props.c_index + 1} here..`}
                    className="border-2 border-gray-300 w-full p-3  outline-none rounded focus:border-gray-700"
                    onChange={(event) => handleChoice(event, props.c_index)}
                    onKeyDown={handleKeyDown}
                    c_index={props.c_index}
                    name={`choice${props.c_index}`}
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