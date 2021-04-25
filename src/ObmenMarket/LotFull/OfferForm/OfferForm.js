import { useState } from "react";
import { Form, Field } from "react-final-form";
import { fb } from "../../../Utils/firebase";

import { Button } from "../../Components/Button/Button";

import {
  required,
  minLength,
  combinedValidators,
  TextInput,
  Checkbox,
  TextArea,
  PhotoFiles,
} from "../../Components/Inputs/Inputs";

import cloudtail from "../../../Assets/Icons/cloudtail.svg";

import styles from "./offerform.module.scss";

const OfferFormFields = ({
  icons,
  formOfferUI,
  createOfferId,
  lotID,
  handleSubmit,
  form,
}) => {
  const [photos, setPhotos] = useState([]);
  const photosHandler = (add) => setPhotos([...photos, add]);

  const storage = fb.storage().ref();

  const uploadImg = (file) => {
    const metadata = {
      cacheControl: "public,max-age=7200",
    };

    const uploadTask = storage
      .child(`offers/${lotID}/${createOfferId}/offer${photos.length}`)
      .put(file, metadata);

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
          component={TextArea}
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
  ownerID,
  user,
  formOfferUI,
  lotMeta,
  icons,
  createOffer,
  createOfferId,
  setIsOfferForm,
}) => {
  console.log(ownerID, user, createOfferId);

  const onSubmit = (formData) => {
    const offerInitial = {
      avatar: user.avatar,
      authorName: user.username,
      offerID: createOfferId,
      authorID: ownerID,
      photospath: `/offers/${lotMeta.postid}/${createOfferId}`,
    };

    createOffer(lotMeta, { ...offerInitial, ...formData });
    setIsOfferForm(false);
  };

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, form }) => (
        <OfferFormFields
          icons={icons}
          formOfferUI={formOfferUI}
          lotID={lotMeta.postid}
          createOfferId={createOfferId}
          handleSubmit={handleSubmit}
          form={form}
        />
      )}
    />
  );
};
