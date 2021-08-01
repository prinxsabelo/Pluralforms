import { useState } from "react";
import Button from "../../../shared/collection/Button";

const Text = ({ answer, q_id, a_id, fillReply, index, length, submitForm }) => {
    const breakpoint = 768;

    const [questionAnswer, setQuestionAnswer] = useState(answer || '');
    const handleChange = (e) => {
        if (window.screen.width <= breakpoint && length > index + 1) {

            let form_footer = document.getElementById("form_footer");
            form_footer.classList.add("invisible");
        }

        const { value } = e.target;
        setQuestionAnswer(value);
    }
    const handleFocus = () => {
        let form_footer = document.getElementById("form_footer");
        form_footer.classList.add("visible");
    }
    const handleSubmit = () => {
        fillReply(questionAnswer, q_id, a_id);
        if (index + 1 === length) {
            submitForm();
        }
    }
    return (
        <div className="absolute left-2 right-2 md:relative md:left-0 md:right-0 space-y-4">
            <input className="border-b-4 w-full break-words outline-none
                    placeholder-gray-500  border-red-500 text-lg md:text-xl md:tracking-wide"
                placeholder="Give your response here.." autoComplete="off"
                autoFocus value={questionAnswer} onChange={handleChange} onFocus={() => handleFocus()}
            />

            <Button className="bg-gray-900 p-2   text-lg md:text-xl" onClick={() => handleSubmit()}>
                {index + 1 === length ? <>Submit Form</> : <>Continue</>}
            </Button>
        </div>
    )
}
export default Text;