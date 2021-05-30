import { NavLink } from "react-router-dom";
import {
    HomeIcon, FolderIcon
} from "@heroicons/react/outline";
const SideBarItem = ({ item }) => {

    return (
        <>
            <NavLink to={item.link} exact activeClassName="text-gray-900 bg-gray-100"
                className="flex space-x-2 items-center px-4 py-2 rounded  hover:bg-gray-200 hover:text-gray-900">
                {item.index === 0 && <HomeIcon className="w-7" />}
                {item.index === 1 && <FolderIcon className="w-7" />}

                <div className="text-lg font-medium">{item.item}</div>
            </NavLink>
        </>
    )

}
export default SideBarItem;