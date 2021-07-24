// import { useContext } from "react";
// import { FormContext } from "../contexts/form.context";
import { NavLink } from 'react-router-dom'
import { useHttpClient } from '../hooks/http-hook';
import { useContext } from "react";
import AuthContext from '../contexts/auth.context';
import Cookies from "js-cookie";


const CustomHeader = () => {
    const { sendRequest } = useHttpClient();
    const Auth = useContext(AuthContext);
    const logOut = async () => {
        await sendRequest(`http://localhost:8000/api/logout`);

        Cookies.remove("userData");
        Auth.setUser(null);
        Auth.setToken(null);

    }
    // const { addForm } = useContext(FormContext);
    return (

        <>
            <div className="md:hidden flex bg-yellow-500 space-x-2 flex-row justify-between items-center px-2 py-1 md:p-8 border-b">
                <div className="w-1/2">
                    <h3 className="text-xl uppercase tracking-wider">PluralForms</h3>
                </div>
                {Auth && Auth.user &&
                    <div className=" w-1/2 flex items-center justify-end">
                        <div className="flex w-full truncate justify-end space-x-1 items-center">
                            <img alt="a" className=" object-contain w-8 h-8 rounded-full" src={Auth.user.avatar} />
                            <div className="w-1/2 truncate">
                                {Auth.user.name}
                            </div>
                        </div>
                        <button onClick={logOut} className="bg-red-600 px-2 py-1">
                            LogOut
                        </button>
                    </div>
                }


                {/* <button className="px-2 py-1 bg-gray-900 text-white text-base tracking-wider rounded"
                    onClick={() => addForm()}>Create Form</button> */}
            </div>
            <div className="flex p-2 justify-between items-center w-full ">
                {/* <div className="relative text-gray-400 w-1/2  md:ml-16 hidden md:flex">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-6 h-6">
                            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z">
                            </path>
                        </svg>
                    </span>
                    <input type="search" name="q" className="border-2 py-2 text-sm text-black bg-gray-100 w-full rounded-md pl-10 focus:outline-none focus:bg-white focus:text-gray-900"
                        placeholder="Search..." autoComplete="off" />
                </div> */}
                <div className="flex w-full items-center justify-center space-x-4 tracking-wider text-sm md:text-normal md:mr-16">
                    <span className="text-base text-lg">Form Status:</span>
                    <div className="flex items-center space-x-4 md:space-x-2">
                        <NavLink className="text-lg px-2 py-1" activeClassName="bg-yellow-400"
                            to="/user/forms">Active </NavLink>
                        <NavLink className="text-lg px-2 py-1" activeClassName="bg-yellow-400"
                            to="/user/closed_forms">Closed </NavLink>
                    </div>
                    {/* <NavLink className="text-xs md:text-lg" activeClassName="p-1 text-black font-black rounded text-xs md:text-lg mx-1"
                        to="/user/forms">Active </NavLink>
                    <NavLink className="text-xs md:text-base" activeClassName="p-1 text-black font-black rounded  text-xs md:text-lg mx-1"
                        to="/user/closed_forms">Closed </NavLink> */}

                </div>

            </div>

        </>

    )
}
export default CustomHeader;