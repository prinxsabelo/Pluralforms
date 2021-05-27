import { useContext } from "react";
import Button from "../collection/Button";
import AuthContext from "../context/auth-context";
import { FormContext } from "../context/form-context";
import Cookies from "js-cookie";


const HeaderRight = () => {
    const Auth = useContext(AuthContext);
    const handleLogout = () => {
        Auth.setId(null);
        Auth.setEmail(null);
        Auth.setToken(null);
        Cookies.remove("userData");

    };
    const { addForm } = useContext(FormContext);
    return <div className="hidden md:flex space-x-4 justify-center items-center">
        <Button className="bg-gray-900 m-1 uppercase" onClick={() => addForm()}>Create Form</Button>


        <button className="flex bg-white text-white p-1 " aria-haspopup="true" aria-expanded="true">
            <div className="bg-gray-200 rounded-full w-7 h-7 flex justify-center items-center">BS</div>
            <svg className="pt-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
        </button>
        <button className="bg-gray-200 p-2" onClick={handleLogout}>LogOut</button>
    </div>
}
export default HeaderRight;