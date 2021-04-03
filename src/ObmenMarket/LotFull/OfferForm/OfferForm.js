import { useState } from "react";
import { Form, Field } from "react-final-form";
import { fb, fa } from "../../../Utils/firebase";

import { Button } from "../../Components/Button/Button";

import {
  required,
  minLength,
  combinedValidators,
  TextInput,
  Checkbox,
  // TextArea,
  PhotoFiles,
} from "../../Components/Inputs/Inputs";

import cloudtail from "../../../Assets/Icons/cloudtail.svg";

import styles from "./offerform.module.scss";

const OfferFormFields = ({
  icons,
  formOfferUI,
  newOfferMeta,
  lotMeta,
  lotID,
  authorID,
  handleSubmit,
  form,
}) => {
  const [photos, setPhotos] = useState([]);
  const photosHandler = (add) => setPhotos([...photos, add]);

  // const offersCount = lotMeta.offers ? Object.keys(lotMeta.offers).length : 0;

  const storage = fb.storage().ref();
  const offerUserID = fa.currentUser.uid;

  const uploadImg = (file) => {
    const uploadTask = storage
      .child(
        `posts/${authorID}/${lotID}/${offerUserID}/${newOfferMeta.offerID}/offer${photos.length}`
      )
      .put(file);

    uploadTask.on(
      "state_changed",
      (snap) => {},
      (error) => {},
      () =>
        uploadTask.snapshot.ref
          .getDownloadURL()
          .then((url) => photosHandler(url))
    );
  };

  return (
    <form className={styles.offer} onSubmit={handleSubmit}>
      <img className={styles.cloudtail} src={cloudtail} alt="tail" />

      <div className={styles.shape}>
        <div className={styles.title}>{formOfferUI.title}</div>

        <Field
          name="name"
          component={TextInput}
          validate={combinedValidators(required, minLength(5))}
          placeholder={formOfferUI.name.placeholder}
        />

        <Field
          name="description"
          component={TextInput}
          validate={combinedValidators(required, minLength(12))}
          placeholder={formOfferUI.description.placeholder}
        />

        <div className={styles.overprice}>
          <Field
            name="overprice"
            component={Checkbox}
            type="checkbox"
            initialValue={false}
          />
        </div>

        <div
          className={styles.photos}
          style={photos.length !== 0 ? { marginBottom: "16px" } : {}}
        >
          {photos.map((photo, i) => (
            <div className={styles.imgCont} key={i}>
              <img src={photo} alt="" draggable={false} />
              <div className={styles.delete}>{icons.delete}</div>
            </div>
          ))}
        </div>

        <div className={styles.addphotos}>
          <Field
            name="photos"
            title="Добавить фото"
            uploadImg={uploadImg}
            component={PhotoFiles}
          />
        </div>
      </div>

      <div className={styles.buttons}>
        <Button width={217} height={56} title="Предложить обмен" />
      </div>
    </form>
  );
};

export const OfferForm = ({
  formOfferUI,
  newOfferMeta,
  lotMeta,
  icons,
  createOffer,
  setIsOfferForm,
}) => {
  const onSubmit = (formData) => {
    createOffer(newOfferMeta.offerID, { ...newOfferMeta, ...formData });
    setIsOfferForm(false);
  };

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, form }) => (
        <OfferFormFields
          handleSubmit={handleSubmit}
          form={form}
          formOfferUI={formOfferUI}
          lotMeta={lotMeta}
          newOfferMeta={newOfferMeta}
          authorID={lotMeta.uid}
          lotID={lotMeta.postid}
          icons={icons}
        />
      )}
    />
  );
};
