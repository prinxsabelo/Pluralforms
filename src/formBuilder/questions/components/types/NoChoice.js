import { useContext } from "react";
import { BuildQuestionContext } from "../../../../shared/contexts/build-question.context";
import YN from "./YN";

const NoChoice = (props) => {

    const { questionDetail } = useContext(BuildQuestionContext);

    return (
        <>
            {/* {questionDetail.type === "RATING" &&
                <Rating {...questionDetail} />
            } */}
            {questionDetail.type === "YN" &&
                <YN  {...questionDetail} />
            }
            {questionDetail.type === "TEXT" &&
                <div className="w-full flex items-center space-x-1">
                    <input className="border rounded w-full p-3" readOnly placeholder="You will have your answer here.." />
                </div >
            }
        </>
    )
}
export default NoChoice;