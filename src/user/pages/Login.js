import { NavLink, useHistory } from "react-router-dom";
import AuthFormHook from "../../shared/hooks/auth-form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";

import Cookies from 'js-cookie';
import { useContext } from "react";
import AuthContext from "../../shared/context/auth-context";
import AuthComponent from "../components/Auth.component";

const Login = () => {
    const history = useHistory();
    const { inputs, handleInputChange } = AuthFormHook();
    const { isLoading, sendRequest } = useHttpClient();
    const Auth = useContext(AuthContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = inputs;
        try {
            const response = await sendRequest('http://localhost:8000/api/login', 'POST', JSON.stringify({ email, password }));
            if (response.ok) {
                const { id, email } = response.user;
                const { token } = response;
                Auth.setToken(token);
                Auth.setEmail(email);
                Cookies.set("userData", JSON.stringify({ id, token, email }));
                history.push("/user");
            }

        } catch { }
    }
    return (
        <AuthComponent>
            {isLoading && <div>Loading..</div>}
            <form className="flex flex-col w-full space-y-3" onSubmit={handleLogin}>

                <div className="flex flex-col space-y-1">
                    <label className="font-medium tracking-wider">
                        Email address
                    </label>
                    <input placeholder="Enter your email"
                        className="p-2 md:p-3  border-2 border-gray-500 rounded"
                        required
                        name="email"
                        value={inputs.email}
                        onChange={handleInputChange}
                        type="email"
                    />
                </div>
                <div className="flex flex-col space-y-1">
                    <label className="font-medium tracking-wider">
                        Password
                    </label>
                    <input placeholder="Enter your password"
                        className="p-2 md:p-3  border-2 border-gray-500 rounded"
                        required
                        name="password"
                        value={inputs.password}
                        onChange={handleInputChange}
                        type="password"
                    />
                </div>
                <div className="flex flex-col ">
                    <button className="bg-yellow-600 text-white px-4 py-3 rounded font-medium w-full uppercase">Log In</button>
                    <div className="flex space-x-2 mt-1 text-lg  font-bold">
                        <span>Don't have an account?</span>
                        <NavLink className="text-red-400 font-bold underline" to="/signup">Sign up</NavLink>
                    </div>
                </div>
            </form>
        </AuthComponent>
    )
}
export default Login;