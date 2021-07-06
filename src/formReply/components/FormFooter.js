import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/outline";

const FormFooter = ({ sectionIndex, triggerMove, length }) => {
    return (
        <div className="mmm-b bg-gray-900 text-white flex justify-end items-center space-x-2">
            <div>
                PLURALFORMS = {sectionIndex + 1}
            </div>
            <div className="flex space-x-4  ">

                {sectionIndex - 1 === -1 ?
                    <button disabled={true} className="bg-red-600 cursor-not-allowed disabled:opacity-50 p-2 rounded-xl w-full flex items-center justify-center"
                        onClick={() => triggerMove('up')}>
                        <ChevronUpIcon className="w-7" />
                    </button> :
                    <button className="bg-red-600  p-2 rounded-xl w-full flex items-center justify-center"
                        onClick={() => triggerMove('up')}>
                        <ChevronUpIcon className="w-7" />
                    </button>
                }
                {
                    sectionIndex + 1 === length ?
                        <button disabled={true} className="bg-red-600 cursor-not-allowed disabled:opacity-50 p-2 rounded-xl w-full flex items-center justify-center"
                            onClick={() => triggerMove('down')}>
                            <ChevronDownIcon className="w-7" />
                        </button> :
                        <button className="bg-red-600 p-2 rounded-xl w-full flex items-center justify-center"
                            onClick={() => triggerMove('down')}>
                            <ChevronDownIcon className="w-7" />
                        </button>
                }

            </div>
        </div>
    )
}
export default FormFooter;