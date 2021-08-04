import {
    StarIcon,
    HeartIcon,
    ThumbUpIcon
} from "@heroicons/react/outline";
import Button from "../../../shared/collection/Button";

const Rating = ({ index, q_id, a_id, shape, answer, fillReply, length, submitForm }) => {
    let ratings = 5;
    if (answer) {
        answer = parseInt(answer);
    }
    const handleSubmit = () => {
        fillReply(answer, q_id, a_id);
        if (index + 1 === length) {
            submitForm();
        }
    }
    return (
        <form className="w-full flex flex-col space-y-12">


            <div className="flex justify-evenly md:justify-start md:space-x-2  tracking-wide">
                {Array.from(Array(parseInt(ratings)), (rating, r_index) => {
                    return (

                        <div key={r_index}>
                            <input className="hidden" type="radio" name="rating" value={r_index + 1} />

                            <label htmlFor={`r${r_index + 1}`} onClick={() => { fillReply(r_index + 1, q_id, a_id) }} >

                                {shape === "star" &&
                                    <StarIcon
                                        className={`w-16 cursor-pointer ${!answer && 'hover:text-purple-400'}
                                        ${answer < r_index + 1 ? 'hover:text-purple-400' : ''}

                                        ${answer > r_index + 1 ? 'fill-current text-red-700 hover:text-red-400' : ''}
                                        ${answer === r_index + 1 && 'fill-current text-red-700'}
                                        `}
                                    />
                                }
                                {shape === "heart" &&
                                    <HeartIcon className={`w-16 cursor-pointer ${!answer && 'hover:text-purple-400'}
                                    ${answer < r_index + 1 ? 'hover:text-purple-400' : ''}

                                    ${answer > r_index + 1 ? 'fill-current text-red-700 hover:text-red-400' : ''}
                                    ${answer === r_index + 1 && 'fill-current text-red-700'}
                                    `}
                                    />
                                }
                                {shape === "thumb" &&
                                    <ThumbUpIcon className={`w-16 cursor-pointer ${!answer && 'hover:text-purple-400'}
                                    ${answer < r_index + 1 ? 'hover:text-purple-400' : ''}

                                    ${answer > r_index + 1 ? 'fill-current text-red-700 hover:text-red-400' : ''}
                                    ${answer === r_index + 1 && 'fill-current text-red-700'}
                                    `}
                                    />
                                }
                            </label>
                        </div>

                    )
                })}
            </div>

            {/* If last question.. submit form.. */}

            <div className="mt-4">
                {index + 1 === length ?
                    <Button className="bg-gray-900 p-2 w-52  text-lg md:text-xl  tracking-widest" onClick={() => handleSubmit()}>
                        Submit Form
                    </Button>
                    :
                    <Button className="bg-gray-900 p-2   w-52  text-lg md:text-xl  tracking-widest" onClick={() => { fillReply(answer, q_id, a_id) }}>
                        Continue
                    </Button>
                }
            </div>

        </form >
    )
}
export default Rating;