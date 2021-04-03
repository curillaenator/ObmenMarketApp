import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import Resizer from "react-image-file-resizer";

// import addphoto from "../../../Assets/Icons/add_photo.svg";

import styles from "./inputs.module.scss";

// Validators
export const required = (value) => (value ? undefined : "*обязательное поле");

export const minLength = (min) => (value) =>
  value && value.length < min ? `*не меньше ${min} символов` : undefined;

export const combinedValidators = (...validators) => (value) =>
  validators.reduce((err, val) => err || val(value), undefined);

// Inputs
export const TextInput = ({ input, meta, ...props }) => {
  const error = meta.touched && meta.error;

  return (
    <div className={styles.input}>
      {props.sup && (
        <div className={styles.sup}>
          <img src={props.supicon} alt={props.sup} />
          <p>{props.sup}</p>
        </div>
      )}

      <input
        {...input}
        {...props}
        className={styles.textinput}
        style={error ? { borderBottom: "1px solid #f2002c" } : {}}
      />

      {!error && <div className={styles.sub}>{props.sub}</div>}

      {error && <p className={`${styles.sub} ${styles.error}`}>{meta.error}</p>}
    </div>
  );
};

export const TextArea = ({ input, meta, ...props }) => {
  const error = meta.touched && meta.error;
  return (
    <div className={styles.input}>
      <TextareaAutosize
        {...input}
        {...props}
        onChange={input.onChange}
        className={styles.textarea}
        style={error ? { borderBottom: "1px solid #f2002c" } : {}}
      />
      {!error && <p>{props.sub}</p>}
      {error && <p className={styles.error}>{meta.error}</p>}
    </div>
  );
};

export const PhotoFiles = ({
  input: { value, onChange, ...input },
  meta,
  ...props
}) => {
  const resizedFile = (file) =>
    new Promise((resolve) =>
      Resizer.imageFileResizer(
        file,
        1280,
        720,
        "JPEG",
        40,
        0,
        (resized) => props.uploadImg(resized),
        "file"
      )
    );

  return (
    <div className={styles.input}>
      <input
        className={styles.photofiles}
        {...input}
        type="file"
        id="choosePhotos"
        onChange={({ target }) => {
          resizedFile(target.files[0]);
        }}
      />
      <label className={styles.photofilesLabel} htmlFor="choosePhotos">
        {props.title}
      </label>
    </div>
  );
};

export const Checkbox = ({ input, meta, ...props }) => {
  const [label, setLabel] = useState(false);
  const labelHandle = () => setLabel(!label);

  const labelText = label
    ? "Cогласен/согласна на доплату при обмене"
    : "Согласны на доплату при обмене?";

  return (
    <div className={styles.input}>
      <div className={styles.checkbox}>
        <input type="checkbox" id="agreetooverpay" {...input} {...props} />
        <label htmlFor="agreetooverpay" onClick={labelHandle}>
          {labelText}
        </label>
      </div>
    </div>
  );
};
