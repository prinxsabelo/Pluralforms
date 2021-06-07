import ClosedFormItem from "./ClosedFormItem";

const ClosedFormList = ({ closedForms, checkDelete, restoreForm }) => {

    return (
        <div className="form-list overflow-y-auto overflow-x-hidden md:px-12 md:pl-4 flex flex-col ">
            {(closedForms && closedForms.length > 0) ?
                <>
                    {closedForms.map((form, index) => (
                        <ClosedFormItem
                            form={form}
                            key={form.form_id}
                            index={index}
                            checkDelete={checkDelete}
                            restoreForm={restoreForm}
                        />
                    ))}
                </> :
                <div>
                    No Closed Form Found
               </div>
            }

        </div>
    );
};
export default ClosedFormList;
