import { useContext, useState } from "react";

import { NavLink, useHistory } from "react-router-dom";

import Backdrop from "../../shared/collection/Backdrop";
import Pop from "../../shared/collection/Pop";
import { FormContext } from "../../shared/contexts/form-context";
import Moment from 'react-moment';

import ActionItem from "./ActionItem";
const FormItem = ({ form, checkDelete }) => {
  const [pop, setPop] = useState(false);
  const history = useHistory();
  const { editForm } = useContext(FormContext);
  const openPop = () => {
    setPop(true);
  };
  const copy = () => {
    console.log({});
  };
  const del = () => {
    setPop(false);
    checkDelete(form_id);
  };
  const rename = () => {
    editForm(form);
    setPop(false);
  };
  const settings = () => {
    history.push(`user/form/${form_id}/settings`);
  };

  const handleAction = (checkAction) => {
    console.log(checkAction);
    const { action } = checkAction;
    if (action === "rename") {
      rename();
    } else if (action === "delete") {
      checkDelete(form_id);
    }
  };
  const ActionsArr = [
    {
      id: 1,
      action: "share",
      name: "Share",
      link: true,
    },
    {
      id: 2,
      action: "results",
      name: " Results",
      link: true,
    },

    {
      id: 3,
      action: "delete",
      name: "Delete",
      link: false,
    },

    {
      id: 4,
      action: "copy",
      name: "Copy",
      link: false,
    },
    {
      id: 5,
      action: "rename",
      name: "Rename",
      link: false,
    },
    {
      id: 6,
      action: "settings",
      name: "Settings",
      link: false,
    },
  ];

  const { form_id, title, no_questions, no_responses, updated_at } = form;
  const header = (
    <div className="flex w-full items-center -mb-1 space-x-1 py-2 px-3 truncate text-lg bg-white">
      <div>{title}</div>
    </div>
  );
  return (
    <>
      <div
        className=" md:border-2  md:rounded-lg md:flex-row  md:m-2 hover:shadow-md
                                shadow-sm   border   md:flex flex-col w-full mb-1    
                        "
      >
        {/* Mobile Device Design Here.. */}
        <div className="md:hidden flex items-center border-b  flex">
          <div className="w-10/12 flex">
            <NavLink
              to={`/user/form/${form_id}/questions`}
              className="flex w-full py-2 px-2 space-x-2 items-center"
            >
              <div className="flex-auto w-12 h-12 border flex items-center justify-center">
                xxx
              </div>
              <div className="truncate w-10/12">
                <h3 className="text-lg w-full truncate font-medium">
                  {" "}
                  {title}{" "}
                </h3>
                <div className="flex  space-x-4  w-full">
                  <p className="text-xs">Last updated <Moment fromNow>{updated_at}</Moment> </p>
                </div>
                <div className="flex space-x-4 text-xs">
                  <div>{no_questions}0 questions</div>
                  <div>{no_responses}0 responses</div>
                </div>
              </div>
            </NavLink>
          </div>
          <div className="flex-auto  flex items-center justify-center">
            <button onClick={() => openPop()} className="w-full py-4 border">
              <div>::</div>
            </button>
          </div>
        </div>

        <div className="hidden md:flex w-full flex-wrap py-1">
          <NavLink
            className="w-6/12 flex p-2  items-center "
            to={`/user/form/${form_id}/build`}
          >
            <div className="w-10/12 truncate flex space-x-2">
              <div className="w-12 h-12 border-2 flex items-center justify-center"> xxx </div>
              <div className=" w-full">
                <h3 className="text-xl truncate pr-8 font-medium"> {title}</h3>
                <p className="text-sm"> Last updated <Moment fromNow>{updated_at}</Moment> </p>
              </div>
            </div>
            <div className="flex-auto  whitespace-nowrap text-sm tracking-wide">
              <div>
                0  {no_questions} {no_questions > 1 ? "questions" : "question"}{" "}
              </div>
              <div>
                0  {no_responses} {no_responses > 1 ? "responses" : "response"}
              </div>
            </div>
          </NavLink>
          <div className="flex-auto flex space-x-2 w-full md:w-auto p-1 ">
            {ActionsArr.map((a) => (
              <ActionItem
                {...a}
                key={a.id}
                form_id={form_id}
                onHandle={() => handleAction(a)}
              />
            ))}
          </div>
        </div>
      </div>
      <Pop
        header={header}
        show={pop}
        message="form"
        copy={() => copy()}
        del={() => del()}
        rename={() => rename()}
        settings={() => settings()}
      />
      {pop && <Backdrop onClick={() => setPop(false)} />}
    </>
  );
};
export default FormItem;
