import './Pop.css';
import ReactDOM from 'react-dom';
import { useRef } from 'react';

import { CSSTransition } from 'react-transition-group';

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
                            
                                <div>  {props.length}  {props.length > 1 ? <>responses </>: <>response </>}  selected</div>
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
                               <button  onClick={props.del} className="text-sm bg-red-100 px-4 py-2 rounded-xl text-white hover:shadow-xl hover:bg-red-200 ">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-900" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                               </button>
                            </div>
                    </div>
                }
                {props.type !== "response" &&
                <>
                  {props.header && props.header}
                    <div className="py-2 flex flex-col space-y-1 text-base">
                            {props.rename &&
                                <button onClick={props.rename} className="border-4 w-full text-left p-2   flex items-center space-x-2">
                                    <svg className="w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    <span className="capitalize"> Rename {props.message}</span>
                                </button>
                            }
                            {props.copy &&
                                <button onClick={props.copy} className="border-4 capitalize w-full text-left p-2   flex items-center space-x-2">
                                    <svg className="w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                    <span className="capitalize"> Copy {props.message}</span>
                                </button>
                            }
                            {props.del &&
                                <button onClick={props.del} className="border-4 w-full text-left p-2   flex items-center space-x-2">
                                    <svg className="w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                    <span className="capitalize"> Delete {props.message}</span>
                                </button>
                            }
                            {props.settings &&
                                <button onClick={props.settings} className="border-4 w-full text-left p-2   flex items-center space-x-2">
                                    <svg className="w-6 " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
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