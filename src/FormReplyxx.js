import ReactFullpage from '@fullpage/react-fullpage'; // will return static version on server and "live" version on client
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/outline";
import { useState } from 'react';
import FormBegin from './FormBegin';

export const FormReply = () => {
    const triggerMove = (move) => {
        console.log(sectionIndex);
        if (move === "down") {
            document.getElementById(`down${sectionIndex}`).click();
        } else {
            document.getElementById(`up${sectionIndex}`).click();

        }
    }
    const moveSection = (mover, index, fullpageApi) => {
        setSectionIndex(index);
        if (mover === "down") {
            fullpageApi.moveSectionDown()
        } else {
            fullpageApi.moveSectionUp()
        }

    }
    const [beginRead, setBeginRead] = useState(true);

    const [sectionIndex, setSectionIndex] = useState(0);

    const arr = [{ title: "me", bg: "bg-red-400" }, { title: "flow", bg: "bg-green-400" }, { title: "positions", bg: "bg-yellow-500" }, { title: "something", bg: "bg-purple-500" }];
    return (
        <>
            {(beginRead) ?
                <FormBegin startForm={() => setBeginRead(false)} />
                :
                <>
                    <div className="mmm-b bg-indigo-900 text-white flex justify-end items-center space-x-2">
                        <div>
                            PLURALFORMS
                        </div>
                        <div className="flex space-x-4  ">

                            {sectionIndex - 1 === -1 ?
                                <button disabled={true} className="bg-green-600 cursor-not-allowed disabled:opacity-50 p-2 rounded-xl w-full flex items-center justify-center"
                                    onClick={() => triggerMove('up')}>
                                    <ChevronUpIcon className="w-7" />
                                </button> :
                                <button className="bg-green-600  p-2 rounded-xl w-full flex items-center justify-center"
                                    onClick={() => triggerMove('up')}>
                                    <ChevronUpIcon className="w-7" />
                                </button>
                            }
                            {
                                sectionIndex + 1 === arr.length ?
                                    <button disabled={true} className="bg-green-600 cursor-not-allowed disabled:opacity-50 p-2 rounded-xl w-full flex items-center justify-center"
                                        onClick={() => triggerMove('down')}>
                                        <ChevronDownIcon className="w-7" />
                                    </button> :
                                    <button className="bg-green-600 p-2 rounded-xl w-full flex items-center justify-center"
                                        onClick={() => triggerMove('down')}>
                                        <ChevronDownIcon className="w-7" />
                                    </button>
                            }

                        </div>
                    </div>
                    <div className="mmm-t ">
                        {/* Progress bar will be displayed here.. */}
                        <div className="w-full h-3 bg-gray-100 fixed top-0 left-0 right-0 text-xs flex items-center">
                            ..
                        </div>
                        <div className="bg-white relative top-2 -left-1 rounded-full w-14 h-14 flex items-center justify-center">

                        </div>
                    </div>
                    <ReactFullpage
                        //fullpage options
                        licenseKey={'YOUR_KEY_HERE'}
                        scrollingSpeed={1000} /* Options here */

                        render={({ state, fullpageApi }) => {
                            return (
                                <ReactFullpage.Wrapper>
                                    {
                                        arr.map((x, index) =>
                                            <div key={x.bg} className={` section ${x.bg}`}>
                                                <div className="flex w-full space-x-4 justify-center">
                                                    <button id={`down${index}`} onClick={() => moveSection("down", index + 1, fullpageApi)} className={`up${index} bg-green-500 py-4 py-2 w-24`}>
                                                        down = {index + 1}
                                                    </button>
                                                    <button id={`up${index}`} onClick={() => moveSection("up", index - 1, fullpageApi)} className={`down${index} bg-green-500  py-4 py-2 w-24`}>
                                                        up = {index - 1}
                                                    </button>
                                                </div>

                                            </div>
                                        )
                                    }


                                </ReactFullpage.Wrapper>
                            );
                        }}
                    />
                </>

            }

        </>
    );
};
