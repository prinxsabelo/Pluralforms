import { useContext, useEffect } from "react";

import { useState } from "react";
import LoadingSpinner from "../../shared/collection/LoadingSpinner.";

import { ViewportContext } from "../../shared/contexts/viewport-context";
import { useHttpClient } from "../../shared/hooks/http-hook";

import SumDetail from "../components/summary/SumDetail";
import SumReport from "../components/summary/SumReport";

const Summary = (props) => {
    const breakpoint = 768;
    const { width } = useContext(ViewportContext);
    const { sendRequest, isLoading } = useHttpClient();
    const [loadReport, setLoadReport] = useState(false);
    const [report, setReport] = useState();
    const [sum, setSum] = useState();
    useEffect(() => {
        const ac = new AbortController();
        let form_id = window.location.pathname.match(/\d+/)[0];

        const fetchReport = async () => {
            try {
                const data = await sendRequest(`http://localhost:8000/api/user/forms/report`, 'POST', JSON.stringify({ form_id }));
                if (data) {
                    setReport(data.boxes);
                    setSum(data.summary)
                };
                setLoadReport(true);

            } catch {
                setLoadReport(true);
            }

        }
        if (form_id && !loadReport) {
            fetchReport()
        }

        return () => ac.abort(); // Abort both fetches on unmount

    }, [loadReport, sendRequest]);



    return (
        <>
            {isLoading && <div className="h-screen"><LoadingSpinner /></div>}
            {!isLoading && report &&
                <>
                    {width > breakpoint && (
                        <div className="w-full h-full hidden md:flex h-summary space-x-2">
                            <div className="w-1/6 border-r-2 shadow-lg">
                                <SumDetail sum={sum} />
                            </div>
                            <div className="overflow-y-auto flex-auto">
                                <SumReport report={report} />
                            </div>
                        </div>
                    )}
                    {width <= breakpoint && (
                        <div className="md:hidden flex flex-col">
                            <SumDetail sum={sum} />
                            <SumReport report={report} />
                        </div>
                    )}
                </>
            }


        </>
    );
};
export default Summary;
