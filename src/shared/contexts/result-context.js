import { createContext, useState } from "react";
import ResponseApi from "../api/response-api";
import ReportApi from "./../api/report-api";

export const ResultContext = createContext();

const ResultContextProvider = (props) => {
    const [report, setReport] = useState([]);
    const [formResponses, setFormReponses] = useState([]);

    const getReport = (form_id) => {
        console.log(form_id);
        const fetchReport = async () => {
            try {
                const data = await ReportApi;

                setReport(data.boxes);
            } catch (err) { }
        };
        fetchReport();
    };

    const getFormResponses = (form_id) => {
        console.log(form_id);
        const fetchFormResponses = async () => {
            try {
                const data = await ResponseApi;
                setFormReponses(data.form);
            } catch (err) { }
        };
        fetchFormResponses();
    };
    const deleteFormResponses = (arr) => {
        console.log(arr);
        // console.log(arr,formResponses);
        // const respondents = formResponses.respondents.filter(({token}) => !arr.includes(token));
        // console.log(respondents);
        // setFormReponses({ ...formResponses, respondents });
    };

    return (
        <ResultContext.Provider
            value={{
                getReport,
                report,
                getFormResponses,
                formResponses,
                deleteFormResponses,
            }}
        >
            {props.children}
        </ResultContext.Provider>
    );
};
export default ResultContextProvider;
