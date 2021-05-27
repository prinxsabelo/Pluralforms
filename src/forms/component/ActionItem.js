import { NavLink } from "react-router-dom";
import {
  ShareIcon,
  PresentationChartBarIcon,
  TrashIcon,
  PencilAltIcon,
  AdjustmentsIcon,
  DuplicateIcon,
  CogIcon,
} from "@heroicons/react/outline";

const ActionItem = (props) => {
  return (
    <>
      {props.link ? (
        <NavLink
          className="hidden md:flex items-center justify-center space-x-1 bg-gray-800 text-gray-100 my-2 px-2 h-10 rounded-lg truncate"
          to={`/form/${props.form_id}/${props.action}`}
        >
          {props.action === "share" && <ShareIcon className="w-4" />}
          {props.action === "results" && (
            <PresentationChartBarIcon className="w-4" />
          )}
          {props.action === "build" && <PencilAltIcon className="w-4" />}
         
          <span className="text-sm"> {props.name}</span>
        </NavLink>
      ) : (
        <button
          className="hidden md:flex items-center justify-center space-x-1 bg-gray-800 text-gray-100 my-2 px-2 rounded-lg"
          onClick={props.onHandle}
        >
          {props.action === "rename" && <AdjustmentsIcon className="w-4" />}
          {props.action === "delete" && <TrashIcon className="w-4" />}
          {props.action === "copy" && <DuplicateIcon className="w-4" />}
          {props.action === "settings" && <CogIcon className="w-4" />}
          <span className="text-sm"> {props.name}</span>
        </button>
      )}
    </>
  );
};
export default ActionItem;
