import { connect } from "react-redux";
import { Button } from "../../Components/Button/Button";
import { Search } from "../../Components/Search/Search";

import { setFormMode } from "../../../Redux/Reducers/home";

import styles from "./cta.module.scss";

const Cta = (props) => {
  const { isFormModeOn, setFormMode } = props;
  const ctaTitle = isFormModeOn ? "Передумал" : "Есть что обменять";
  return (
    <div className={styles.cta}>
      <Button
        width={220}
        height={56}
        title={ctaTitle}
        icon={props.icons.add}
        active={isFormModeOn}
        handler={setFormMode}
      />
      <Search icon={props.icons.search} />
    </div>
  );
};

const mstp = (state) => ({
  icons: state.ui.icons,
  isFormModeOn: state.home.isFormModeOn,
});

export const CtaCont = connect(mstp, { setFormMode })(Cta);
