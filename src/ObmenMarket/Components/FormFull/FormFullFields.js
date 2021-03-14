import { Field } from "react-final-form";
import TextareaAutosize from "react-textarea-autosize";
import { Button } from "../Button/Button";
import { ButtonOutline } from "../Button/ButtonOutline";

import cloudtail from "../../../Assets/Icons/cloudtail.svg";
// import addphoto from "../../../Assets/Icons/add.svg";

import photo1 from "../../../Assets/Images/1.jpg";
import photo2 from "../../../Assets/Images/2.jpg";
import photo3 from "../../../Assets/Images/3.jpg";

import styles from "./formfull.module.scss";

const PhotoLoaded = (props) => {
  return (
    <div className={styles.imgCont} onClick={props.deletePhoto}>
      <img src={props.photo} alt="" draggable={false} />
      <div className={styles.delete}>
        {props.deleteIcon}
      </div>
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

export const FormFullFields = (props) => {
  const formUi = props.furmFullUi;
  const photoArr = true;
  const formDisplay = props.isFormModeOn ? {} : { display: "none" };

  const deletePhoto = () => console.log("delete");

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
              name="lotname"
              component="input"
              placeholder={formUi.offer.name}
            />

            <Field
              name="category"
              component="input"
              placeholder={formUi.offer.category}
            />

            <p className={styles.subinput}>{formUi.offer.categorySub}</p>

            <Field
              name="overprice"
              component="input"
              placeholder={formUi.offer.price}
            />

            <p className={styles.subinput}>{formUi.offer.priceSub}</p>

            <p className={styles.subtitle}>Загрузите фотографии:</p>

            <div className={styles.photos}>
              {photoArr && (
                <div className={styles.loaded}>
                  <PhotoLoaded
                    photo={photo1}
                    deletePhoto={deletePhoto}
                    deleteIcon={props.icons.delete}
                  />
                  <PhotoLoaded
                    photo={photo2}
                    deletePhoto={deletePhoto}
                    deleteIcon={props.icons.delete}
                  />
                  <PhotoLoaded
                    photo={photo3}
                    deletePhoto={deletePhoto}
                    deleteIcon={props.icons.delete}
                  />
                </div>
              )}

              <div className={styles.addPhoto}>
                <Field name="photos">
                  {({ input: { value, onChange, ...input } }) => {
                    // console.log(value);
                    return (
                      <>
                        <input
                          {...input}
                          type="file"
                          id="choosePhotos"
                          onChange={({ target }) => onChange(target.files)}
                        />
                        <label htmlFor="choosePhotos">Загрузить фото</label>
                      </>
                    );
                  }}
                </Field>
              </div>
            </div>
          </div>

          <div className={styles.pad}>
            <h2 className={styles.title}>{formUi.description.title}</h2>

            <Field name="description">
              {(props) => (
                <TextareaAutosize
                  name={props.input.name}
                  placeholder={formUi.description.description}
                  maxRows={12}
                  value={props.input.value}
                  onChange={props.input.onChange}
                />
              )}
            </Field>

            <p className={styles.subinput}>
              {formUi.description.descriptionSub}
            </p>
          </div>

          <div className={styles.pad}>
            <h2 className={styles.title}>{formUi.wish.title}</h2>

            <Field
              name="lotwWish"
              component="input"
              placeholder={formUi.wish.category}
            />

            <p className={styles.subinput}>{formUi.wish.categorySub}</p>

            <Field
              name="addpayment"
              component="input"
              placeholder={formUi.wish.addPayment}
            />

            <p className={styles.subinput}>{formUi.wish.addPaymentSub}</p>
          </div>
        </div>
      </div>
      <Buttons icons={props.icons} notation={formUi.notation} />
    </form>
  );
};
