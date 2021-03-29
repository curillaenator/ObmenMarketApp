import { Form } from "react-final-form";
import { FormFullFields } from "./FormFullFields";

export const FormFull = (props) => {
  const onSubmit = (formData) => {
    delete formData.photos;

    const curDate = new Date();

    const updData = {
      acceptedOffer: "",
      offersQty: 0,
      publishedAt: new Date(),
      expireDate: new Date(curDate.setDate(curDate.getDate() + 7)),
    };

    console.log({ ...formData, ...updData });
    props.publishNewLotFromForm(props.createLotId, { ...formData, ...updData });
  };

  return (
    props.isFormModeOn && (
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, form, values }) => (
          <FormFullFields
            handleSubmit={handleSubmit}
            form={form}
            values={values}
            icons={props.icons}
            formFullUI={props.formFullUI}
            createLotId={props.createLotId}
          />
        )}
      />
    )
  );
};
