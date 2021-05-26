import { useContext } from "react";
import Cookies from "js-cookie";
import AuthContext from "../../shared/context/auth-context";

export const User = () => {
    const Auth = useContext(AuthContext);
    const handleLogout = () => {
        Auth.setId(null);
        Auth.setEmail(null);
        Auth.setToken(null);
        Cookies.remove("userData");

    };
    return (
        <div>
            <h1> User PAGE </h1>
            <button className="bg-red-400 p-3" onClick={handleLogout}>LogOut</button>
        </div>
    )
}