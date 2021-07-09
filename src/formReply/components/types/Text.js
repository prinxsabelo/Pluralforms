import { useState, useEffect } from "react";
import Button from "../../../shared/collection/Button";

const Text = ({ answer, q_id, a_id, fillReply }) => {
    const [questionAnswer, setQuestionAnswer] = useState(answer || '');
    const handleChange = (e) => {
        const { value } = e.target;
        setQuestionAnswer(value);
    }
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    }
    const handleSubmit = () => {
        fillReply(questionAnswer, q_id, a_id)
    }
    return (
        <div className="absolute left-2 right-2 md:relative md:left-0 md:right-0 space-y-4">
            <input className="border-b-4 w-full break-words outline-none
                    placeholder-gray-500  border-red-500 text-lg md:text-xl md:tracking-wide"
                placeholder="Give your response here.." autoComplete="off"
                autoFocus value={questionAnswer} onChange={handleChange} onKeyDown={handleKeyDown}
            />
            <Button className="bg-gray-900 p-2   text-lg md:text-xl" onClick={() => handleSubmit()}>
                Continue
            </Button>

        </div>
    )
}
export default Text;