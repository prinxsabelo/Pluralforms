const FormHeader = ({ sectionIndex, length }) => {
    let progress = (sectionIndex + 1) / length * 100;
    return (
        <div className="mmm-t ">
            {/* Progress bar will be displayed here.. */}
            <div className="relative ">
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-yellow-200">
                    <div style={{ width: `${progress}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gray-800"></div>
                </div>
            </div>
            {/* <div className="bg-red-200 relative top-2 -left-1 rounded-full w-14 h-14 flex items-center justify-center">
                {avatar}
            </div> */}
        </div>
    )
}
export default FormHeader;