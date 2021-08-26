import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/outline";
import logo from '../../shared/plural.png';
const FormFooter = ({ sectionIndex, triggerMove, length }) => {
    return (
        <div className="mmm-b bg-white  w-full flex justify-end  items-center progress-bar-animated space-x-2 " id="form_footer">
            <div className="flex flex-auto mx-1 md:mx-8 justify-between md:justify-end md:flex-row 
                                    md:space-x-4 flex-row-reverse items-center space-x-2 text-xs">
                <div className="flex items-center">
                    <img src={logo} className="w-6 h-6" alt="P" />
                    <div className="text-sm font-semibold tracking-wide">
                        PluralForms
                    </div>

                </div>
                <div className="flex space-x-3  ">

                    {sectionIndex - 1 === -1 ?
                        <button disabled={true} className="bg-yellow-600 cursor-not-allowed disabled:opacity-50 p-2 rounded-xl w-full flex items-center justify-center"
                            onClick={() => triggerMove('up')}>
                            <ChevronUpIcon className="w-5 text-white" />
                        </button> :
                        <button className="bg-yellow-600  p-2 rounded-xl w-full flex items-center justify-center"
                            onClick={() => triggerMove('up')}>
                            <ChevronUpIcon className="w-5  text-white" />
                        </button>
                    }
                    {
                        sectionIndex + 1 === length ?
                            <button disabled={true} className="bg-yellow-600 cursor-not-allowed disabled:opacity-50 p-2 rounded-xl w-full flex items-center justify-center"
                                onClick={() => triggerMove('down')}>
                                <ChevronDownIcon className="w-5 text-white" />
                            </button> :
                            <button className="bg-yellow-600 p-2 rounded-xl w-full flex items-center justify-center"
                                onClick={() => triggerMove('down')}>
                                <ChevronDownIcon className="w-5 text-white" />
                            </button>
                    }

                </div>
            </div>

        </div>
    )
}
export default FormFooter;