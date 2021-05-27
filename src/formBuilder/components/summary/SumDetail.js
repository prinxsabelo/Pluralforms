import SumChildDetail from "./SumChildDetail";


const SumDetail = (props) => {
    const detail = {
        views: 20,
        started: 10,
        completed: 10,
        average_time: 300
    }

    return (
        <>
            <div className="hidden md:flex flex-col space-y-2 px-4 text-xl py-4">
                {Object.keys(detail).map(det => (
                    <SumChildDetail key={det} label={det} value={detail[det]} />
                ))}
            </div>
            <div className="md:hidden flex no-wrap w-full flex-wrap text-sm tracking-wider">
                {Object.keys(detail).map(det => (
                    <SumChildDetail key={det} label={det} value={detail[det]} />
                ))}
            </div>
        </>
    )
}
export default SumDetail