import { Form } from "react-final-form";
import { useHistory } from "react-router-dom";

import { FormFullFields } from "./FormFullFields";

export const FormFull = ({
  user,
  ownerID,
  createLotId,
  cloudtail,
  icons,
  formFullUI,
  lotMeta,
  update = false,
  formHandler,
  setFormMode,
}) => {
  const history = useHistory();

  const onSubmit = (formData) => {
    delete formData.uploaded;

    if (!update) {
      const curDate = new Date();

      const initData = {
        uid: ownerID,
        postid: createLotId,
        username: user.username,
        avatar: user.avatar,
        publishedAt: new Date(),
        expireDate: new Date(curDate.setDate(curDate.getDate() + 7)),
      };

      return formHandler({ ...initData, ...formData }, history);
    }

    if (update) {
      return formHandler({ ...lotMeta, ...formData }, history);
    }
  };

  return (
    <Form
      initialValues={lotMeta ? lotMeta : {}}
      onSubmit={onSubmit}
      render={({ handleSubmit, form, values }) => (
        <FormFullFields
          cloudtail={cloudtail}
          handleSubmit={handleSubmit}
          lotPhotos={lotMeta ? lotMeta.photoLinks : null}
          form={form}
          values={values}
          icons={icons}
          formUI={formFullUI}
          lotID={lotMeta ? lotMeta.postid : createLotId}
          ownerID={ownerID}
          update={update}
          setFormMode={setFormMode}
        />
      )}
    />
  );
};
