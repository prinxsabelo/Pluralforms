import QTypeIcon from "../../../shared/collection/QTypeIcon";

import DoughnutChart from "./chart/DoughnutChart";
import TextReport from "./TextReport";

const SumChildReport = (props) => {
    const { title, type, index, content, data, shape, summary, allow_multiple_selection } = props;
    return (
        <>
            <div className="shadow-lg border-2 bg-white  mt-4 w-full">
                <div className="flex items-center shadow w-full truncate space-x-3 md:space-x-6 ">
                    <div className="flex items-center justify-center  p-3 w-18 space-x-2 md:space-x-3 bg-yellow-600 text-white">

                        <QTypeIcon color="" type={type} shape={shape} className="w-5 h-5 text-gray-100" />

                        <span> {index}</span>
                    </div>
                    <div className="flex-auto truncate">
                        <div className=" text-xl w-10/12 md:w-11/12 font-semibold tracking-wider truncate">
                            {title}
                        </div>
                        {
                            summary && !allow_multiple_selection &&
                            <div className="text-xs font-medium tracking-widest">{summary.submitted} out of {summary.total} people answered this question</div>

                        }
                        {
                            summary && allow_multiple_selection &&
                            <div className="text-xs font-medium tracking-wider">*multiple choice</div>
                        }

                    </div>
                </div>
                {type !== "TEXT" &&
                    <>

                        {content && content.length > 0 ?
                            <div className="flex flex-col md:flex-row mx-2 md:mx-16 space-x-2 items-center" >
                                <div className="w-full md:w-1/2 md:py-6 justify-left justify-start">
                                    <DoughnutChart content={content} />
                                </div>
                                <div className=" w-full h-full md:w-1/2 border-gray-200 flex flex-auto flex-col 
                                 font-medium  tracking-wider text-xs border">

                                    <div className="flex flex-col  pb-2">
                                        {content.map((con, index) =>
                                            <div key={index} className="w-full flex h-full items-center border-b  font-medium tracking-widest">
                                                <div className="h-full w-2/3 flex items-center ">
                                                    <div className={` w-2 h-8 ${`index${index}`} mr-2`} ></div>
                                                    <div>
                                                        {type === "RATING" ?
                                                            <div >{con.label} Rating</div>
                                                            :
                                                            <div>
                                                                {con.label &&
                                                                    <>
                                                                        {con.label = con.label.strlen > 20 ? <> {con.label.substring(0, 15) + '..'} </> : con.label}

                                                                    </>
                                                                }
                                                            </div>
                                                        }
                                                    </div>
                                                </div>
                                                <div className="w-1/3  h-full flex items-center">{con.percentage}%</div>
                                                <div className="flex-auto h-full flex items-center pr-2">{con.value} <span className="ml-1"> responses </span> </div>



                                            </div>
                                        )}
                                    </div>

                                </div>

                            </div>
                            :
                            <div className="p-2 tracking-wider">
                                No response found for question..
                            </div>
                        }

                    </>
                }
                {type === "TEXT" &&
                    <>
                        {data && data.length > 0
                            ?
                            <TextReport data={data} /> :
                            <div className="p-2 tracking-wider">
                                No response found for question..
                            </div>
                        }
                    </>

                }
            </div>
        </>
    )
}
export default SumChildReport