import { useContext } from "react";
import { BuildQuestionContext } from "../../../shared/contexts/build-question.context";
import NoChoice from "./types/NoChoice";
import OwnChoice from "./types/OwnChoice";


const QuestionType = ({ handleChoices, }) => {
    const { questionDetail } = useContext(BuildQuestionContext)
    return (
        <>
            <div className="w-full mt-2 flex justify-between items-center bg-white">

                {
                    questionDetail.type === "CHOICE"
                        ? <OwnChoice handleChoices={handleChoices} />
                        : <NoChoice />
                }


            </div>

        </>
    )

}
export default QuestionType;