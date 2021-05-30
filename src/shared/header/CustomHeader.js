import { useContext } from "react";
import { FormContext } from "../contexts/form-context";
const CustomHeader = () => {

    const { addForm } = useContext(FormContext);
    return (

        <>
            <div className="md:hidden flex flex-row justify-between items-center px-2 py-1 md:p-8 border-b">
                <h3 className="text-2xl">Forms</h3>
                <button className="px-2 py-1 bg-gray-900 text-white text-base tracking-wider rounded"
                    onClick={() => addForm()}>Create Form</button>
            </div>
            <div className="flex p-2 justify-between items-center w-full ">
                <div className="relative text-gray-400 w-1/2  md:ml-16">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-6 h-6">
                            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z">
                            </path>
                        </svg>
                    </span>
                    <input type="search" name="q" className="border-2 py-2 text-sm text-black bg-gray-100 w-full rounded-md pl-10 focus:outline-none focus:bg-white focus:text-gray-900"
                        placeholder="Search..." autoComplete="off" />
                </div>
                <div className="space-x-1 tracking-wider text-sm md:text-normal md:mr-16">
                    <span className="">Status:</span>
                    <button className=" p-1 text-black rounded "> Active </button>

                    <button className=" p-1 text-black font-black rounded"> Closed </button>
                </div>

            </div>

        </>

    )
}
export default CustomHeader;