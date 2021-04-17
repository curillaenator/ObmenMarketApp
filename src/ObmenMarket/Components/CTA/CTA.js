import { Button } from "../Button/Button";
import { Search } from "../Search/Search";

import styles from "./cta.module.scss";

export const Cta = ({
  isAuth,
  isFormModeOn,
  setFormMode,
  icons,
  createLotId,
  onLotCreateFromForm,
  onLotCreateFormCancel,
}) => {
  const formModeHandlerUnauthed = () => setFormMode(!isFormModeOn);

  const formModeHandlerAuthed = () => {
    !isFormModeOn ? onLotCreateFromForm() : onLotCreateFormCancel(createLotId);
    setFormMode(!isFormModeOn);
  };

  const ctaTitle = isFormModeOn ? "Передумал" : "Создать объявление";
  const ctaIcon = isFormModeOn ? icons.add : icons.pencil;
  const ctaMarginBottom = isFormModeOn ? { marginBottom: "13px" } : {};
  return (
    <div className={styles.cta} style={ctaMarginBottom}>
      <div className={styles.button}>
        <Button
          width={226}
          height={56}
          title={ctaTitle}
          icon={ctaIcon}
          active={isFormModeOn}
          handler={isAuth ? formModeHandlerAuthed : formModeHandlerUnauthed}
        />
      </div>
      <Search icon={icons.search} />
    </div>
  );
};
