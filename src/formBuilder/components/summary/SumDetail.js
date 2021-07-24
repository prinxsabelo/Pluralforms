import SumChildDetail from "./SumChildDetail";

const SumDetail = (props) => {



    const { views, response, started } = props.sum;
    let detail = {}
    if (response === 0) {
        detail = ({ views, started, response, });

    }
    else {
        detail = ({ views, started, responses: response, });
    }
    // console.log(detail);

    return (
        <>
            <div className="hidden md:flex flex-col space-y-2 px-4 text-2xl py-4">
                {Object.keys(detail).map(det => (
                    <SumChildDetail key={det} label={det} value={detail[det]} />
                ))}
            </div>
            <div className="flex md:hidden  w-screen justify-center space-x-8 items-center p-2  border-2 border-gray-300">
                {Object.keys(detail).map(det => (
                    <SumChildDetail key={det} label={det} value={detail[det]} />
                ))}
            </div>
        </>
    )
}
export default SumDetail