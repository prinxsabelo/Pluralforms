import { useContext } from "react";
import { FormContext } from "../context/form-context";

const HeaderRight = () => {
    const { addForm } = useContext(FormContext);
    return <div className="hidden md:flex space-x-4 justify-center items-center">
        <button
            className="px-4 py-2 text-sm uppercase bg-gray-900 text-white rounded  mr-1 mb-1"
            onClick={() => addForm()}>Create Form</button>
        <button className="flex bg-white text-white p-1 " aria-haspopup="true" aria-expanded="true">
            <div className="bg-gray-200 rounded-full w-7 h-7 flex justify-center items-center">BS</div>
            <svg className="pt-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
        </button>
    </div>
}
export default HeaderRight;