import { useState, useRef, useEffect } from "react";
import { Form, Field } from "react-final-form";
import { fst } from "../../../Utils/firebase";

import { Button } from "../../Components/Button/Button";
import { FormPhoto } from "../../Components/FormPhoto/FormPhoto";
import { FormPhotoLoading } from "../../Components/FormPhoto/FormPhoto";

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
  const photoCont = useRef(null);
  const [photoContW, setPhotoContW] = useState(null);
  const handlePhotoContW = () => setPhotoContW(photoCont.current.clientWidth);

  useEffect(() => {
    photoCont.current && handlePhotoContW();

    window.addEventListener("resize", handlePhotoContW);
    return () => {
      window.removeEventListener("resize", handlePhotoContW);
    };
  }, []);

  const [uploading, setUploading] = useState(false);

  const [photos, setPhotos] = useState([]);
  const photosHandler = (add) => setPhotos([...photos, add]);

  const removeImg = (urlToRemove) => {
    fst
      .refFromURL(urlToRemove)
      .delete()
      .then(() => setPhotos(photos.filter((url) => url !== urlToRemove)))
      .catch((error) => console.log(error));
  };

  const uploadImg = (file) => {
    const metadata = {
      cacheControl: "public,max-age=7200",
    };

    const uploadTask = fst
      .ref()
      .child(`offers/${lotID}/${createOfferId}/offer${photos.length}`)
      .put(file, metadata);

    uploadTask.on(
      "state_changed",
      (snap) => {
        snap.bytesTransferred === 0 && setUploading(true);
      },
      (error) => {
        console.log(error);
      },
      () => {
        uploadTask.snapshot.ref
          .getDownloadURL()
          .then((url) => photosHandler(url))
          .then(() => setUploading(false));
      }
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

        <div className={styles.photos} ref={photoCont}>
          {photos.length > 0 &&
            photos.map((photo) => (
              <FormPhoto
                key={photo}
                photo={photo}
                icon={icons.delete}
                removeImg={removeImg}
              />
            ))}

          {uploading && <FormPhotoLoading />}

          {photos.length < 5 && !uploading && (
            <Field
              name="photos"
              title="Добавить фото"
              uploadImg={uploadImg}
              component={PhotoFiles}
              labelSize={photoContW / 5 - 3.2}
              photos={photos}
            />
          )}
        </div>

        <div className={styles.buttons}>
          <Button width={217} height={56} title="Предложить обмен" />
        </div>
      </div>

      {/* <div className={styles.buttons}>
        <Button width={217} height={56} title="Предложить обмен" />
      </div> */}
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
