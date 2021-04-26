import { useState, useEffect } from "react";
import { fst } from "../../../Utils/firebase";
import { Field } from "react-final-form";

import { FormDropzone } from "../FormDropzone/FormDropzone";
import { Button } from "../Button/Button";
import { ButtonOutline } from "../Button/ButtonOutline";

import {
  required,
  fileRequired,
  minLength,
  combinedValidators,
  TextInput,
  TextArea,
  UploadCheck,
} from "../Inputs/Inputs";

import cloudtailpic from "../../../Assets/Icons/cloudtail.svg";

import styles from "./formfull.module.scss";

// Components

const Buttons = ({
  icons,
  notation,
  isUploading,
  update,
  formSubmit,
  formSubmitDraft,
  formSubmitUpdate,
  formSubmitCancel,
}) => {
  const commonProps = {
    width: 220,
    height: 56,
    loader: isUploading,
    disabled: isUploading,
  };

  return (
    <div className={styles.buttons}>
      {!update && (
        <>
          <Button
            {...commonProps}
            title={isUploading ? "Загрузка..." : "Опубликовать"}
            icon={icons.success}
            handler={formSubmit}
          />

          <ButtonOutline
            {...commonProps}
            title={isUploading ? "Загрузка..." : "Сохранить черновик"}
            icon={icons.drafts}
            handler={formSubmitDraft}
          />
        </>
      )}

      {update && (
        <>
          <Button
            {...commonProps}
            title={isUploading ? "Загрузка..." : "Сохранить"}
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
  lotID,
  ownerID,
  lotPhotos,
  update,
  setFormMode,
  form,
  ...props
}) => {
  const [uploads, setUploads] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    form.change("uploaded", uploads.length);
  }, [form, uploads]);

  const uploadImg = (file, num) => {
    return new Promise((resolve) => {
      const metadata = {
        cacheControl: "public,max-age=7200",
      };

      const uploadTask = fst
        .ref()
        .child(`posts/${ownerID}/${lotID}/photo${num}`)
        .put(file, metadata);

      uploadTask.on(
        "state_changed",
        (snap) => {}, // progress
        (error) => console.log(error), // error
        () => resolve(true) // complete
      );
    });
  };

  const submitBase = () => {
    form.submit();
    setUploads([]);
    form.reset();
  };

  const formSubmit = () => {
    form.change("draft", false);
    form.change("published", true);
    submitBase();
  };

  const formSubmitDraft = () => {
    form.change("draft", true);
    form.change("published", false);
    submitBase();
  };

  const formSubmitUpdate = () => submitBase();

  const formSubmitCancel = () => setFormMode(false);

  const onSubmitClick = (e, submitFunc) => {
    e.preventDefault();

    const uploadHandler = () => {
      setIsUploading(true);

      const uplComlete = uploads.map((blob, num) => uploadImg(blob, num));

      Promise.all(uplComlete).then(() => {
        setIsUploading(false);
        submitFunc();
      });
    };

    form.getState().valid ? uploadHandler() : form.submit();
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
              <FormDropzone uploads={uploads} setUploads={setUploads} />

              <Field
                name="uploaded"
                component={UploadCheck}
                type="number"
                validate={fileRequired}
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
              <Field name="draft" component="input" type="checkbox" />

              <Field name="published" component="input" type="checkbox" />
            </div>
          </div>
        </div>
      </div>

      <Buttons
        icons={props.icons}
        notation={formUI.notation}
        isUploading={isUploading}
        formSubmit={(e) => onSubmitClick(e, formSubmit)}
        formSubmitDraft={(e) => onSubmitClick(e, formSubmitDraft)}
        formSubmitUpdate={(e) => onSubmitClick(e, formSubmitUpdate)}
        formSubmitCancel={formSubmitCancel}
        update={update}
      />
    </form>
  );
};
