import { useEffect, useState } from "react";
import Button from "../../../../shared/collection/Button";

const Response = (props) => {

    const [label, setLabel] = useState("xxx");
    useEffect(() => {
        setLabel(props.label);
    }, [props, setLabel])
    const handleResponse = (event, index) => {

        setLabel(event.target.value);
        props.onChange(event, index)
    }
    return (
        <>

            <input autoFocus={props.index === 0 || props.index + 1 == props.ResponsesLength} autoComplete="off"
                placeholder={`Response If ${props.occupy}`}
                className="border w-full p-3  outline-none rounded focus:border-black"
                onChange={(event) => handleResponse(event, props.index)}
                index={props.index}
                name={`Response${props.index}`}
                value={label}
            />





        </>
    )
}
export default Response; 