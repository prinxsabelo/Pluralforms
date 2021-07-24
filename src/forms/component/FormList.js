import FormItem from "./FormItem";

const FormList = ({ forms, checkDelete, closeForm, renameForm, copyForm }) => {
  // console.log(forms);
  return (
    <div className="form-list overflow-y-auto overflow-x-hidden md:px-12 md:pl-4 flex flex-col ">
      {(forms && forms.length > 0) ?
        <>
          {forms.map(form => (

            <FormItem
              form={form}
              key={form.form_id}
              copyForm={copyForm}
              checkDelete={checkDelete}
              closeForm={closeForm}
              renameForm={renameForm}
            />

          ))}
        </> :
        <div>
          No Form Found
        </div>
      }

    </div>
  );
};
export default FormList;
