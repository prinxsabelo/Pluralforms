import { useContext, useState } from "react";
import { NavLink, useRouteMatch } from "react-router-dom";

import Backdrop from "../../../shared/collection/Backdrop";

import Pop from "../../../shared/collection/Pop";

import QTypeIcon from "../../../shared/collection/QTypeIcon";
import { BuildQuestionContext } from "../../../shared/contexts/build-question.context";
const QuestionItem = ({
  q_id,
  title,
  type,
  properties,
  index,
  checkDelete,
}) => {
  const {
    showQuestion,
    questionDetail,
    setTypeAction,

    copyQuestion,
  } = useContext(BuildQuestionContext);

  const [pop, setPop] = useState(false);

  const openPop = () => {
    setPop(true);
  };
  const copy = () => {
    copyQuestion({ q_id });
    setPop(false);
  };
  const checkItemDelete = ({ q_id }) => {
    setPop(false);
    checkDelete({ q_id });
  };

  const { url } = useRouteMatch();
  const header = (
    <div className="flex w-full items-center -mb-1 space-x-2 py-4 px-3 truncate text-lg bg-white">
      <QTypeIcon
        color="rgba(31, 41, 55)"
        className="w-6"
        type={type}
        shape={properties.shape}
      />
      <div>{title}</div>
    </div>
  );
  return (
    <>
      <div
        className={`hidden md:flex q-item text-sm pr-2 rounded m-2 shadow  whitespace-no-wrap min-h-12 items-center
                border-2 cursor-pointer justify-between break-words relative
                ${questionDetail.q_id === q_id && "bg-gray-200"}
                `}
      >
        <div
          className="w-full py-1 flex items-center py-3"
          onClick={() => showQuestion(q_id, type)}
        >
          <div className="px-2 bg-gray-900 flex absolute top-0 bottom-0 ">
            <QTypeIcon
              color="white"
              className="w-8 text-gray-100"
              type={type}
              shape={properties.shape}
            />
          </div>
          <div className="ml-14 truncate">
            <span className="font-semibold mr-1">{index}. </span>
            {title}
          </div>
        </div>
        <div className=" q-actions opacity-0 bg-gray-200 w-18 flex absolute top-0 bottom-0 right-0  items-center space-x-4 px-2">
          <div
            className="bg-gray-100 p-1 rounded-full"
            onClick={() => copyQuestion({ q_id })}
          >
            <svg
              className="w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          </div>

          <div
            className="bg-gray-100 p-1 rounded-full"
            onClick={() => checkItemDelete({ q_id })}
          >
            <svg
              className="w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="md:hidden">
        <div className="flex items-center  border shadow  w-full font-medium mb-1">
          <NavLink
            onClick={() => setTypeAction("..")}
            className="flex items-center w-11/12 truncate px-2 space-x-2"
            to={`${url}/${q_id}`}
          >
            <div className="flex bg-gray-200 p-2  rounded-full h-10 w-10 ">
              <QTypeIcon
                color="red"
                className="w-8"
                type={type}
                shape={properties.shape}
              />
            </div>
            <div className=" py-4 flex-auto truncate">{title}</div>
          </NavLink>

          <div
            className="flex-auto w-16 border py-4 relative font-bold font-black
                                    flex items-center justify-center"
            onClick={() => openPop()}
          >
            <div>::</div>
          </div>
        </div>
      </div>

      <Pop
        header={header}
        show={pop}
        message="question"
        copy={() => copy()}
        del={() => checkItemDelete({ q_id })}
      />
      {pop && <Backdrop onClick={() => setPop(false)} />}
    </>
  );
};
export default QuestionItem;
