import React, { useCallback, useContext, useEffect } from "react";
import cookie from "js-cookie";
import {
    useLocation,
} from "react-router-dom";
import AuthContext from "../../shared/contexts/auth.context";

import { useHttpClient } from "../../shared/hooks/http-hook";

const ConfirmLogin = () => {
    const { sendRequest } = useHttpClient();

    const location = useLocation();
    const Auth = useContext(AuthContext);


    const fetchApi = useCallback(async () => {
        const userData = cookie.get("userData");
        if (!userData && !Auth.authProceed) {
            // if (!Auth.email && !Auth.token) {
            let response;
            if (window.location.pathname.search("google") !== -1) {
                response = await sendRequest(`http://localhost:8000/api/login/google/callback${location.search}`);
            } else {
                response = await sendRequest(`http://localhost:8000/api/login/facebook/callback${location.search}`);
            }
            if (response) {
                const { id, email, name, avatar } = response.user;
                const { token } = response;
                let user = { email, name, avatar };

                cookie.set("userData", JSON.stringify({ id, token, user }));
                // window.location.href = "https://pluralforms.com/user/forms";
                window.location.href = "http://localhost:3000/user/forms";

            }



        }
    }, [Auth, location.search, sendRequest]);

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
export default ConfirmLogin;



