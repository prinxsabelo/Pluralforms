import axios from "axios";
import { useEffect, useState, useRef, useCallback } from "react";

export const useHttpClient = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const activeHttpRequests = useRef([]);

    const sendRequest = useCallback(
        async (url, method = 'GET', data = null, headers = { 'Content-Type': 'application/json' }) => {
            setIsLoading(true);
            const httpAbortCtrl = new AbortController();
            activeHttpRequests.current.push(httpAbortCtrl);
            console.log(data);
            console.log(method);
            try {
                let response = await axios({
                    method,
                    url,
                    data,
                    headers,
                    signal: httpAbortCtrl.signal
                });

                const responseData = response.data;
                activeHttpRequests.current = activeHttpRequests.current.filter(
                    reqCtrl => reqCtrl !== httpAbortCtrl
                );
                setIsLoading(false);
                return responseData;

            } catch (error) {
                if (error.response) {
                    const { message } = error.response.data;
                    alert(message);
                    setError(error.response.data);


                    // client received an error response (5xx, 4xx)
                } else if (error.request) {
                    console.log(error.request.status)
                    if (!error.status) {
                        alert('connection error');
                        console.log('network error dey..', JSON.stringify(error));
                    }
                    console.log('no message recieved..')
                    // client never received a response, or request never left
                } else {
                    console.log('..');
                    // anything else
                }
                setIsLoading(false);
            }
        }
        , []);
    const clearError = () => {
        setError(null);
    };

    useEffect(() => {
        return () => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort());
        };
    }, []);
    return { isLoading, error, sendRequest, clearError };

}