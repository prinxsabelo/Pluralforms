
import DeleteModal from "../../../shared/collection/DeleteModal";
import SumChildReport from "./SumChildReport";

const SumReport = (props) => {
  const { report } = props;
  return (
    <>
      <div className="md:px-8 md:py-4 p-2">
        <div className="md:p-0 pt-2">
          <h3 className="md:text-2xl text-2xl">Response Summary</h3>
        
        </div>
        {report.length > 0 && (
          <div className="flex flex-col space-y-6 mb-4">
            {report.map((rep, index) => (
              <SumChildReport
                index={index + 1}
                key={index}
                title={rep.title}
                type={rep.type}
                content={rep.content}
                summary={rep.summary}
              />
            ))}
          </div>
        )}
      </div>
      <DeleteModal onDelete={() => alert('xx11x')} />
    </>
  );
};
export default SumReport;
