import { useState, useEffect, useRef } from "react";
import { fst, fa } from "../../../Utils/firebase";
import { Field } from "react-final-form";

import { Button } from "../Button/Button";
import { ButtonOutline } from "../Button/ButtonOutline";
import { FormPhoto } from "../FormPhoto/FormPhoto";
import { FormPhotoLoading } from "../FormPhoto/FormPhoto";

import {
  required,
  minLength,
  combinedValidators,
  TextInput,
  TextArea,
  PhotoFiles,
} from "../Inputs/Inputs";

import cloudtailpic from "../../../Assets/Icons/cloudtail.svg";

import styles from "./formfull.module.scss";

// Components

const Buttons = ({
  icons,
  notation,
  update,
  formSubmit,
  formSubmitDraft,
  formSubmitUpdate,
  formSubmitCancel,
}) => {
  return (
    <div className={styles.buttons}>
      {!update && (
        <>
          <Button
            width={220}
            height={56}
            title="Опубликовать"
            icon={icons.success}
            handler={formSubmit}
          />

          <ButtonOutline
            width={220}
            height={56}
            title="Сохранить черновик"
            icon={icons.drafts}
            handler={formSubmitDraft}
          />
        </>
      )}

      {update && (
        <>
          <Button
            width={220}
            height={56}
            title="Сохранить"
            icon={icons.success}
            handler={formSubmitUpdate}
          />

          <ButtonOutline
            width={220}
            height={56}
            title="Отмена"
            icon={icons.drafts}
            handler={formSubmitCancel}
          />
        </>
      )}

      {!update && <p>{notation}</p>}
    </div>
  );
};

// Main form
export const FormFullFields = ({
  cloudtail,
  lotPhotos,
  update,
  setFormMode,
  form,
  ...props
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

  const uid = fa.currentUser.uid;

  const [uploading, setUploading] = useState(false);

  const [photos, setPhotos] = useState([]);
  const photosHandler = (add) => setPhotos([...photos, add]);

  useEffect(() => lotPhotos && setPhotos(lotPhotos), [lotPhotos]);

  const formSubmit = (e) => {
    e.preventDefault();
    form.change("photos", null);
    form.change("draft", false);
    form.change("published", true);
    form.submit();
  };

  const formSubmitDraft = (e) => {
    e.preventDefault();
    form.change("photos", null);
    form.change("draft", true);
    form.change("published", false);
    form.submit();
  };

  const formSubmitUpdate = (e) => {
    e.preventDefault();
    form.change("photos", null);
    form.submit();
  };

  const formSubmitCancel = (e) => {
    e.preventDefault();
    setFormMode(false);
  };

  const removeImg = (urlToRemove) => {
    fst
      .refFromURL(urlToRemove)
      .delete()
      .then(() => setPhotos(photos.filter((url) => url !== urlToRemove)))
      .catch((error) => console.log(error));
  };

  const uploadImg = (file) => {
    const metadata = {
      cacheControl: "public,max-age=3600",
    };

    const uploadTask = fst
      .ref()
      .child("posts/" + uid + "/" + props.lotID + "/photo" + photos.length)
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

  const formUI = props.formFullUI;

  return (
    <form onSubmit={props.handleSubmit} className={styles.formfull}>
      {cloudtail && (
        <img className={styles.cloudtail} src={cloudtailpic} alt="tail" />
      )}
      <div className={styles.shape}>
        <div className={styles.fields}>
          <div className={styles.pad}>
            <h2 className={styles.title}>{formUI.offer.title}</h2>

            <Field
              name="title"
              component={TextInput}
              validate={combinedValidators(required, minLength(5))}
              placeholder={formUI.offer.name}
              sub={formUI.offer.lotnameSub}
            />

            <Field
              name="categories"
              component={TextInput}
              validate={required}
              placeholder={formUI.offer.category}
              sub={formUI.offer.categorySub}
            />

            <Field
              name="price"
              component={TextInput}
              placeholder={formUI.offer.price}
              sub={formUI.offer.priceSub}
            />

            <div className={styles.photos}>
              <p className={styles.photos_title}>Фотографии:</p>

              <div className={styles.photos_loaded} ref={photoCont}>
                {photos.length > 0 &&
                  photos.map((p, i) => (
                    <FormPhoto
                      key={p}
                      photo={p}
                      icon={props.icons.delete}
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
            </div>
          </div>

          <div className={styles.pad}>
            <h2 className={styles.title}>{formUI.description.title}</h2>

            <Field
              name="description"
              component={TextArea}
              validate={combinedValidators(required, minLength(15))}
              maxRows={12}
              placeholder={formUI.description.description}
              sub={formUI.description.descriptionSub}
            />
          </div>

          <div className={styles.pad}>
            <h2 className={styles.title}>{formUI.wish.title}</h2>

            <Field
              name="wishes"
              component={TextInput}
              placeholder={formUI.wish.category}
              sub={formUI.wish.categorySub}
            />

            <Field
              name="overprice"
              component={TextInput}
              placeholder={formUI.wish.addPayment}
              sub={formUI.wish.addPaymentSub}
            />

            <div className={styles.hidenfields}>
              <Field name="draft" component="input" type="checkbox" />

              <Field name="published" component="input" type="checkbox" />
            </div>
          </div>
        </div>
      </div>

      <Buttons
        icons={props.icons}
        notation={formUI.notation}
        formSubmit={formSubmit}
        formSubmitDraft={formSubmitDraft}
        formSubmitUpdate={formSubmitUpdate}
        formSubmitCancel={formSubmitCancel}
        update={update}
      />
    </form>
  );
};
