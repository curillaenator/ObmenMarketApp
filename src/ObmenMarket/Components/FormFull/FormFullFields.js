import { useState, useEffect } from "react";
import { fb, fa } from "../../../Utils/firebase";
import { Field } from "react-final-form";

import { Button } from "../Button/Button";
import { ButtonOutline } from "../Button/ButtonOutline";

import {
  required,
  minLength,
  combinedValidators,
  TextInput,
  TextArea,
  PhotoFiles,
} from "../Inputs/Inputs";

import cloudtail from "../../../Assets/Icons/cloudtail.svg";

import styles from "./formfull.module.scss";

// Components
const PhotosCont = ({ photos, icons }) => {
  const deletePhoto = () => console.log("delete");
  return (
    <div className={styles.loaded}>
      {photos.map((p, i) => (
        <div className={styles.imgCont} onClick={deletePhoto} key={i}>
          <img src={p} alt="" draggable={false} />
          <div className={styles.delete}>{icons.delete}</div>
        </div>
      ))}
    </div>
  );
};

const Buttons = ({
  icons,
  notation,
  update,
  formSubmit,
  formSubmitDraft,
  formSubmitUpdate,
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
        <Button
          width={220}
          height={56}
          title="Сохранить"
          icon={icons.success}
          handler={formSubmitUpdate}
        />
      )}

      {!update && <p>{notation}</p>}
    </div>
  );
};

// Main form
export const FormFullFields = ({ lotPhotos, update, ...props }) => {
  // console.log(props.form);

  const uid = fa.currentUser.uid;

  const [photos, setPhotos] = useState([]);
  const photosHandler = (add) => setPhotos([...photos, add]);

  useEffect(() => lotPhotos && setPhotos(lotPhotos), [lotPhotos]);

  const formSubmit = (e) => {
    e.preventDefault();
    props.form.change("photos", null);
    props.form.change("draft", false);
    props.form.change("published", true);
    props.form.submit();
  };

  const formSubmitDraft = (e) => {
    e.preventDefault();
    props.form.change("photos", null);
    props.form.change("draft", true);
    props.form.change("published", false);
    props.form.submit();
  };

  const formSubmitUpdate = (e) => {
    e.preventDefault();
    props.form.change("photos", null);
    props.form.submit();
  };

  const storage = fb.storage().ref();

  const uploadImg = (file) => {
    const uploadTask = storage
      .child("posts/" + uid + "/" + props.lotID + "/photo" + photos.length)
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

  const formUI = props.formFullUI;

  return (
    <form onSubmit={props.handleSubmit} className={styles.formfull}>
      <img className={styles.cloudtail} src={cloudtail} alt="tail" />
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
              <p className={styles.subtitle}>Фотографии:</p>

              {photos.length > 0 && (
                <PhotosCont photos={photos} icons={props.icons} />
              )}

              <Field
                name="photos"
                title="Добавить фото"
                uploadImg={uploadImg}
                component={PhotoFiles}
              />
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
              <Field
                name="draft"
                component="input"
                type="checkbox"
                // initialValue="true"
              />

              <Field
                name="published"
                component="input"
                type="checkbox"
                // initialValue="false"
              />
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
        update={update}
      />
    </form>
  );
};
