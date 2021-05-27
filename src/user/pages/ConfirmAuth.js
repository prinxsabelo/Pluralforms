import React, { useCallback, useContext, useEffect } from "react";
import Cookies from "js-cookie";
import { useLocation, useHistory } from "react-router-dom";
import AuthContext from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";

const ConfirmAuth = () => {


    const { sendRequest } = useHttpClient();
    const location = useLocation();
    const Auth = useContext(AuthContext);
    let history = useHistory();
    console.log(Auth);
    const fetchApi = useCallback(async () => {
        const userData = Cookies.get("userData");
        if (!userData && !Auth.authProceed) {
            // if (!Auth.email && !Auth.token) {
            let response;
            if (window.location.pathname.search("google") !== -1) {
                response = await sendRequest(`http://localhost:8000/api/auth/google/callback${location.search}`);
            } else {
                response = await sendRequest(`http://localhost:8000/api/auth/facebook/callback${location.search}`);
            }
            if (response && response.ok) {
                const { id, email } = response.user;
                const { token } = response;
                Cookies.set("userData", JSON.stringify({ id, token, email }));
                Auth.setToken(token);
                Auth.setEmail(email);

                history.push("/user");
            }
        }

        // }
    }, [Auth, history, location.search, sendRequest])
    useEffect(() => {
        fetchApi()
    }, [fetchApi])

    return (
        <>
            <div className="w-full h-screen flex items-center justify-center">
                PLURALFORMS GETTING READY..
            </div>
        </>
    );
};
export default ConfirmAuth;
