import { useEffect, useState, } from "react";
import Cookies from "js-cookie";

import { useContext } from "react/cjs/react.development";
import AuthContext from "../contexts/auth.context"
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { useHttpClient } from "../hooks/http-hook";


const UserProfileLink = () => {
    const { sendRequest } = useHttpClient();
    const [user, setUser] = useState("");
    const Auth = useContext(AuthContext);

    useEffect(() => {
        const { user } = Auth;
        setUser(user);
        // console.log(user);
    }, [Auth])
    const logOut = async () => {
        await sendRequest(`http://localhost:8000/api/logout`);
        Cookies.remove("userData");
        Auth.setUser(null);
        Auth.setToken(null);

    }
    return (
        <>
            {user &&
                <div className="flex items-center bg-red-100 truncate  w-full  space-x-1  p-1">
                    <NavLink to="/user/profile" className="bg-white w-1/4 flex">
                        <img alt="a" className="w-full object-contain w-14 h-14 " src={user.avatar} />
                    </NavLink>
                    <div className="flex-auto w-9/12 flex flex-col it text-xs font-medium space-y-1 capitalise">
                        <NavLink to="/user/profile" className="text-xs uppercase text-left bg-white p-1 truncate ">
                            {user.name}
                        </NavLink>
                        <button className="float-left text-left w-full p-1 bg-red-400 font-semibold" onClick={logOut}>Log out</button>
                    </div>
                </div>
            }

        </>
    )
}
export default UserProfileLink