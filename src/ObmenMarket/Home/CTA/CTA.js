import { Button } from "../../Components/Button/Button";
import { Search } from "../../Components/Search/Search";

import mask from "../../../Assets/Masks/buttonForm.svg";

import styles from "./cta.module.scss";

export const Cta = (props) => {
  const { isFormModeOn, setFormMode } = props;
  const formModeHandler = () => setFormMode(!isFormModeOn);

  const ctaTitle = isFormModeOn ? "Передумал" : "Есть что обменять";
  const ctaMarginBottom = isFormModeOn ? { marginBottom: "13px" } : {};
  return (
    <div className={styles.cta} style={ctaMarginBottom}>
      <div className={styles.andrey}>
        <img src={mask} alt="" />
      </div>
      <Button
        width={217}
        height={56}
        title={ctaTitle}
        icon={props.icons.add}
        active={isFormModeOn}
        handler={formModeHandler}
      />
      <Search icon={props.icons.search} />
    </div>
  );
};
