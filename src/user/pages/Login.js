import { useEffect } from "react/cjs/react.development";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useState, useContext } from "react";
import AuthContext from "../../shared/contexts/auth.context";

const Login = () => {
    const { isLoading, sendRequest } = useHttpClient();
    const [googleUrl, setGoogleUrl] = useState("");
    const [facebookUrl, setFacebookUrl] = useState("");
    const Auth = useContext(AuthContext);
    console.log(Auth);

    useEffect(() => {
        if (!Auth.token) {
            const fetchForGoogle = async () => {
                const googleUrl = await sendRequest(
                    'http://localhost:8000/api/login/google',
                );
                if (googleUrl) {
                    const { url } = googleUrl;
                    setGoogleUrl(url);
                }

            }
            const fetchForFacebook = async () => {
                const facebookUrl = await sendRequest(
                    'http://localhost:8000/api/login/facebook',
                )
                if (facebookUrl) {
                    console.log(facebookUrl);
                    const { url } = facebookUrl;
                    setFacebookUrl(url);
                }

            }
            fetchForGoogle();
            fetchForFacebook();
        }

    }, [sendRequest, Auth.token]);
    return (
        <div className="flex w-full justify-center md:mt-8">

            <div className="w-full md:w-1/3  flex flex-col p-4">
                <div className="flex justify-center text-2xl pb-2">
                    PLURALFORMS {isLoading && <span></span>}
                </div>
                <div className="flex flex-col justify-center space-y-2  border-t-4 py-2 md:py-4">
                    <div className="flex flex-col w-full space-y-4 ">
                        {googleUrl && (
                            <a className="border-2 shadow-md p-4" href={googleUrl} >
                                Continue with Google
                            </a>
                        )}
                        {facebookUrl && (
                            <a className="border-2 shadow-md p-4" href={facebookUrl} >
                                Continue with Facebook
                            </a>
                        )}

                    </div>

                </div>
            </div>
        </div>
    )
}
export default Login;