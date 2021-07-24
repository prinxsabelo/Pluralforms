import './Pop.css';
import ReactDOM from 'react-dom';
import { useRef } from 'react';

import { CSSTransition } from 'react-transition-group';
import { BadgeCheckIcon, CogIcon, DuplicateIcon, PencilAltIcon, TrashIcon, XCircleIcon, } from '@heroicons/react/outline';

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
                        <div className="w-11/12">  {props.header && props.header}</div>
                        <div className="py-2 flex flex-col space-y-1 text-lg">
                            {props.rename &&
                                <button onClick={props.rename} className="border-4 w-full text-left p-2   flex items-center space-x-2">

                                    <PencilAltIcon className="w-6" />
                                    <span className="capitalize"> Rename {props.message}</span>
                                </button>
                            }
                            {props.copy &&
                                <button onClick={props.copy} className="border-4 capitalize w-full text-left p-2   flex items-center space-x-2">

                                    <DuplicateIcon className="w-6" />
                                    <span className="capitalize"> Copy {props.message}</span>
                                </button>
                            }
                            {props.restore &&
                                <button onClick={props.restore} className="border-4 w-full text-left p-2   flex items-center space-x-2">

                                    <BadgeCheckIcon className="w-6" />
                                    <span className="capitalize"> Restore {props.message}</span>
                                </button>
                            }
                            {props.del &&
                                <button onClick={props.del} className="border-4 w-full text-left p-2   flex items-center space-x-2">

                                    <TrashIcon className="w-6" />
                                    <span className="capitalize"> Delete {props.message}</span>
                                </button>
                            }
                            {props.close &&
                                <button onClick={props.close} className="border-4 w-full text-left p-2   flex items-center space-x-2">

                                    <XCircleIcon className="w-6" />
                                    <span className="capitalize"> Close {props.message}</span>
                                </button>
                            }

                            {props.settings &&
                                <button onClick={props.settings} className="border-4 w-full text-left p-2   flex items-center space-x-2">

                                    <CogIcon className="w-6" />
                                    <span className="capitalize"> {props.message} Settings</span>
                                </button>
                            }


                        </div>
                    </>
                }


            </aside>

        </CSSTransition>)
    return ReactDOM.createPortal(content, document.getElementById('pop-hook'));
}
export default Pop