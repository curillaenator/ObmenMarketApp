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

import photo1 from "../../../Assets/Images/1.jpg";
import photo2 from "../../../Assets/Images/2.jpg";
import photo3 from "../../../Assets/Images/3.jpg";

import styles from "./formfull.module.scss";

// Components
const PhotosCont = (props) => {
  const deletePhoto = () => console.log("delete");
  return (
    <div className={styles.loaded}>
      {props.photos.map((p, i) => (
        <div className={styles.imgCont} onClick={deletePhoto} key={i}>
          <img src={p} alt="" draggable={false} />
          <div className={styles.delete}>{props.icons.delete}</div>
        </div>
      ))}
    </div>
  );
};

const Buttons = (props) => {
  return (
    <div className={styles.buttons}>
      <Button
        width={220}
        height={56}
        title="Опубликовать"
        icon={props.icons.success}
      />
      <ButtonOutline
        width={220}
        height={56}
        title="Сохранить черновик"
        icon={props.icons.drafts}
      />
      <p>{props.notation}</p>
    </div>
  );
};

// Main form
export const FormFullFields = (props) => {
  const formUi = props.furmFullUi;
  const photos = [photo1, photo2, photo3];
  const formDisplay = props.isFormModeOn ? {} : { display: "none" };

  return (
    <form
      onSubmit={props.handleSubmit}
      className={styles.formfull}
      style={formDisplay}
    >
      <img className={styles.cloudtail} src={cloudtail} alt="tail" />
      <div className={styles.shape}>
        <div className={styles.fields}>
          <div className={styles.pad}>
            <h2 className={styles.title}>{formUi.offer.title}</h2>

            <Field
              name="title"
              component={TextInput}
              validate={combinedValidators(required, minLength(5))}
              placeholder={formUi.offer.name}
              sub={formUi.offer.lotnameSub}
            />

            <Field
              name="categories"
              component={TextInput}
              validate={required}
              placeholder={formUi.offer.category}
              sub={formUi.offer.categorySub}
            />

            <Field
              name="price"
              component={TextInput}
              placeholder={formUi.offer.price}
              sub={formUi.offer.priceSub}
            />

            <div className={styles.photos}>
              <p className={styles.subtitle}>Фотографии:</p>

              {photos.length > 0 && (
                <PhotosCont photos={photos} icons={props.icons} />
              )}

              <Field
                name="photos"
                title="Добавить фото"
                component={PhotoFiles}
              />
            </div>
          </div>

          <div className={styles.pad}>
            <h2 className={styles.title}>{formUi.description.title}</h2>

            <Field
              name="description"
              component={TextArea}
              validate={combinedValidators(required, minLength(15))}
              maxRows={12}
              placeholder={formUi.description.description}
              sub={formUi.description.descriptionSub}
            />
          </div>

          <div className={styles.pad}>
            <h2 className={styles.title}>{formUi.wish.title}</h2>

            <Field
              name="wishes"
              component={TextInput}
              placeholder={formUi.wish.category}
              sub={formUi.wish.categorySub}
            />

            <Field
              name="overprice"
              component={TextInput}
              placeholder={formUi.wish.addPayment}
              sub={formUi.wish.addPaymentSub}
            />
          </div>
        </div>
      </div>

      <Buttons icons={props.icons} notation={formUi.notation} />
    </form>
  );
};
