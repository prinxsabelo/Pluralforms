import { useEffect } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useState, useContext } from "react";
import AuthContext from "../../shared/contexts/auth.context";
// import InnerLoader from "../../shared/collection/InnerLoader";
import LoadingSpinner from "../../shared/collection/LoadingSpinner.";

const Login = () => {
    const { isLoading, sendRequest } = useHttpClient();
    const [googleUrl, setGoogleUrl] = useState("");
    // const [facebookUrl, setFacebookUrl] = useState("");
    const Auth = useContext(AuthContext);

    const [loader, setLoader] = useState(true);
    useEffect(() => {
        if (!Auth.token) {
            const fetchForGoogle = async () => {
                const googleUrl = await sendRequest(
                    'https://pluralforms.com/pluralforms-api/public/api/login/google',
                );
                if (googleUrl) {
                    // console.log(googleUrl);
                    const { url } = googleUrl;
                    setGoogleUrl(url);
                }

            }
            // const fetchForFacebook = async () => {
            //     const facebookUrl = await sendRequest(
            //         'https://pluralforms.com/pluralforms-api/public/api/login/facebook',
            //     )
            //     if (facebookUrl) {
            //         // console.log(facebookUrl);
            //         const { url } = facebookUrl;
            //         setFacebookUrl(url);
            //     }

            // }
            fetchForGoogle();
            // fetchForFacebook();
        }

    }, [sendRequest, Auth.token]);
    if (!isLoading) {
        setTimeout(() => {
            setLoader(false)
        }, 1000)
    }
    return (
        <div className="flex w-full justify-center md:mt-8">

            <div className="w-full md:w-1/3  flex flex-col p-4 m-1 shadow">
                <div className="flex flex-col">
                    <div className="flex justify-center text-2xl pb-2">
                        PLURALFORMS
                    </div>
                    <div className="w-full text-sm items-center flex justify-center items-center">Let's build forms.</div>
                </div>

                {loader ?
                    <div className="flex h-screen ">
                        <LoadingSpinner />
                    </div> :
                    <div className="flex flex-col justify-center space-y-2  border-t-4 py-2 md:py-4">
                        <div className="flex flex-col w-full space-y-4 tracking-wider">
                            {googleUrl && (

                                <a className="border-2 shadow-md p-4 font-semibold" href={googleUrl} >
                                    Continue with Google
                                </a>
                            )}
                            {/* {facebookUrl && (
                                <a className="border-2 shadow-md p-4 font-semibold" href={facebookUrl} >
                                    Continue with Facebook
                                </a>
                            )} */}

                        </div>

                    </div>
                }

            </div>
        </div>
    )
}
export default Login;

