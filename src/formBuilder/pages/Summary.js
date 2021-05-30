import { useContext, useEffect } from "react";
import { useParams } from "react-router";
import { ResultContext } from "../../shared/contexts/result-context";

import { ViewportContext } from "../../shared/contexts/viewport-context";

import SumDetail from "../components/summary/SumDetail";
import SumReport from "../components/summary/SumReport";

const Summary = (props) => {
  const breakpoint = 768;
  const { width } = useContext(ViewportContext);
  let { form_id } = useParams();
  const { getReport, report } = useContext(ResultContext);
  useEffect(() => {
    getReport(form_id);
  }, [getReport, form_id]);
  console.log(report);
  return (
    <>
      {width > breakpoint && (
        <div className="w-full h-full hidden md:flex h-summary space-x-2 px-16">
          <div className="w-1/4 border-r-2 shadow-lg">
            <SumDetail />
          </div>
          <div className="overflow-y-auto flex-auto">
            <SumReport report={report} />
          </div>
        </div>
      )}
      {width <= breakpoint && (
        <div className="md:hidden flex flex-col">
          <SumDetail />
          <SumReport report={report} />
        </div>
      )}
    </>
  );
};
export default Summary;
