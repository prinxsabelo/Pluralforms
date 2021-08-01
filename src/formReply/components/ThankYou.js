import { NavLink } from "react-router-dom";

const ThankYou = ({ endMessage }) => {
    //Confirm if there's a thankYou message..
    return (
        <div>
            <div className="">
                {endMessage ?
                    <div className=" w-screen h-screen flex items-center justify-center">
                        <div className="flex flex-col space-y-8 p-4 w-11/12  md:w-1/2 break-words  items-center">
                            <div className="flex-auto flex-col w-full space-y-4 mx-2 items-center justify-center ">
                                <h3 className="text-5xl text-center tracking-wide">
                                    {endMessage.end_header}
                                </h3>
                                <div className="tracking-wider text-center text-lg">
                                    {endMessage.end_desc}
                                </div>
                            </div>


                        </div>

                    </div> :
                    <div className=" w-screen h-screen flex items-center justify-center">
                        <div className="flex flex-col space-y-8 p-4 w-full md:w-1/2 break-words  items-center">
                            <div className="flex flex-col w-full space-y-4 items-center justify-center ">
                                <h3 className="text-4xl flex text-center">
                                    You have submitted form already..
                                </h3>
                                <div className="tracking-wider text-lg">
                                    Take time to build your form too..
                                </div>
                            </div>
                            <div className="flex w-full items-center flex-col justify-center space-y-2">
                                <div className="text-lg">
                                    You can get people's opinions too..
                                </div>
                                <NavLink to="/login" className="p-3 text-center text-xl font-bold w-52  text-gray-100 bg-yellow-600 tracking-wider
                                          hover:bg-yellow-700 rounded-lg">
                                    Create Form
                                </NavLink>
                            </div>

                        </div>

                    </div>
                }
            </div>


            <footer className="fixed flex justify-end space-x-2 items-center bottom-0 bg-white border-t w-full font-medium p-3 tracking-wider uppercase text-sm">
                <div className="text-xs font-bold tracking-widest">
                    Ask those questions..
                </div>

                <NavLink to="/login" className="px-4 py-2 text-center text-sm font-bold  text-gray-100 bg-gray-600 bg-yellow-600 tracking-wider
                                             hover:bg-yellow-700 rounded-lg tracking-widest">
                    Pluralforms
                </NavLink>



            </footer>
        </div>
    )
}
export default ThankYou