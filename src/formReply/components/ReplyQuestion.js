import ReplyType from "./ReplyType"
import {
    ChatAltIcon,
    MenuAlt4Icon,
    StarIcon,
    HeartIcon,
    ThumbUpIcon,
    ScaleIcon,
} from "@heroicons/react/outline";
const fillReply = answer => {
    alert(answer);
}
const ReplyQuestion = ({ moveSection, rq, index, fullpageApi }) => {
    console.log(rq)
    return (
        <div key={rq.q_id} className={` section bg-gray-200 w-screen h-screen flex 
                                         items-center justify-center
                                         `}>
            <div className="w-full h-full flex items-center justify-center">
                {/* <div className="w-full md:w-2/3 h-4/5 bg-yellow-400 flex flex-col py-32 px-2 md:px-16"> */}
                <div className="w-full md:w-2/3 h-4/5 bg-yellow-400 flex flex-col py-32 px-2 md:px-16">
                    <div className="flex space-x-2 md:space-x-4">
                        <div className="w-10 h-10 md:w-10 md:h-10 flex items-center 
                                            justify-center bg-red-100 rounded-full">
                            {index + 1}
                        </div>
                        <div className="flex flex-col space-y-2 ">
                            <div className="text-3xl">
                                {rq.title}
                            </div>
                            <form>
                                <fieldset className="flex space-x-3">
                                    <div>
                                        <input className="hidden" type="radio" id="rating-5" name="rating" value="5" />
                                        <label htmlFor="rating-5" onClick={() => { fillReply(5) }} >

                                            <StarIcon className={`w-16  hover:text-red-400
                                             ${rq.answer >= 5 ? 'fill-current text-green-800' : ''}`} />
                                        </label>
                                    </div>
                                    <div>
                                        <input className="hidden" type="radio" id="rating-4" name="rating" value="4" />
                                        <label htmlFor="rating-4" onClick={() => { fillReply(4) }} >
                                            <StarIcon className={` w-16    hover:text-red-400
                                             ${rq.answer >= 4 ? 'fill-current text-green-800' : ''}`} />
                                        </label>
                                    </div>
                                    <div>
                                        <input className="hidden" type="radio" id="rating-3" name="rating" value="3" />
                                        <label htmlFor="rating-3" onClick={() => { fillReply(3) }} >
                                            <StarIcon className={` w-16    hover:text-red-400
                                             ${rq.answer >= 3 ? 'fill-current text-green-800' : ''}`} />
                                        </label>
                                    </div>
                                    <div>
                                        <input className="hidden" type="radio" id="rating-2" name="rating" value="2" />
                                        <label htmlFor="rating-2" onClick={() => { fillReply(2) }} >
                                            <StarIcon className={` w-16    hover:text-red-400
                                             ${rq.answer >= 2 ? 'fill-current text-green-800' : ''}`} />
                                        </label>
                                    </div>
                                    <div>
                                        <input className="hidden" type="radio" id="rating-1" name="rating" value="4" />
                                        <label htmlFor="rating-1" onClick={() => { fillReply(1) }} >
                                            <StarIcon className={` w-16    hover:text-red-400
                                             ${rq.answer >= 1 ? 'fill-current text-green-800' : ''}`} />
                                        </label>
                                    </div>
                                </fieldset>
                            </form>
                            {/* <div>
                                <input id="label1" name="star" type="radio" value="1" />
                                <label htmlFor="label1">
                                    <div>xxxxx</div>
                                </label>
                                <input id="label2" name="star" type="radio" value="2" />
                                <label>
                                    <div>yyyy</div>
                                </label>
                            </div> */}
                        </div>
                    </div>


                </div>
            </div>












            <div className="flex hidden w-full space-x-4 justify-center">

                <button id={`down${index}`} onClick={() => moveSection("down", index + 1, fullpageApi)} className={`up${index} bg-green-500 py-4 py-2 w-24`}>
                    down = {index + 1}
                </button>
                <button id={`up${index}`} onClick={() => moveSection("up", index - 1, fullpageApi)} className={`down${index} bg-green-500  py-4 py-2 w-24`}>
                    up = {index - 1}
                </button>
            </div>

        </div>
    )
}
export default ReplyQuestion