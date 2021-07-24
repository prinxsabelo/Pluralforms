import { useEffect, useState } from "react";

const Feedback = (props) => {

    const [label, setLabel] = useState("");
    useEffect(() => {

        if (props.label) {
            setLabel(props.label);
        } else {
            setLabel("");
        }

    }, [props, setLabel])
    const handleFeedback = (event, index) => {
        setLabel(event.target.value);
        props.onChange(event, index)
    }
    return (
        <>
            <div>
                <label className="block text-gray-700 text-sm font-bold my-1" htmlFor={`label${props.index}`}>
                    Your Feedback If {props.occupy}
                </label>
                <input autoFocus={props.index === 0 || props.index + 1 === props.feedbacksLength} autoComplete="off"
                    placeholder={`Give Feedback If ${props.occupy}`}
                    className="border  border-gray-600 w-full p-3  outline-none rounded focus:border-black
                 placeholder-gray-500" id={`label${props.index}`}
                    onChange={(event) => handleFeedback(event, props.index)}
                    index={props.index}
                    name={`feedback${props.index}`}
                    value={label}
                />

            </div>





        </>
    )
}
export default Feedback;