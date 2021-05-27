import NoChoice from "./types/NoChoice";
import OwnChoice from "./types/OwnChoice";


const QuestionType = (props) => {

    const { type } = props;

    return (
        <>
            <div className="w-full mt-2 flex justify-between items-center bg-white">

                {
                    type === "CHOICE"
                        ? <OwnChoice {...props} />
                        : <NoChoice {...props} />
                }


            </div>

        </>
    )

}
export default QuestionType;