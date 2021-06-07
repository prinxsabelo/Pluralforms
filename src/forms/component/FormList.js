import FormItem from "./FormItem";

const FormList = ({ forms, checkDelete, closeForm }) => {

  return (
    <div className="form-list overflow-y-auto overflow-x-hidden md:px-12 md:pl-4 flex flex-col ">
      {(forms && forms.length > 0) ?
        <>
          {forms.map((form, index) => (
            <FormItem
              form={form}
              key={form.form_id}
              index={index}
              checkDelete={checkDelete}
              closeForm={closeForm}
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
