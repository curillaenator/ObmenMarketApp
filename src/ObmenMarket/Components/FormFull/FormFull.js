import { Form } from "react-final-form";
import { FormFullFields } from "./FormFullFields";

export const FormFull = ({
  icons,
  formFullUI,
  lotID,
  lotMeta,
  lotPhotos,
  formHandler,
}) => {
  // console.log(currentLotMeta);

  const onSubmit = (formData) => {
    delete formData.photos;

    const curDate = new Date();

    const updData = {
      acceptedOffer: "",
      offersQty: 0,
      publishedAt: new Date(),
      expireDate: new Date(curDate.setDate(curDate.getDate() + 7)),
    };

    // console.log({ ...formData, ...updData });
    formHandler(lotID, { ...formData, ...updData });
  };

  return (
    <Form
      initialValues={lotMeta ? lotMeta : {}}
      onSubmit={onSubmit}
      render={({ handleSubmit, form, values }) => (
        <FormFullFields
          handleSubmit={handleSubmit}
          lotPhotos={lotPhotos}
          form={form}
          values={values}
          icons={icons}
          formFullUI={formFullUI}
          lotID={lotID}
        />
      )}
    />
  );
};
