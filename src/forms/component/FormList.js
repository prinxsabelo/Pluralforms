import FormItem from "./FormItem";

const FormList = ({ forms, checkDelete }) => {

  return (
    <div className="form-list overflow-y-auto md:px-12 md:pl-4 flex flex-col ">
      {(forms && forms.length > 0) ?
        <>
          {forms.map((form, index) => (
            <FormItem
              form={form}
              key={form.form_id}
              index={index}
              checkDelete={checkDelete}
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
