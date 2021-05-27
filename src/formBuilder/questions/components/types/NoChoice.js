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
        </>
    )
}
export default NoChoice;