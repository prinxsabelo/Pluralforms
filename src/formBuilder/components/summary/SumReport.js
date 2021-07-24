import SumChildReport from "./SumChildReport";
import { ReactComponent as Empty } from '../../../assets/empty.svg';

const SumReport = (props) => {
    const { report } = props;

    return (
        <>
            <div className="md:px-8 h-full md:py-4 p-2">
                <div className="md:p-0 pt-2">
                    <h3 className="md:text-2xl text-2xl">Response Summary</h3>

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
                            />
                        ))}
                    </div>
                ) :
                    <div className="w-11/12 h-4/6 space-y-4 flex flex-col mt-8 justify-center items-center">
                        <div className="flex items-center w-11/12  h-4/6">
                            <Empty className="w-full  h-full" />

                        </div>
                        <div className="flex flex-col space-y-2 items-center ">
                            <div className="text-lg font-medium">No Summary found for now..</div>
                            <div>Let people fill your form first </div>
                        </div>
                    </div>

                }
            </div>
        </>
    )

}
export default SumReport;