import { NavLink } from "react-router-dom";
import {
    HomeIcon, FolderIcon, InformationCircleIcon
} from "@heroicons/react/outline";
const SideBarItem = ({ item }) => {

    return (
        <>
            <NavLink to={item.link} exact activeClassName="text-gray-900 bg-gray-100" className="flex flex-col justify-center items-center px-4 py-2 rounded  hover:bg-gray-200 hover:text-gray-900">
                {item.index === 0 && <HomeIcon className="w-10 h-10" />}
                {item.index === 1 && <FolderIcon className="w-10 h-10" />}
                {item.index === 2 && <InformationCircleIcon className="w-10" />}

                <h3 className="text-sm font-semibold  uppercase">{item.item}</h3>
            </NavLink>
        </>
    )

}
export default SideBarItem;