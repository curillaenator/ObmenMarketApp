import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import Resizer from "react-image-file-resizer";

import styles from "./inputs.module.scss";

// Validators
export const required = (value) => (value ? undefined : "*обязательное поле");

export const minLength = (min) => (value) =>
  value && value.length < min ? `*не меньше ${min} символов` : undefined;

export const fileRequired = (value) =>
  value !== 0 && value ? undefined : "*минимум 1 фото";

export const combinedValidators = (...validators) => (value) =>
  validators.reduce((err, val) => err || val(value), undefined);

// Inputs
export const TextInput = ({ input, meta, classN = "textinput", ...props }) => {
  const error = meta.touched && meta.error;

  const errorStyle = () => {
    if (classN === "textinput") return { borderBottom: "1px solid #f2002c" };
    if (classN === "message") return { border: "1px solid #f2002c" };
  };

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
        className={styles[classN]}
        style={error ? errorStyle() : {}}
      />

      {!error && <div className={styles.sub}>{props.sub}</div>}

      {error && <p className={`${styles.sub} ${styles.error}`}>{meta.error}</p>}
    </div>
  );
};

export const TextArea = ({ input, meta, classN = "textarea", ...props }) => {
  const error = meta.touched && meta.error;

  const errorStyle = () => {
    if (classN === "textarea") return { borderBottom: "1px solid #f2002c" };
    if (classN === "message") return { border: "1px solid #f2002c" };
  };

  return (
    <div className={styles.input}>
      <TextareaAutosize
        {...input}
        {...props}
        onChange={input.onChange}
        className={styles[classN]}
        style={error ? errorStyle() : {}}
      />
      {!error && <p className={styles.sub}>{props.sub}</p>}
      {error && <p className={`${styles.sub} ${styles.error}`}>{meta.error}</p>}
    </div>
  );
};

export const PhotoFiles = ({
  input: { value, onChange, ...input },
  meta,
  labelSize,
  photos,
  ...props
}) => {
  const labelStyle = {
    width: labelSize,
    height: labelSize,
    marginLeft: photos.length > 0 ? "4px" : "0px",
  };

  const resizedFile = (file) =>
    new Promise((resolve) =>
      Resizer.imageFileResizer(
        file,
        1440,
        1440,
        "JPEG",
        60,
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
        multiple
        accept="image"
        id="choosePhotos"
        onChange={({ target }) => {
          // console.log(target.files);
          resizedFile(target.files[0]);
        }}
      />

      <label
        className={styles.photofilesLabel}
        htmlFor="choosePhotos"
        style={labelStyle}
      ></label>
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
        <input type="checkbox" id="agreetooverpay" {...input} />
        <label htmlFor="agreetooverpay" onClick={labelHandle}>
          {labelText}
        </label>
      </div>
    </div>
  );
};

export const UploadCheck = ({ input, meta, ...props }) => {
  const error = meta.touched && meta.error;

  return (
    <div className={styles.input}>
      <input {...input} {...props} className={styles.uploadcheck} />

      {error && <p className={`${styles.sub} ${styles.error}`}>{meta.error}</p>}
    </div>
  );
};
