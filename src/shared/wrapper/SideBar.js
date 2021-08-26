import { useContext } from 'react';
import Button from '../collection/Button';
import UserProfileLink from "../collection/UserProfileLink";
import AuthContext from '../contexts/auth.context';
import { Context } from '../contexts/context';
import { FormContext } from '../contexts/form.context';
import SideBarItem from "./SideBarItem";
import logo from './plural.png';

const SideBar = () => {
    const Auth = useContext(AuthContext);
    // console.log(Auth);
    const { addForm } = useContext(FormContext);
    const { sideBarItems } = useContext(Context);



    return <div className=" bg-white text-gray-800 w-56 justify-center hidden md:flex ">
        <div className="flex flex-col justify-between p-4">
            <div className="flex flex-col space-y-6">
                <div className="text-2xl tracking-wide z-50 flex">
                    <img className="w-8 h-8" src={logo} alt="P" />
                    <div>
                        PluralForms
                    </div>

                </div>
                <div className="w-full">
                    <Button className="bg-gray-900 uppercase w-full md:text-base" onClick={() => addForm()}>Create Form</Button>
                </div>
                {/* We love You.. */}
                <div className="flex flex-col w-full py-3 space-y-3">
                    {sideBarItems.map((item, index) =>
                        <SideBarItem item={item} key={index} />
                    )}
                </div>

            </div>
            {Auth.user &&
                <UserProfileLink />
            }


        </div>
    </div>
}
export default SideBar;