import { Form, Field } from "react-final-form";
import { Button } from "../Components/Button/Button";

import {
  required,
  minLength,
  combinedValidators,
  TextInput,
  TextArea,
  PhotoFiles,
} from "../Components/Inputs/Inputs";

import styles from "./profileedit.module.scss";

export const ProfileEdit = ({ icons, handleEdit }) => {
  const onSubmit = (formData) => {
    console.log(formData);
    handleEdit();
  };

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, form }) => {
        const onSave = (e) => {
          e.preventDefault();
          form.submit();
        };

        return (
          <form onSubmit={handleSubmit} className={styles.edit}>
            <div className={styles.container}>
              <div className={styles.photo}></div>

              <div className={styles.fields}>
                <Field
                  name="username"
                  component={TextInput}
                  //   validate={combinedValidators(required, minLength(5))}
                  //   placeholder={formUI.offer.name}
                  //   sub={formUI.offer.lotnameSub}
                />
              </div>
            </div>

            <div className={styles.buttons}>
              <Button
                width={220}
                height={56}
                title="Сохранить"
                icon={icons.success}
                handler={onSave}
              />
            </div>
          </form>
        );
      }}
    />
  );
};
