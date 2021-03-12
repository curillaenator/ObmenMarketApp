import { Form } from "react-final-form";
import { FormFullFields } from "./FormFullFields";

export const FormFull = (props) => {
  const onSubmit = (formData, values) => console.log(formData, values);
  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, form, values }) => (
        <FormFullFields
          isFormModeOn={props.isFormModeOn}
          handleSubmit={handleSubmit}
          form={form}
          values={values}
          icons={props.icons}
        />
      )}
    />
  );
};
