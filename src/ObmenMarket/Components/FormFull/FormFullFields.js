import { Field } from "react-final-form";
import TextareaAutosize from "react-textarea-autosize";
import { Button } from "../Button/Button";

import cloudtail from "../../../Assets/Icons/cloudtail.svg";
import addphoto from "../../../Assets/Icons/success.svg";

import photo1 from "../../../Assets/Images/1.jpg";
import photo2 from "../../../Assets/Images/2.jpg";
import photo3 from "../../../Assets/Images/3.jpg";

import styles from "./formfull.module.scss";

export const FormFullFields = (props) => {
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
            <h2 className={styles.title}>Что вы хотите предложить к обмену?</h2>

            <Field
              name="lotname"
              component="input"
              placeholder="Укажите название"
            />

            <Field
              name="category"
              component="input"
              placeholder="Категории вашего лота"
            />

            <p className={styles.subinput}>
              Укажите через запятую категории, к которым относится ваше
              предложение
            </p>

            <Field
              name="overprice"
              component="input"
              placeholder="Примерная ценовая категория"
            />

            <p className={styles.subinput}>
              Так пользователям будет легче понимать во сколько вы оцениваете
              своё предложение, чтобы обмен был равноценным. Можно указать
              диапазон “от - до”.
            </p>
          </div>

          <div className={styles.pad}>
            <h2 className={styles.title} style={{ color: "transparent" }}>
              Что вы хотите предложить к обмену?
            </h2>

            {/* <Field name="description" component="textarea" placeholder="Описание" /> */}
            <Field name="description" placeholder="Описание">
              {(props) => (
                <TextareaAutosize
                  name={props.input.name}
                  placeholder="Описание"
                  maxRows={12}
                  value={props.input.value}
                  onChange={props.input.onChange}
                />
              )}
            </Field>

            <p className={styles.subinput}>
              Во время редактирования, выделите текст, который хотите сделать
              заголовком, жирным или ссылкой
            </p>

            <p className={styles.subtitle}>Загрузите фотографии:</p>

            <div className={styles.photos}>
              <img src={photo1} alt="" draggable={false} />
              <img src={photo2} alt="" draggable={false} />
              <img src={photo3} alt="" draggable={false} />
              <Field name="photos">
                {({ input: { value, onChange, ...input } }) => (
                  <>
                    <input
                      {...input}
                      type="file"
                      id="choosePhotos"
                      onChange={({ target }) => onChange(target.files)}
                    />
                    <label htmlFor="choosePhotos">
                      <img src={addphoto} alt="" draggable={false} />
                    </label>
                  </>
                )}
              </Field>
            </div>
          </div>

          <div className={styles.pad}>
            <h2 className={styles.title}>Что вы хотели бы получить взамен?</h2>

            <Field
              name="lotwWish"
              component="input"
              placeholder="Желаемые категории"
            />

            <p className={styles.subinput}>
              Укажите через запятую категории товаров, на которые вы готовы
              меняться
            </p>

            <Field
              name="addpayment"
              component="input"
              placeholder="Сумма доплаты"
            />

            <p className={styles.subinput}>
              Если будете готовы доплатить за что-то, укажите максимальную сумму
            </p>
          </div>
        </div>
      </div>
      <div className={styles.buttons}>
        <Button
          width={220}
          height={56}
          title="Опубликовать"
          icon={props.icons.success}
        />
      </div>
    </form>
  );
};
