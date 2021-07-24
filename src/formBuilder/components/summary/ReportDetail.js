const ReportDetail = (props) => {
    const { content, type } = props;
    
    return (
        <>
            {content && content.length > 0 &&

                <div className="border-l-2 w-full md:w-1/2 border-gray-200 flex flex-auto flex-col p-2 ">
                    <div className="flex-none flex font-extrabold text-sm md:text-md tracking-wider md:py-2 ">
                        <div className="w-1/2 truncate ">Answer</div>
                        <div className="w-1/3 ">Response</div>
                        <div className="flex-auto">Percent</div>
                    </div>
                    <div className="flex flex-col space-y-2 md:space-y-4   text-xs md:text-sm">
                        {content.map((con, index) =>
                            <div className="w-auto flex-none flex h-full whitespace-nowrap flex-wrap border-t pt-2 justify-center items-center" key={index}>
                                {type === "RATING" ?
                                    <div className="w-1/2 ">{con.label} Rating</div>
                                    :
                                    <div className="w-1/2 truncate  whitespace-nowrap flex-wrap">
                                        {con.label &&
                                            <>
                                                {con.label = con.label.strlen > 20 ? <> {con.label.substring(0, 15) + '..'} </> : con.label}

                                            </>
                                        }
                                    </div>
                                }

                                <div className="w-1/3">{con.value} <span>Response </span> </div>
                                <div className="flex-auto">{con.percentage}%</div>
                            </div>
                        )}

                    </div>

                </div>

            }

        </>
    )
}
export default ReportDetail