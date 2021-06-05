import { useMemo } from "react";
import { debounce } from 'lodash'
import { useHttpClient } from "./http-hook";

const useDebounceForQuestionUpdate = () => {
    const { sendRequest, isLoading } = useHttpClient();
    const updateQuestion = (_val) => {
        debouncedQuestion(_val);
    };

    // useMemo is used here to store a memoized value that should only be recalculated when the dependencies change
    // since useCallback is specifically designed for inline functions
    const debouncedQuestion = useMemo(
        () =>
            //finally sending data to db here..
            debounce(async (qn) => {
                try {
                    console.log("updating question here..");
                    console.log(qn);
                    const response = await sendRequest(`http://localhost:8000/api/user/form/build/update`, 'PUT', JSON.stringify(qn));
                    if (response) {
                        console.log(response, isLoading);
                    }

                } catch { }

            }, 1000),
        [sendRequest, isLoading]
    );



    return [updateQuestion];
};
export default useDebounceForQuestionUpdate