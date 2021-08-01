const Welcome = ({ startForm, beginMessage }) => {

    return <div className="h-screen w-screen flex items-center justify-center">
        <div className="flex flex-col space-y-8 p-4 w-full md:w-1/2 break-words  items-center">
            <div className="flex-auto flex-col w-full space-y-4 mx-2 items-center justify-center ">
                <h3 className="text-5xl text-center tracking-wide">
                    {beginMessage.begin_header}
                </h3>
                <div className="tracking-wider text-center text-lg">
                    {beginMessage.begin_desc}
                </div>
            </div>
            <button className="p-3 text-xl font-bold w-52  text-gray-100 bg-yellow-600 tracking-wider
                    hover:bg-yellow-700 rounded-lg" onClick={startForm}>
                START FORM
            </button>
        </div>

    </div>
}
export default Welcome