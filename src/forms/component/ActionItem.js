import { NavLink } from "react-router-dom";
import {
  ShareIcon,
  PresentationChartBarIcon,
  ClipboardIcon,
  PencilAltIcon,
  CogIcon,
  XIcon,
  TrashIcon,
  EyeIcon,
  DatabaseIcon
} from "@heroicons/react/outline";

const ActionItem = (props) => {
  return (
    <>
      {props.link ? (
        <NavLink to={`/user/form/${props.form_id}/${props.action}`}
          className="flex flex-col justify-center items-center bg-gray-800 text-white px-4 py-2 w-14 rounded-lg hover:bg-red-800 hover:shadow-md">
          <span>
            {props.action === "share" && <ShareIcon className="w-4" />}
            {props.action === "results" && <PresentationChartBarIcon className="w-4" />}
            {props.action === "build" && <DatabaseIcon className="w-4" />}
          </span>
          <span className="text-xs">
            {props.name}
          </span>
        </NavLink>

      )
        :
        (
          <button onClick={props.onHandle}
            className="flex flex-col justify-center items-center bg-gray-800 text-white px-4 py-2 w-14 rounded-lg  hover:bg-red-800 hover:shadow-md">
            <span>
              {props.action === "restore" && <EyeIcon className="w-4" />}
              {props.action === "delete" && <TrashIcon className="w-4" />}
              {props.action === "rename" && <PencilAltIcon className="w-4" />}
              {props.action === "close" && <XIcon className="w-4" />}
              {props.action === "copy" && <ClipboardIcon className="w-4" />}
              {props.action === "settings" && <CogIcon className="w-4" />}
            </span>
            <span className="text-xs">
              {props.name}
            </span>

          </button>

        )
      }
    </>
  );
};
export default ActionItem;
