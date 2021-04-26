import { Form } from "react-final-form";
import { FormFullFields } from "./FormFullFields";
// import { fa } from "../../../Utils/firebase";

export const FormFull = ({
  user,
  ownerID,
  createLotId,
  cloudtail,
  icons,
  formFullUI,
  lotID,
  lotMeta,
  lotPhotos,
  update,
  formHandler,
  setFormMode,
}) => {
  const onSubmit = (formData) => {
    delete formData.photos;

    const curDate = new Date();

    const initData = {
      uid: ownerID,
      postid: createLotId,
      username: user.username,
      avatar: user.avatar,
      publishedAt: new Date(),
      expireDate: new Date(curDate.setDate(curDate.getDate() + 7)),
    };

    if (!update) formHandler(lotID, { ...initData, ...formData });
    if (update) formHandler(lotID, { ...lotMeta, ...formData });
  };

  return (
    <Form
      initialValues={lotMeta ? lotMeta : {}}
      onSubmit={onSubmit}
      render={({ handleSubmit, form, values }) => (
        <FormFullFields
          cloudtail={cloudtail}
          handleSubmit={handleSubmit}
          lotPhotos={lotPhotos}
          form={form}
          values={values}
          icons={icons}
          formFullUI={formFullUI}
          lotID={lotID}
          ownerID={ownerID}
          update={update}
          setFormMode={setFormMode}
        />
      )}
    />
  );
};
