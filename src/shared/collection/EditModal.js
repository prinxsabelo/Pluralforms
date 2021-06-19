/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef, useContext, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Context } from "../contexts/context";
import Button from "./Button";
import { useState } from "react/cjs/react.development";


export default function EditModal(props) {
  const {
    closeEditModal,
    editOpen

  } = useContext(Context);

  const cancelButtonRef = useRef();
  const [beginHeader, setBeginHeader] = useState("");
  const [beginDesc, setBeginDesc] = useState("");
  const [endHeader, setEndHeader] = useState("");
  const [endDesc, setEndDesc] = useState("");
  useEffect(() => {
    if (props.form) {

      const { begin_header, begin_desc, end_header, end_desc } = props.form;

      if (begin_header)
        setBeginHeader(begin_header);
      if (begin_desc)
        setBeginDesc(begin_desc);
      if (end_header)
        setEndHeader(end_header);
      if (end_desc)
        setEndDesc(end_desc);

    }
  }, [setBeginHeader, props.form])
  const sendForm = () => {
    let form = props.form;
    form.begin_desc = beginDesc;
    form.end_desc = endDesc;
    form.begin_header = beginHeader;
    form.end_header = endHeader;
    props.onEdit(form)
  }
  return (
    <Transition.Root show={editOpen} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-100 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        open={editOpen}
        onClose={closeEditModal}
      >
        <div className="flex items-end justify-center min-h-screen pt-1 px-4 pb-20 text-center sm:block sm:p-0 h-screen">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >

            <div

              className="inline-block align-bottom bg-white rounded-lg text-left 
                overflow-hidden shadow-xl transform transition-all 
                  my-2 sm:align-middle
                 sm:w-1/3 w-full h-3/4 md:h-1/2 "
            >
              {props.editType === "begin" ? (
                <>
                  <div className="bg-white px-4 pt-5">
                    <div className="flex flex-col sm:items-start">
                      <div className="mb-6 text-center  w-full my-3">
                        <Dialog.Title as="h3"
                          className="text-2xl  tracking-wide leading-6 font-medium text-gray-900 w-full flex justify-center uppercase truncate">
                          edit welcome page
                        </Dialog.Title>
                      </div>
                      <div className="w-full flex flex-col">
                        <div className="w-full px-3 mb-2 ">
                          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1" htmlFor="begin_header" >
                            Welcome Header
                          </label>
                          <input
                            onChange={e => setBeginHeader(e.target.value)}
                            name="begin_header"
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500
                                 rounded p-3 mb-3 leading-tight focus:outline-none focus:bg-white" id="begin_header"
                            type="text" placeholder="Jane"
                            value={beginHeader}
                          />

                        </div>
                        <div className="w-full px-3 mb-2">
                          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1" htmlFor="begin_desc">
                            Welcome Description
                          </label>
                          <textarea
                            onChange={e => setBeginDesc(e.target.value)}
                            name="begin_desc"
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500
                              rounded p-3 mb-3 leading-tight focus:outline-none focus:bg-white h-24" id="begin_desc"
                            type="text" placeholder="Jane"
                            value={beginDesc}
                          />

                        </div>
                      </div>
                    </div>
                  </div>

                </>
              ) :
                (
                  <>
                    <div className="bg-white px-4 pt-5">
                      <div className="flex flex-col sm:items-start">
                        <div className="mb-6 text-center  w-full my-3">
                          <Dialog.Title as="h3"
                            className="text-2xl  tracking-wide leading-6 font-medium text-gray-900 w-full flex justify-center uppercase truncate">
                            edit thank you page
                          </Dialog.Title>
                        </div>
                        <div className="w-full flex flex-col">
                          <div className="w-full px-3 mb-2 ">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1" htmlFor="end_header" >
                              Thank You Header
                            </label>
                            <input
                              onChange={e => setEndHeader(e.target.value)}
                              name="end_header"
                              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500
                               rounded p-3 mb-3 leading-tight focus:outline-none focus:bg-white" id="end_header"
                              type="text" placeholder="Jane"
                              value={endHeader} />

                          </div>
                          <div className="w-full px-3 mb-2">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1" htmlFor="end_desc">
                              Thank You Description
                            </label>
                            <textarea
                              onChange={e => setEndDesc(e.target.value)}

                              name="end_desc"
                              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500
                            rounded p-3 mb-3 leading-tight focus:outline-none focus:bg-white" id="end_desc"
                              type="text" placeholder="Jane"
                              value={endDesc}
                            />

                          </div>
                        </div>
                      </div>
                    </div>

                  </>
                )



              }
              <div className="flex justify-end space-x-4 px-7">
                <button type="button"
                  className="text-md underline font-black outline-none focus:outline-none shadow p-3"
                  onClick={closeEditModal}
                  ref={cancelButtonRef}
                >
                  Cancel
                </button>

                <Button className="bg-gray-900 text-lg  w-48 uppercase"
                  onClick={sendForm} >
                  Save
                </Button>


              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
