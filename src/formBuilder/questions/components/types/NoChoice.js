import Rating from "./Rating";
import YN from "./YN";

const NoChoice = (props) => {


    return (
        <>
            {props.type === "RATING" &&
                <Rating {...props} />
            }
            {props.type === "YN" &&
                <YN {...props} />
            }
            {props.type === "TEXT" &&
                <div className="w-full flex items-center space-x-1">
                    <input className="border rounded w-full p-3" readOnly placeholder="You will have your answer here.." />
                </div >
            }
        </>
    )
}
export default NoChoice;