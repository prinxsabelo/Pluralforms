import FormItem from "./FormItem";

const FormList = ({ forms, checkDelete }) => {
  return (
    <div className="form-list overflow-y-auto md:px-12 md:pl-16 flex flex-col flex-col-reverse">
      {forms.map((form, index) => (
        <FormItem
          form={form}
          key={form.form_id}
          index={index}
          checkDelete={checkDelete}
        />
      ))}
    </div>
  );
};
export default FormList;
