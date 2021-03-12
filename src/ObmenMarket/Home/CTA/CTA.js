import { Button } from "../../Components/Button/Button";
import { Search } from "../../Components/Search/Search";

import styles from "./cta.module.scss";

export const Cta = (props) => {
  const { isFormModeOn, setFormMode } = props;
  const formModeHandler = () => setFormMode(!isFormModeOn);

  const ctaTitle = isFormModeOn ? "Передумал" : "Есть что обменять";
  const ctaMarginBottom = isFormModeOn ? { marginBottom: "13px" } : {};
  return (
    <div className={styles.cta} style={ctaMarginBottom}>
      <Button
        width={220}
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
