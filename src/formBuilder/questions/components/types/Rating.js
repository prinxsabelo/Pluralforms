import QTypeIcon from "../../../../shared/collection/QTypeIcon";

const Rating = (props) => {

    let ratings = 5;
    return (
        <div className="w-full flex pl-2 p-5  items-center border">
            {props.properties.shape === "star" &&
                <>
                 {Array.from(Array(parseInt(ratings)),(rating, index) => {
                    return (
                        <QTypeIcon className="w-14" name={rating} color="black" shape="star" type="RATING" key={index} />
                    )
                 })}
                </>

            }
            {
                props.properties.shape === "heart" &&
                <>
                 {Array.from(Array(parseInt(ratings)), (rating, index) => {
                    return (
                        <QTypeIcon className="w-14" name={rating}  color="black" shape="heart" type="RATING" key={index} />
                    )
                 })}
                  
                </>
            }
            {
                props.properties.shape === "thumb" &&
                <>
                {Array.from(Array(parseInt(ratings)), (rating, index) => {
                    return (
                        <QTypeIcon className="w-14" name={rating}  color="black" shape="thumb" type="RATING" key={index} />
                    )
                 })}
                    
                </>
            }


        </div>
    )
}
export default Rating