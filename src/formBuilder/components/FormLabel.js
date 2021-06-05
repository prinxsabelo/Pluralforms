import { useContext, useEffect, useState } from "react";
import { NavLink, useHistory, useParams } from "react-router-dom";

import Backdrop from "../../shared/collection/Backdrop";
import QDrawer from "../../shared/collection/QDrawer";
import {
  HomeIcon,
  ChevronDoubleRightIcon,
  PlusIcon,
  CogIcon,
  ArrowLeftIcon,
} from "@heroicons/react/outline";

import { FormContext } from "../../shared/contexts/form.context";
import { BuildQuestionContext } from "../../shared/contexts/build-question.context";

const FormLabel = (props) => {
  // console.log(props);
  let history = useHistory();
  const {
    form,
    drawerIsOpen,
    setDrawerIsOpen,
    setTypeAction,
    setQDrawerPosition,
  } = useContext(BuildQuestionContext);
  const changeHandler = (e) => {
    const { value } = e.target;
    console.log(value);
    setTitle(value);
  };
  const submitForm = (e) => {
    e.preventDefault();
    renameForm(title, form_id);
  };
  const addQuestion = () => {
    drawerIsOpen ? closeDrawer() : openDrawer();
  };
  const openDrawer = () => {
    setTypeAction("new");
    setQDrawerPosition("left");
    setDrawerIsOpen(true);
  };
  const closeDrawer = () => {
    setDrawerIsOpen(false);
  };
  const { renameForm } = useContext(FormContext);
  let { form_id, q_id } = useParams();

  const [title, setTitle] = useState("");
  useEffect(() => {
    if (form) {
      // console.log(form);
      setTitle(form.title);
    }
  }, [form, setTitle]);

  let buildCheck = false;
  if (window.location.pathname.search("build") !== -1) {
    buildCheck = true;
  } else {
    buildCheck = false;
  }
  const goto = () => {
    if (window.location.pathname === `/user/form/${form_id}/questions`) {
      history.push(`/user/forms`);
    } else if (
      window.location.pathname === `/user/form/${form_id}/questions/${q_id}`
    ) {
      history.push(`/user/form/${form_id}/questions`);
    } else {
      history.goBack();
    }
  };
  return (
    <>
      {form && (
        <>
          <div className="hidden md:flex items-center mt-1 space-x-1 px-3">
            <div className="flex justify-center items-center space-x-2">
              <NavLink
                to="/user/forms"
                className="px-4 py-2 bg-gray-900 rounded text-white"
              >
                <HomeIcon className="w-7" />
              </NavLink>
              <div>
                <ChevronDoubleRightIcon className="w-4" />
              </div>
            </div>
            <form className="w-1/2 ">
              {buildCheck ? (
                <input
                  value={title || ''}
                  onChange={changeHandler}
                  onBlur={submitForm}
                  placeholder="Enter Form Name"
                  className="w-full px-4 py-2 border border-gray-800 rounded"
                />
              ) : (
                <div className="px-4 py-2">{title}</div>
              )}
            </form>
            {buildCheck && (
              <>
                <div className="flex flex-auto justify-center">
                  <div className="bg-white h-11 w-11 rounded shadow-md border flex items-center justify-center">
                    xxx
                  </div>
                </div>
                <div className="flex flex-auto justify-left">
                  <button
                    className="px-4 py-2 text-white bg-gray-900 hover:shadow-lg rounded outline-none focus:outline-none"
                    type="button"
                    onClick={addQuestion}
                    style={{ transition: "all .30s ease" }}
                  >
                    <PlusIcon className="w-7 h-7" />
                  </button>

                  <QDrawer show={drawerIsOpen} action="new" form_id={form_id} />

                  {drawerIsOpen && <Backdrop onClick={closeDrawer} />}
                </div>
              </>
            )}
          </div>

          <div className="md:hidden">
            <div className="flex items-center border-b-4 border-gray-300 shadow ">
              <div className="w-10/12 flex items-center space-x-1">
                <div className="bg-white">
                  <button
                    onClick={() => goto()}
                    className="w-12 flex items-center justify-center p-2 "
                  >
                    <ArrowLeftIcon className="w-6" />
                  </button>
                </div>

                <div className="flex w-11/12 items-center pr-3 space-x-1">
                  <div className="h-8 w-8 border text-xs flex justify-center items-center">
                    xxx
                  </div>
                  <div className="py-2 w-full truncate font-semibold text-lg">
                    {title}
                  </div>
                </div>
              </div>
              <div className="flex-auto  flex items-center justify-end  py-1 pt-2 pr-1">
                <button className="w-12 flex items-center justify-center p-2 ">
                  <CogIcon className="w-6" />
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default FormLabel;
