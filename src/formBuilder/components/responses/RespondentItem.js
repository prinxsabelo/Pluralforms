import { NavLink, useRouteMatch } from "react-router-dom";
import Moment from 'react-moment';

const RespondentItem = ({ index, token, submittedAt, isChecked, handleRespondent }) => {


  const { url } = useRouteMatch();

  return (
    <>
      <div className="flex  items-center border-b-2 shadow space-x-1 w-full shadow-sm  border-b-4 ">
        <NavLink
          to={url + "/" + token}
          className="w-11/12 flex flex-col py-3  p-5  truncate font-medium "
        >
          <div>Respondent {index}</div>
          <div className="text-sm"> <Moment fromNow>{submittedAt}</Moment></div>
        </NavLink>

        <div
          className="flex-auto w-16 border py-4 relative font-bold font-black
                                 flex items-center justify-center"
        >
          <div>
            <input
              name={token}
              className="form-checkbox w-7 h-7  cursor-pointer "
              type="checkbox"
              checked={isChecked}
              onChange={handleRespondent}
            />
          </div>
        </div>
      </div>

    </>
  );
};
export default RespondentItem;
