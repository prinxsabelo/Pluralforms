import { useContext } from 'react';
import { Context } from '../context/context';

import SideBarItem from "./SideBarItem";


const SideBar = () => {
    const { sideBarItems } = useContext(Context);

    return <div className=" bg-white text-gray-800 w-36 justify-center hidden md:flex
                 ">
        <div className="flex flex-col space-y-4">
            {sideBarItems.map((item, index) =>
                <SideBarItem item={item} key={index} />
            )}
        </div>
    </div>
}
export default SideBar;