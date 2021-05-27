import './Drawer.css';
import ReactDOM from 'react-dom';

import { CSSTransition } from 'react-transition-group';
import { useRef } from 'react';
import QTypeIcon from './QTypeIcon';

const Drawer = props => {
    const nodeRef = useRef(null);
    const { detail, type } = props;
  
    let content = (
        <CSSTransition
            nodeRef={nodeRef} in={props.show}  timeout={200} mountOnEnter unmountOnExit
        >
            <aside className='drawer' onClick={props.onClick}>
                <div className="container px-6 py-3 shadow">
                    <h3 className="text-lg">Response by Anonymous</h3>
                    <h5 className="text-base pt-3">20-12-2011</h5>
                </div>
                <div className="p-4 overflow-y-scroll content-h">
                    {detail.answers &&
                        <div className="flex flex-col">
                            {detail.answers.map((answer, index) =>
                                <div className="flex text-md py-2 px-4 m-2 shadow-md" key={index}>
                                    <div className="w-1/12">{index + 1}</div>

                                    <div>
                                        <div className="text-md">{answer.title}</div>
                                        {
                                            answer.skipped === false ?
                                                <>
                                                    {answer.type !== "RATING" ?
                                                        <div className="pt-2 text-base">{answer.text}</div>
                                                        :
                                                        <div className="flex space-x-1 pt-2">
                                                            {Array.from(Array(parseInt(answer.value)), (rating, index) => {
                                                                return (

                                                                    <QTypeIcon key={index} color="red" className="w-8 text-gray-800"
                                                                        type={answer.type} shape={answer.shape} />
                                                                )
                                                            })}
                                                        </div>
                                                    }

                                                </>
                                                :
                                                <div className="pt-3">..</div>
                                        }
                                    </div>

                                </div>




                            )}
                        </div>
                    }
                </div>
            </aside>
        </CSSTransition >)
    return ReactDOM.createPortal(content, document.getElementById('qdrawer-hook'));
}
export default Drawer