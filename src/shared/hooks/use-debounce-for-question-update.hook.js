import { useMemo, useContext } from "react";
import { debounce } from 'lodash'
import { useHttpClient } from "./http-hook";
import { ViewportContext } from "../contexts/viewport-context";


const useDebounceForQuestionUpdate = () => {

    const breakpoint = 768;
    const { sendRequest, isLoading } = useHttpClient();
    const { width } = useContext(ViewportContext);
    const updateQuestion = (_val) => {
        debouncedQuestion(_val);
        // console.log(debouncedQuestion(_val))
    };

    const timer = 1000

    // useMemo is used here to store a memoized value that should only be recalculated when the dependencies change
    // since useCallback is specifically designed for inline functions
    const debouncedQuestion = useMemo(
        () =>

            //finally sending data to db here..
            debounce(async (qn) => {
                try {
                    // console.log("updating question here..");

                    const response = await sendRequest(`http://localhost:8000/api/user/form/build/update`, 'PUT', JSON.stringify(qn));
                    if (response) {

                        // console.log(response);

                        //Fire refresh form if mobile and refresh form..
                        if (width < breakpoint) {
                            document.getElementById("refreshForm").click();
                        }

                    }

                } catch { }

            }, timer), [sendRequest, width, timer]
    );



    return [updateQuestion, isLoading];
};
export default useDebounceForQuestionUpdate