import { useEffect, useState, useRef, useCallback } from "react";
import { useContext } from "react";
import jwt from 'jsonwebtoken';

import axios from "axios";
import AuthContext from "../contexts/auth.context";
import { toast, Zoom } from 'react-toastify';

import cookie from 'js-cookie';
import { useHistory } from "react-router-dom";


//PICKING JWT FROM API FROM .env IN BACKEND...

export const useHttpClient = () => {
    const jwt_token = "KVCQFJI7zBWSq8TDIpUD5wzHLkSAJnK0X496Y8aKoCff0Wgemf6eqxpNWb5xY8bO";
    const Auth = useContext(AuthContext);
    const history = useHistory();
    if (Auth.token) {
        const token = Auth.token;
        jwt.verify(token, jwt_token, function (err, decoded) {

            if (err) {
                console.log(err);
                // cookie.remove("userData");
                // alert('Unauthenicated1..');
                console.log('removed..');
            } else {

                if (decoded.iss !== "http://localhost:8000/api/login/google/callback" &&
                    decoded.iss !== "http://localhost:8000/api/login/facebook/callback") {
                    cookie.remove("userData");
                    alert('Unauthenicated2..');
                }
            }

            // console.log(decoded);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        })
    }
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();
    const activeHttpRequests = useRef([]);
    const notifyError = (message) => {
        toast.configure();
        const notify = () => toast.error(message, {
            transition: Zoom,
            position: "top-center",
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: 0,

        })
        notify();
    }

    const sendRequest = useCallback(

        async (url, method = 'GET', data = null, headers = { 'Content-Type': 'application/json' }) => {
            setIsLoading(true);

            const httpAbortCtrl = new AbortController();
            activeHttpRequests.current.push(httpAbortCtrl);
            // console.log(data);
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
                if (!response) {
                    throw new Error(responseData.message);
                }
                if (window.location.pathname.search("login") === -1) {
                    if (window.location.pathname.search("build") !== -1) {
                        // console.log('xxx');
                        setTimeout(() => {
                            setIsLoading(false);
                        }, 500)
                    } else {
                        setTimeout(() => {
                            setIsLoading(false);
                        }, 1000)
                    }

                } else {
                    setIsLoading(false);
                }
                // console.log('good');
                // console.log(isLoading);
                return responseData;

            } catch (error) {
                // console.log('mmm');
                // console.log(window.location.pathname)
                // if (window.location.pathname.search("user") !== -1) {
                //     cookie.remove("userData");
                //     history.push('/login');
                // }
                if (error.response) {
                    if (error.response.data.message === "Token not provided") {
                        cookie.remove("userData");
                        history.push('/login');
                    } else {
                        notifyError(error.response.data.message)
                    }
                    console.log(error);
                    console.log(error.response.data.message);
                } else {
                    notifyError('error occured.. check your network.')
                    setIsLoading(false);
                    if (error.response) {
                        notifyError('an error occured.. for status' + error.response.status);
                        setError(error);
                    }

                }

                // throw new Error("xxx");
                // if (error.response) {
                //     const { message } = error.response.data;
                //     console.log(error.response.status);
                //     notifyError(message)

                //     // alert(message);
                //     // alert(error.response.status);
                //     setError(error.response.data);


                //     // client received an error response (5xx, 4xx)
                // } else if (error.request) {
                //     console.log(error.request.status)
                //     if (!error.status) {
                //         notifyError('connection error');
                //         console.log('network error dey..', JSON.stringify(error));
                //     }
                //     console.log('no message recieved..')
                //     // client never received a response, or request never left
                // } else {
                //     console.log('..');
                //     // anything else
                // }


            }
        }, [history]);
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