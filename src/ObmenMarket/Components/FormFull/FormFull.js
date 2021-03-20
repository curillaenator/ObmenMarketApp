import { Form } from "react-final-form";
import { FormFullFields } from "./FormFullFields";

export const FormFull = (props) => {
  const onSubmit = (formData) => {
    const curDate = new Date();

    const addSubmitData = {
      acceptedOffer: "",
      publishedAt: new Date(),
      expireDate: new Date(curDate.setDate(curDate.getDate() + 7)),
      published: true,
    };
    
    props.publishLotFromForm(props.newLotId, { ...formData, ...addSubmitData });
  };
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
          furmFullUi={props.furmFullUi}
        />
      )}
    />
  );
};
