import SumChildReport from "./SumChildReport";
import { ReactComponent as Empty } from '../../../assets/empty.svg';

const SumReport = (props) => {
    const { report } = props;

    return (
        <>
            <div className="md:px-8 h-full md:py-4 p-2">
                <div className="md:p-0 pt-2">
                    <h3 className="text-lg md:text-2xl pt-1 md:pt-3">Response Summary</h3>

                </div>
                {report && report.length > 0 ? (
                    <div className="flex flex-col space-y-6 mb-4 ">
                        {report.map((rep, index) => (
                            <SumChildReport

                                index={index + 1}
                                key={index}
                                title={rep.title}
                                type={rep.type}
                                data={rep.data}
                                shape={rep.shape}
                                content={rep.content}
                                summary={rep.summary}
                                allow_multiple_selection={rep.allow_multiple_selection}
                            />
                        ))}
                    </div>
                ) :
                    <div className="w-full h-4/6 space-y-4 flex flex-col mt-8 justify-center items-center">
                        <div className="flex items-center w-full  h-4/6">
                            <Empty className="w-full  h-full" />

                        </div>
                        <div className="flex flex-col space-y-2 items-center  tracking-wider">
                            <div className="text-lg font-medium ">No Summary found for now..</div>
                            <div className="tracking-widest">Let people fill your form first </div>
                        </div>
                    </div>

                }
            </div>
        </>
    )

}
export default SumReport;