import React, { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Redirect, useLocation, useHistory } from "react-router-dom";
import AuthApi from "../../shared/context/AuthApi";
import { useHttpClient } from "../../shared/hooks/http-hook";

const ConfirmAuth = () => {
    const { isLoading, error, sendRequest } = useHttpClient();

    const location = useLocation();
    const Auth = useContext(AuthApi);
    const [user, setUser] = useState();
    console.log(location);
    let history = useHistory();
    useEffect(() => {
        init();
    }, []);
    const init = async () => {
        try {
            const response = await sendRequest(`http://localhost:8000/api/auth/google/callback${location.search}`);
            if (response.ok) {
                Cookies.set("token", response.token);
                Auth.setAuth(true);
                history.push("/user");
            }

        } catch { }
    }

    if (isLoading) {
        return <div>Loading....</div>;
    }

    if (error) {
        return (<Redirect to="/login" />);
    }
    return (
        <>
            <div>
                <details>
                    {/* <summary>Welcome {data.user.name}</summary> */}
                    {/* Login for google first here.. */}
                    <p>Here is your info: </p>
                    <code className="Code-block">
                        {JSON.stringify(user, null, 2)}
                    </code>
                </details>
            </div>
        </>
    );
};
export default ConfirmAuth;
