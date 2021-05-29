import { useEffect, useState, useRef, useCallback } from "react";
import { useContext } from "react/cjs/react.development";
import jwt from 'jsonwebtoken';

import axios from "axios";
import AuthContext from "../context/auth-context";

import cookie from 'js-cookie';
const userData = cookie.get("userData");


//PICKING JWT FROM API FROM .env IN BACKEND...

export const useHttpClient = () => {
    const jwt_token = "KVCQFJI7zBWSq8TDIpUD5wzHLkSAJnK0X496Y8aKoCff0Wgemf6eqxpNWb5xY8bO";
    const Auth = useContext(AuthContext);
    // console.log(Auth);
    if (Auth.token) {
        const token = Auth.token;
        jwt.verify(token, jwt_token, function (err, decoded) {

            if (err) {
                cookie.remove("userData");
                alert('Unauthenicated..');
            } else {

                if (decoded.iss !== "http://localhost:8000/api/login/google/callback"
                    && decoded.iss !== "http://localhost:8000/api/login/facebook/callback") {
                    cookie.remove("userData");
                    alert('Unauthenicated..');
                }
            }

            // console.log(decoded);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        })
    }
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const activeHttpRequests = useRef([]);

    const sendRequest = useCallback(

        async (url, method = 'GET', data = null, headers = { 'Content-Type': 'application/json' }) => {
            setIsLoading(true);

            const httpAbortCtrl = new AbortController();
            activeHttpRequests.current.push(httpAbortCtrl);
            console.log(data);
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
                console.log(responseData);
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