import { NavLink, useHistory } from "react-router-dom";
import AuthFormHook from "../../shared/hooks/auth-form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Cookies from 'js-cookie';
import AuthContext from "../../shared/context/auth-context";
import { useContext } from "react";
import AuthComponent from "../components/Auth.component";
const Signup = () => {
    const history = useHistory();
    const { inputs, handleInputChange } = AuthFormHook();
    const { isLoading, sendRequest } = useHttpClient();
    const Auth = useContext(AuthContext);
    const handleSignup = async (e) => {
        e.preventDefault();
        console.log(inputs);
        const { email, name, password } = inputs;
        try {
            const response = await sendRequest('http://localhost:8000/api/signup', 'POST', JSON.stringify({ email, name, password }));
            if (response.ok) {
                const { id, email } = response.user;
                const { token } = response;
                Cookies.set("userData", JSON.stringify({ id, token, email }));
                Auth.setToken(token);
                Auth.setEmail(email);

                history.push("/user");
            }

        } catch { }
    }

    return (
        <AuthComponent>
            {isLoading && <div>Loading..</div>}
            <form className="flex flex-col w-full space-y-3" onSubmit={handleSignup}>
                <div className="flex flex-col space-y-1">
                    <label className="font-medium tracking-wider">
                        What should we call you?
                    </label>
                    <input placeholder="Enter your name"
                        className="p-2 md:p-3 border-2 border-gray-500 rounded"
                        name="name"
                        required
                        value={inputs.name}
                        onChange={handleInputChange}
                        type="text"
                    />
                </div>
                <div className="flex flex-col space-y-1">
                    <label className="font-medium tracking-wider">
                        Let us know your email
                    </label>
                    <input placeholder="Enter your email"
                        className="p-2 md:p-3  border-2 border-gray-500 rounded"
                        name="email"
                        required
                        value={inputs.email}
                        onChange={handleInputChange}
                        type="email"
                    />
                </div>
                <div className="flex flex-col space-y-1">
                    <label className="font-medium tracking-wider">
                        Create a password
                    </label>
                    <input placeholder="Enter your password"
                        className="p-2 md:p-3  border-2 border-gray-500 rounded"
                        name="password"
                        required
                        value={inputs.password}
                        onChange={handleInputChange}
                        type="password"
                    />
                </div>
                <div className="flex flex-col ">
                    <button className="bg-yellow-600 text-white px-4 py-3 rounded font-medium w-full  uppercase">Sign up</button>
                    <div className="flex space-x-2 mt-1 text-lg  font-bold">
                        <span>Have an account already?</span>
                        <NavLink className="text-red-400 font-bold underline" to="/login">Login</NavLink>
                    </div>
                </div>
            </form>
        </AuthComponent>
    )
}
export default Signup;