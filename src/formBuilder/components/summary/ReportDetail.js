const ReportDetail = (props) => {
    const { content, type } = props;
    return (
        <div className="flex flex-auto flex-col space-y-1 my-2 text-sm px-3">
            <div className="flex-none flex font-extrabold">
                <div className="w-1/2 ">Answer Choice</div>
                <div className="w-1/4 ">Response</div>
                <div className="flex-auto ">Percent</div>
            </div>
            {content.map((con, index) =>
                <div className="flex-none flex" key={index}>
                    {type === "RATING" ?
                        <div className="w-1/2 ">{con.label} Rating</div>
                        :
                        <div className="w-1/2 ">{con.label}</div>
                    }

                    <div className="w-1/4">{con.value} Resp..</div>
                    <div className="w-1/4">{con.percentage}%</div>
                </div>
            )}

        </div>
    )
}
export default ReportDetail