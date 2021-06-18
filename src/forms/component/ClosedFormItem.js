import { useState } from "react";


import Backdrop from "../../shared/collection/Backdrop";
import Pop from "../../shared/collection/Pop";
import Moment from 'react-moment';

import ActionItem from "./ActionItem";
const ClosedFormItem = ({ form, checkDelete, restoreForm }) => {
    const [pop, setPop] = useState(false);


    const openPop = () => {
        setPop(true);
    };

    const del = () => {
        setPop(false);
        checkDelete(form_id);
    };
    const restore = () => {
        restoreForm(form);
        setPop(false);
    };

    const handleAction = (checkAction) => {
        console.log(checkAction);
        const { action } = checkAction;
        if (action === "restore") {
            restore();
        } else if (action === "delete") {
            checkDelete(form_id);
        }
    };
    const ActionsArr = [

        {
            id: 1,
            action: "restore",
            name: "Restore ",
            link: false,
        },
        {
            id: 2,
            action: "delete",
            name: "Delete",
            link: false,
        },
    ];

    const { form_id, title, no_questions, no_responses, updated_at } = form;
    const header = (
        <div className="flex w-full items-center -mb-1 space-x-1 py-2 px-3 truncate text-lg bg-white">
            <div>{title}</div>
        </div>
    );
    return (
        <>
            <div
                className=" md:border-2  md:rounded-lg md:flex-row  md:m-2 hover:shadow-md
                                shadow-sm   border   md:flex flex-col w-full mb-1    bg-red-100
                        "
            >
                {/* Mobile Device Design Here.. */}
                <div className="md:hidden flex items-center border-b  flex">
                    <div className="w-10/12 flex">
                        <div

                            className="flex w-full py-2 px-2 space-x-2 items-center"
                        >
                            <div className="flex-auto w-12 h-12 border flex items-center justify-center">
                                xxx
                            </div>
                            <div className="truncate w-10/12">
                                <h3 className="text-lg w-full truncate font-medium">
                                    {" "}
                                    {title}{" "}
                                </h3>
                                <div className="flex  space-x-4  w-full">
                                    <p className="text-xs">Last updated <Moment fromNow>{updated_at}</Moment> </p>
                                </div>
                                <div className="flex space-x-4 text-xs">
                                    <div>{no_questions} questions</div>
                                    <div>{no_responses} responses</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-auto  flex items-center justify-center">
                        <button onClick={() => openPop()} className="w-full py-4 border">
                            <div>::</div>
                        </button>
                    </div>
                </div>

                <div className="hidden md:flex w-full flex-wrap py-1">
                    <div
                        className="w-6/12 flex p-2  items-center "

                    >
                        <div className="w-10/12 truncate flex space-x-2">
                            <div className="w-12 h-12 border-2 flex items-center justify-center"> xxx </div>
                            <div className=" w-full">
                                <h3 className="text-xl truncate pr-8 font-medium"> {title}</h3>
                                <p className="text-sm"> Last updated <Moment fromNow>{updated_at}</Moment> </p>
                            </div>
                        </div>
                        <div className="flex-auto  whitespace-nowrap text-sm tracking-wide">
                            <div>
                                {no_questions} {no_questions > 1 ? "questions" : "question"}{" "}
                            </div>
                            <div>
                                0 {no_responses} {no_responses > 1 ? "responses" : "response"}
                            </div>
                        </div>
                    </div>
                    <div className="flex-auto flex space-x-2 w-full md:w-auto p-1 ">
                        {ActionsArr.map((a) => (
                            <ActionItem
                                {...a}
                                key={a.id}
                                form_id={form_id}
                                type="closed"
                                onHandle={() => handleAction(a)}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <Pop
                header={header}
                show={pop}
                message="form"

                del={() => del()}
                restore={() => restore()}

            />
            {pop && <Backdrop onClick={() => setPop(false)} />}
        </>
    );
};
export default ClosedFormItem;
