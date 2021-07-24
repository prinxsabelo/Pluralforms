
const SumChildDetail = (props) => {
    const { label, value } = props;
    return (
        <>
            <div className="flex md:hidden space-x-1  justify-start items-center text-lg capitalize tracking-wider  ">
                <div className="">
                    {value}
                </div>
                <div>
                    {label} <span className="md:hidden ">   </span>
                </div>
            </div>
            <div className="hidden md:flex md:flex-col md:w-full md:text-2xl p-2 m-2  w-1/2   shadow-lg capitalize">
                <div className="flex flex-col items-center">
                    <div className="md:text-4xl font-bold ml-1">
                        {value}
                    </div>
                    <div>
                        {label} <span className="md:hidden ">   </span>
                    </div>

                </div>
            </div>
        </>
    )
}
export default SumChildDetail