import QTypeIcon from "../../../shared/collection/QTypeIcon";
import HorizontalChart from "./chart/HorizontalChart";
import VerticalChart from "./chart/VerticalChart";
import ReportDetail from "./ReportDetail";

const SumChildReport = (props) => {
    const { title, type, summary, index, content } = props;
    // console.log(summary);
    return (
        <>
            <div className="hidden md:block shadow border  mt-4">
                <div className="flex items-center shadow w-full space-x-6 ">
                    <div className="flex items-center justify-center bg-gray-100 p-3 w-18 space-x-3">
                        <QTypeIcon color="red" type={type} shape={summary.shape} className="w-8 text-gray-100" />
                        <span> {index}</span>
                    </div>
                    <div>
                        <div className=" text-xl font-semibold">{title}</div>
                        <div className="text-xs">2 out of 5 people answered this question</div>

                    </div>
                </div>

                <div className="flex mx-4 space-x-2 items-center">
                    <div className="w-7/12 p-2">
                        {type !== 'RATING'
                            ? <HorizontalChart content={content} />
                            : <VerticalChart content={content} />
                        }


                    </div>
                    <ReportDetail content={content} type={type} />



                </div>

            </div>
            <div className="md:hidden flex flex-col shadow border-2">
                <div className="flex items-center shadow w-full space-x-2  py-2">
                    <QTypeIcon color="red" type={type} shape={summary.shape} className="w-8 text-gray-100" />
                    <div>
                        <div className=" text-lg">{title}</div>
                        <div className="text-xs">2 out of 5 people answered this question</div>

                    </div>
                </div>
                <div className="flex flex-col">
                    {type !== 'RATING'
                        ? <HorizontalChart content={content} />
                        : <VerticalChart content={content} />
                    }
                </div>
                <ReportDetail content={content} type={type} />
            </div>
        </>
    )
}
export default SumChildReport