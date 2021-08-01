import { useContext, useEffect, useState } from "react";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { toast, Zoom } from 'react-toastify';

import {
  HomeIcon,
  ChevronDoubleRightIcon,
  PlusIcon,
  // CogIcon,
  ArrowLeftIcon,

  PaperAirplaneIcon,
} from "@heroicons/react/outline";
import { ViewportContext } from "../../shared/contexts/viewport-context";
import { BuildQuestionContext } from "../../shared/contexts/build-question.context";
import Pop from "../../shared/collection/Pop";
import Backdrop from "../../shared/collection/Backdrop";


const FormLabel = ({ form, renameForm, addQuestion, q_id }) => {
  const history = useHistory();
  const { width } = useContext(ViewportContext);
  const { setQuestionDetail } = useContext(BuildQuestionContext);
  const breakpoint = 768;
  const [title, setTitle] = useState("");
  const [pop, setPop] = useState(false);
  useEffect(() => {
    if (form) {
      // console.log(form);
      setTitle(form.title);
    }
  }, [form, setTitle]);
  let { form_id } = useParams();
  let buildCheck = false;

  const renameFormTitle = () => {
    renameForm(title, form_id);
  }

  const changeHandler = (e) => {
    const { value } = e.target;
    setTitle(value);
  };

  if (window.location.pathname.search("build") !== -1) {
    buildCheck = true;
  } else {
    buildCheck = false;
  }

  const goto = () => {
    if (window.location.pathname === `/user/form/${form_id}/questions`) {
      setQuestionDetail();
      history.push(`/user/forms`);
    }

    else if (form && form.respondents) {
      history.goBack();
    }
    else {
      setQuestionDetail();
      history.push(`/user/form/${form_id}/questions`)
    }

  }
  const shareForm = () => {
    setPop(true);
  }
  let formUrl = "";
  if (form) {
    formUrl = `http://localhost:3000/form/${form.form_id}/${form.ref_id}`;
  }
  // const formUrl = `https://pluralforms.com/form/${form.form_id}/${form.ref_id}`;

  const copyFormLink = () => {
    setPop(false);


    navigator.clipboard.writeText(formUrl);
    toast.configure();
    const notify = () => toast.success(`Your link is ready.. 😎`, {
      transition: Zoom,
      position: "bottom-center",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: 0,

    })
    notify();
  }
  const previewForm = () => {
    const win = window.open(formUrl, "_blank");
    win.focus();
  }

  return (
    <>
      {
        width > breakpoint &&
        <div className="hidden md:flex items-center mt-1 space-x-1 px-3">
          <div className="flex justify-center items-center space-x-2">
            <NavLink
              to="/user/forms"
              className="px-4 py-2 bg-gray-700 rounded text-white"
            >
              <HomeIcon className="w-7" />
            </NavLink>
            <div>
              <ChevronDoubleRightIcon className="w-4" />
            </div>
          </div>
          <form className="w-10/12 ">
            {buildCheck ? (
              <input
                value={title || ''}
                onChange={changeHandler}
                onBlur={renameFormTitle}
                placeholder="Enter Form Name"
                className="w-full px-4 py-2 border border-gray-800 rounded"
              />
            ) : (
              <div className="px-4 py-2">{title}</div>
            )}
          </form>
          {buildCheck && (
            <>
              {/* <div className="flex flex-auto justify-center">
                <div className="bg-white h-11 w-11 rounded shadow-md border flex items-center justify-center">
                  xxx
                </div>
              </div> */}
              <div className="flex flex-auto justify-left">
                <button
                  className="px-4 py-2 text-white bg-gray-900 hover:shadow-lg rounded outline-none focus:outline-none"
                  type="button"
                  onClick={addQuestion}
                  style={{ transition: "all .30s ease" }}
                >
                  <PlusIcon className="w-7 h-7" />
                </button>


              </div>
            </>
          )}
        </div>
      }




      <div className="md:hidden">
        <div className="flex  border-b-4 border-gray-300 shadow ">
          <div className="w-full  flex items-center space-x-1 ">

            <button
              onClick={() => goto()}
              className="w-12 flex items-center justify-center p-2 "
            >
              <ArrowLeftIcon className="w-6" />
            </button>

            <div className="py-2 tracking-wider w-11/12 truncate font-semibold text-lg tracking-wider">
              {title}
            </div>
            {form.questions.length > 0 &&
              <button className="flex justify-center items-center p-2" onClick={() => shareForm()}>
                <PaperAirplaneIcon className="w-8   transform rotate-90" />
              </button>
            }

          </div>

        </div>
      </div>
      <Pop
        copyFormLink={copyFormLink}
        previewForm={previewForm}
        form={form}
        show={pop}
        message="share"
        type="share"
      />
      {pop && <Backdrop onClick={() => setPop(false)} />}
    </>
  )
}
export default FormLabel;
