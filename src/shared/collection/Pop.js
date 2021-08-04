import './Pop.css';
import ReactDOM from 'react-dom';
import { useRef } from 'react';
import { WhatsappIcon, WhatsappShareButton, FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon } from 'react-share';

import { CSSTransition } from 'react-transition-group';
import { BadgeCheckIcon, CogIcon, DuplicateIcon, PencilAltIcon, ShareIcon, TrashIcon, XCircleIcon, } from '@heroicons/react/outline';
import Button from './Button';

const Pop = props => {


    const nodeRef = useRef(null);

    let content = (
        <CSSTransition
            nodeRef={nodeRef} in={props.show} timeout={400} mountOnEnter unmountOnExit

        >

            <aside className="pop" onClick={props.onClick}>
                {props.type === "response" &&
                    <div className="px-12 py-2 text-base flex space-x-6 items-center">
                        <div>

                            <div>  {props.length}  {props.length > 1 ? <>responses </> : <>response </>}  selected</div>
                            {
                                props.total > props.length ?
                                    <button className="underline outline-none focus:outline-none hover:text-red-700 font-bold" onClick={props.selectAll}>
                                        Select All
                                    </button>

                                    :
                                    <button className="underline outline-none focus:outline-none hover:text-red-700 font-bold" onClick={props.clearAll}>
                                        Clear Selection
                                    </button>


                            }

                        </div>
                        <div>
                            <button onClick={props.del} className="text-sm bg-red-100 px-4 py-2 rounded-xl text-white hover:shadow-xl hover:bg-red-200 ">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-900" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>
                }
                {props.type !== "response" &&
                    <>
                        <div className="w-11/12 tracking-wide">  {props.header && props.header}</div>
                        <div className="py-2 flex flex-col space-y-1 text-base md:text-lg">
                            {props.rename &&
                                <button onClick={props.rename} className="border-4 w-full text-left p-2   flex items-center space-x-2">

                                    <PencilAltIcon className="w-6" />
                                    <span className="capitalize tracking-wider"> Rename {props.message}</span>
                                </button>
                            }
                            {props.copy &&
                                <button onClick={props.copy} className="border-4 capitalize w-full text-left p-2   flex items-center space-x-2">

                                    <DuplicateIcon className="w-6" />
                                    <span className="capitalize tracking-wider"> Copy {props.message}</span>
                                </button>
                            }
                            {props.restore &&
                                <button onClick={props.restore} className="border-4 w-full text-left p-2   flex items-center space-x-2">

                                    <BadgeCheckIcon className="w-6" />
                                    <span className="capitalize tracking-wider"> Restore {props.message}</span>
                                </button>
                            }
                            {props.del &&
                                <button onClick={props.del} className="border-4 w-full text-left p-2   flex items-center space-x-2">

                                    <TrashIcon className="w-6" />
                                    <span className="capitalize tracking-wider"> Delete {props.message}</span>
                                </button>
                            }
                            {props.close &&
                                <button onClick={props.close} className="border-4 w-full text-left p-2   flex items-center space-x-2">

                                    <XCircleIcon className="w-6" />
                                    <span className="capitalize tracking-wider"> Close {props.message}</span>
                                </button>
                            }
                            {props.share &&
                                <button onClick={props.share} className="border-4 w-full text-left p-2   flex items-center space-x-2">

                                    <ShareIcon className="w-6" />
                                    <span className="capitalize tracking-wider"> Share {props.message}</span>
                                </button>
                            }
                            {props.settings &&
                                <button onClick={props.settings} className="border-4 w-full text-left p-2   flex items-center space-x-2">

                                    <CogIcon className="w-6" />
                                    <span className="capitalize tracking-wider"> {props.message} Settings</span>
                                </button>
                            }


                        </div>
                    </>
                }
                {
                    props.type === "share" && props.form &&
                    <div className="w-full  -mt-4  px-2 mb-2">
                        <h3 className="tracking-wider text-lg text-center my-2">Share form and get those responses..</h3>
                        <div className="flex space-x-2">
                            <Button
                                onClick={props.previewForm}
                                className="p-2  text-gray-900 text-base tracking-widest p-2 w-1/2 mb-2 border border-gray-800 rounded-lg">
                                Preview Form
                            </Button>
                            <Button
                                onClick={props.copyFormLink}
                                className="p-2  text-gray-900 text-base tracking-widest p-2 w-1/2 mb-2 border border-gray-800 rounded-lg">
                                Copy Link
                            </Button>
                        </div>
                        <div className="flex flex-col space-y-2 ">
                            <div className="border shadow-lg border-gray-900 shadow h-12 rounded-lg ">
                                <WhatsappShareButton url={`https://pluralforms.com/form/${props.form.form_id}/${props.form.ref_id}`}
                                    title={"Please do take your time to fill form.."}
                                    className="w-full flex h-full items-center space-x-3 block  border-2 border-gray-800 rounded-lg whatsapp"
                                >
                                    <span className="wb px-2 h-full flex items-center">
                                        <WhatsappIcon className="h-8 w-8 rounded-full" />
                                    </span>

                                    <span className="tracking-widest font-black text-gray-900  text-base"> Share on WhatsApp</span>
                                </WhatsappShareButton>
                            </div>
                            <div className="border  shadow-lg border-gray-900 shadow h-12 rounded-lg ">
                                <FacebookShareButton url={`https://pluralforms.com/form/${props.form.form_id}/${props.form.ref_id}`}
                                    title={"Please do take your time to fill form.."}
                                    className="w-full flex h-full items-center space-x-3 block  border-2 border-gray-800 rounded-lg whatsapp"
                                >
                                    <span className="fb px-2 h-full flex items-center">
                                        <FacebookIcon className="h-8 w-8 rounded-full" />
                                    </span>

                                    <span className="tracking-widest font-black text-base"> Share on Facebook</span>
                                </FacebookShareButton>
                            </div>

                            <div className="border shadow-lg border-gray-900 shadow h-12 rounded-lg  ">
                                <TwitterShareButton url={`https://pluralforms.com/form/${props.form.form_id}/${props.form.ref_id}`}
                                    title={"Please do take your time to fill form.."}
                                    className="w-full flex h-full items-center space-x-3 block  border-2 border-gray-800 rounded-lg whatsapp"
                                >
                                    <span className="tb px-2 h-full flex items-center">
                                        <TwitterIcon className="h-8 w-8 rounded-full" />
                                    </span>

                                    <span className="tracking-widest font-black text-base"> Share on Twitter</span>
                                </TwitterShareButton>
                            </div>

                        </div>
                    </div>
                }

            </aside>

        </CSSTransition>)
    return ReactDOM.createPortal(content, document.getElementById('pop-hook'));
}
export default Pop