const FormHeader = ({ avatar }) => {
    return (
        <div className="mmm-t ">
            {/* Progress bar will be displayed here.. */}
            <div className="w-full h-3 bg-gray-100 fixed top-0 left-0 right-0 text-xs flex items-center">
                ..
            </div>
            <div className="bg-red-200 relative top-2 -left-1 rounded-full w-14 h-14 flex items-center justify-center">
                {avatar}
            </div>
        </div>
    )
}
export default FormHeader;