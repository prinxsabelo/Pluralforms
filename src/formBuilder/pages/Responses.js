import { useContext, useEffect, useState } from "react";

import Backdrop from "../../shared/collection/Backdrop";
import QTypeIcon from "../../shared/collection/QTypeIcon";
import "./Responses.css";
import Pop from "../../shared/collection/Pop";
import RespondentsList from "../components/responses/RespondentsList";
import DeleteModal from "../../shared/collection/DeleteModal";
import Moment from 'react-moment';
import { toast, Zoom } from 'react-toastify';
import RDrawer from "../../shared/collection/RDrawer";
import { ViewportContext } from "../../shared/contexts/viewport-context";
import { Context } from "../../shared/contexts/context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import LoadingSpinner from "../../shared/collection/LoadingSpinner.";
import { ReactComponent as Empty } from '../../assets/empty.svg';

const Responses = () => {
  let form_id = window.location.pathname.match(/\d+/)[0];
  const breakpoint = 768;
  const { width } = useContext(ViewportContext);

  const { sendRequest, isLoading } = useHttpClient();

  const [respondents, setRespondents] = useState([]);
  const [detail, setDetail] = useState({});
  const [questions, setQuestions] = useState([]);
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const [arr, setArr] = useState([]);
  const [loadResponses, setLoadResponses] = useState(false);
  const { openDeleteModal, closeDeleteModal } = useContext(Context);
  const showRespondent = (resp) => {
    setDrawerIsOpen(true);
    let index = respondents.findIndex((x) => x.token === resp.token);
    resp.index = index + 1;
    setDetail(resp);
  };
  const closeDrawer = () => {
    setDrawerIsOpen(false);
  };
  const handleRespondent = (event) => {
    //variable checker to check and confirm selected..
    let checker = arr.length;
    const { name, checked } = event.target;
    let index = respondents.findIndex((x) => x.token === name);
    if (checked) {
      setArr([...arr, name]);
      respondents[index].isChecked = true;
      checker += 1;
    } else {
      respondents[index].isChecked = false;
      const newArr = arr.filter((x) => x !== name);
      setArr(newArr);
      checker -= 1;
    }
    setRespondents(respondents);
    let checkAllBox = document.getElementById("checkAllBox");

    if (checkAllBox) {
      // once checker is equal to total respodent checkAllBox to be true..
      if (checker === respondents.length) {
        checkAllBox.checked = true;
      } else {
        checkAllBox.checked = false;
      }
    }
  };
  const clearAll = () => {
    let resp = respondents.map((x) => {
      x.isChecked = false;
      return x;
    });
    setRespondents(resp);
    setArr([]);
    let checkAllBox = document.getElementById("checkAllBox");
    if (checkAllBox) {
      checkAllBox.checked = false;
    }
  };
  const selectAll = () => {
    // console.log(respondents);
    const newArr = [];
    let resp = respondents.map((x) => {
      x.isChecked = true;
      newArr.push(x.token);
      return x;
    });
    setArr(newArr);
    setRespondents(resp);
    if (newArr.length === resp.length) {
      let checkAllBox = document.getElementById("checkAllBox");
      if (checkAllBox) {
        checkAllBox.checked = true;
      }
    }
  };
  const handleAll = (event) => {
    const { checked } = event.target;
    if (checked) {
      selectAll();
    } else {
      clearAll();
    }
  };
  const checkDelete = () => {
    openDeleteModal();
  };
  const handleDelete = async () => {
    closeDeleteModal();
    //Deleting here..
    console.log(arr);
    try {
      const data = await sendRequest(`https://pluralforms.com/pluralforms-api/public/api/user/forms/response`, 'DELETE',
        JSON.stringify({ arr }));
      if (data) {
        const resps = respondents.filter(({ token }) => !arr.includes(token));
        setRespondents(resps);
        setArr([]);
        toast.configure();
        const notify = () => toast.success(`Deletion was successful.. 😎`, {
          transition: Zoom,
          position: "bottom-center",
          autoClose: 1500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: 0,

        })
        notify();
      }
    } catch { }


  };
  useEffect(() => {
    let checkAllBox = document.getElementById("checkAllBox");
    const fetchResponses = async () => {
      try {
        const data = await sendRequest(`https://pluralforms.com/pluralforms-api/public/api/user/forms/response`, 'POST', JSON.stringify({ form_id }));
        if (data) {
          setQuestions(data.form.questions);
          setRespondents(data.form.respondents);
          let resp = data.form.respondents;
          if (arr.length === 0) {
            const newArr = [];
            resp.map((r) => {
              if (r.isChecked) {
                newArr.push(r.token);

              }
              return r.token
            });
            setArr(newArr);
            //If Respondent is greater than zero and  exist and selected = total respondents.
            if (resp.length > 0 && resp.length === newArr.length) {
              if (checkAllBox) {
                checkAllBox.checked = true;
              }
            }
          }
        }
        setLoadResponses(true);

      } catch {
        setLoadResponses(true);
      }

    }
    if (form_id && !loadResponses) {
      fetchResponses();
    }



  }, [loadResponses, sendRequest, form_id, setQuestions, setRespondents, arr.length]);

  return (
    <>
      {!isLoading ?
        <>
          {width > breakpoint ? (
            <>
              {
                respondents.length > 0 ?
                  <div className="flex w-full px-8   main-container">
                    <div className="w-full flex flex-col shadow-lg p-1 m-1">
                      <div className="bg-yellow-500 w-full h-2"></div>
                      <div className="w-full cont overflow-x-auto">
                        <table className=" w-full border text-base">
                          <thead className="border-b-2 text-sm uppercase tracking-wider p-2">
                            <tr align="left" className="shadow">
                              <th className="sticky top-0 bg-white shadow  font-normal px-5">
                                <input
                                  name="all"
                                  className="form-checkbox w-7 h-7  cursor-pointer "
                                  type="checkbox"
                                  id="checkAllBox"
                                  onChange={handleAll}
                                />
                              </th>
                              <th className="sticky  top-0  bg-white shadow  p-4 font-normal">
                                User Name
                              </th>
                              <th className="sticky top-0 bg-white shadow p-4 font-normal">
                                Response Info..
                              </th>
                              {questions && questions.length > 0 && (
                                <>
                                  {questions.map((question) => (
                                    <th
                                      key={question.q_id}
                                      className="sticky  top-0  bg-white shadow  px-4 py-2  font-normal"
                                    >
                                      <p className="truncate ...">{question.title}</p>
                                    </th>
                                  ))}
                                </>
                              )}
                            </tr>
                          </thead>
                          <tbody className="text-sm">
                            {respondents && respondents.length > 0 && (
                              <>
                                {respondents.map((respondent, index) => (
                                  <tr
                                    key={respondent.token}
                                    className="border-b   hover:bg-gray-100 cursor-pointer truncate ..."
                                  >
                                    <td className="flex items-center w-full items-center h-14 justify-center hover:bg-gray-200 cursor-default bg-white">
                                      <input
                                        name={respondent.token}
                                        className="form-checkbox w-7 h-7  cursor-pointer "
                                        type="checkbox"
                                        checked={respondent.isChecked}
                                        onChange={handleRespondent}
                                      />
                                    </td>
                                    <td onClick={() => showRespondent(respondent)}>
                                      <div className="flex p-4">
                                        Respondent {index + 1}
                                      </div>
                                    </td>
                                    <td onClick={() => showRespondent(respondent)}>
                                      <div className="flex p-4"><Moment fromNow>{respondent.submittedAt}</Moment></div>
                                    </td>
                                    {respondent.answers.map((answer, index) => (
                                      <td
                                        className="px-4 py-2"
                                        key={index}
                                        onClick={() => showRespondent(respondent)}
                                      >
                                        {answer.skipped === false ? (
                                          <>
                                            {answer.type !== "RATING" ? (
                                              <>
                                                {answer.allow_multiple_selection === false ?
                                                  <div className="flex space-x-1">
                                                    {answer.answer}
                                                  </div>
                                                  :
                                                  <div className="flex w-full truncate ...">
                                                    {
                                                      (answer.answer).includes(`${"["}`) && (answer.answer).length !== 0 ?
                                                        <>
                                                          {JSON.parse((answer.answer)).map(an =>
                                                            <span key={an} className="pr-1">{an}
                                                              {JSON.parse(answer.answer).length > 1 && <>.. </>}
                                                            </span>
                                                          )}
                                                        </> :
                                                        <></>
                                                    }

                                                  </div>
                                                }
                                              </>
                                            ) : (
                                              <div className="flex space-x-1">
                                                {answer.answer && parseInt(answer.answer) > 0 ?
                                                  <>
                                                    {Array.from(
                                                      Array(parseInt(answer.answer)),
                                                      (rating, index) => {
                                                        return (
                                                          <QTypeIcon
                                                            key={index}
                                                            color="red"
                                                            name={rating}
                                                            className="w-8 text-gray-800"
                                                            type={answer.type}
                                                            shape={answer.shape}
                                                          />
                                                        );
                                                      }
                                                    )}
                                                  </>
                                                  :
                                                  <>...</>
                                                }


                                              </div>
                                            )}
                                          </>
                                        ) : (
                                          <div className="flex space-x-1">..</div>
                                        )}
                                      </td>
                                    ))}
                                  </tr>
                                ))}
                              </>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div> :
                  <div className="w-full h-4/6 space-y-4 flex flex-col  md:mt-24 items-center">
                    <div className="flex items-center w-1/2 md:mt-10 items-center">
                      <Empty className="w-full  h-full" />

                    </div>
                    <div className="flex flex-col space-y-2 items-center ">
                      <div className="text-xl font-medium">No Response found for now..</div>
                      <div>Let people fill your form first </div>
                    </div>
                  </div>
              }

            </>
          ) : (
            <>
              {respondents && respondents.length > 0 ? (
                <RespondentsList
                  respondents={respondents}
                  handleDelete={handleDelete}
                  handleRespondent={handleRespondent}
                />
              ) : (
                <div className="flex flex-col w-full flex justify-center -space-y-32">
                  <div className="w-10/12 flex mx-2">
                    <Empty />
                  </div>
                  <div className="flex flex-col space-y-2 items-center ">
                    <div className="text-lg font-medium">No Response found for now..</div>
                    <div>Let people fill your form first </div>
                  </div>
                </div>
              )}
            </>
          )}
          {drawerIsOpen && <Backdrop onClick={closeDrawer} />}
          <RDrawer show={drawerIsOpen} type="response" detail={detail} />
          {arr.length > 0 && (
            <>
              {" "}
              <Pop
                show={true}
                total={respondents.length}
                del={() => checkDelete()}
                clearAll={() => clearAll()}
                selectAll={() => selectAll()}
                length={arr.length}
                type="response"
              />{" "}
            </>
          )}
          {arr.length === respondents.length ? (
            <DeleteModal
              onDelete={handleDelete}
              message="You are about deleting all your responses.."
            />
          ) : (
            <DeleteModal
              onDelete={handleDelete}
              message={`You are about deleting your ${arr.length === 1 ? "response" : "responses"
                } `}
            />
          )}
        </>
        :

        <div className="flex h-screen ">
          <LoadingSpinner />
        </div>

      }
    </>);
};

export default Responses;
