
const SumChildDetail = (props) => {
    const { label, value } = props;
    return (
        <div className="flex md:flex-col md:w-full  md:text-2xl md:p-4 p-2 w-1/2  shadow capitalize">
            <div>
                {label} <span className="md:hidden ">= </span>
            </div>
            <div className="md:text-4xl font-bold">
                {value}
            </div>
        </div>
    )
}
export default SumChildDetail