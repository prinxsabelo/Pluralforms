import { useEffect, useState } from "react";

const Feedback = (props) => {

    const [label, setLabel] = useState("xxx");
    useEffect(() => {
        setLabel(props.label);
    }, [props, setLabel])
    const handleFeedback = (event, index) => {

        setLabel(event.target.value);
        props.onChange(event, index)
    }
    return (
        <>

            <input autoFocus={props.index === 0 || props.index + 1 === props.feedbacksLength} autoComplete="off"
                placeholder={`Feedback If ${props.occupy}`}
                className="border w-full p-3  outline-none rounded focus:border-black"
                onChange={(event) => handleFeedback(event, props.index)}
                index={props.index}
                name={`feedback${props.index}`}
                value={label}
            />





        </>
    )
}
export default Feedback;