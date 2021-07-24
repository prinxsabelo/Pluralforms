import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/outline";

const FormFooter = ({ sectionIndex, triggerMove, length }) => {
    return (
        <div className="mmm-b  w-full flex justify-end  items-center progress-bar-animatedspace-x-2 ">
            <div className="flex flex-auto justify-end items-center space-x-2">
                <div>
                    PLURALFORMS
                </div>
                <div className="flex space-x-4  ">

                    {sectionIndex - 1 === -1 ?
                        <button disabled={true} className="bg-yellow-600 cursor-not-allowed disabled:opacity-50 p-2 rounded-xl w-full flex items-center justify-center"
                            onClick={() => triggerMove('up')}>
                            <ChevronUpIcon className="w-7 text-white" />
                        </button> :
                        <button className="bg-yellow-600  p-2 rounded-xl w-full flex items-center justify-center"
                            onClick={() => triggerMove('up')}>
                            <ChevronUpIcon className="w-7  text-white" />
                        </button>
                    }
                    {
                        sectionIndex + 1 === length ?
                            <button disabled={true} className="bg-yellow-600 cursor-not-allowed disabled:opacity-50 p-2 rounded-xl w-full flex items-center justify-center"
                                onClick={() => triggerMove('down')}>
                                <ChevronDownIcon className="w-7 text-white" />
                            </button> :
                            <button className="bg-yellow-600 p-2 rounded-xl w-full flex items-center justify-center"
                                onClick={() => triggerMove('down')}>
                                <ChevronDownIcon className="w-7 text-white" />
                            </button>
                    }

                </div>
            </div>

        </div>
    )
}
export default FormFooter;