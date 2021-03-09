import { useState } from "react";
import { connect } from "react-redux";

import { Button } from "./Button/Button";
import { ButtonOutline } from "./Button/ButtonOutline";

import styles from "./demo.module.scss";

const Demo = (props) => {
  const [ctaActive, setCtaActive] = useState(false);
  const ctaHandler = () => setCtaActive(!ctaActive);

  const ctaTitle = ctaActive ? "Передумал" : "Есть что обменять";

  console.log(props);

  return (
    <>
      <div className={styles.row}>
        <Button
          width={220}
          height={56}
          title={ctaTitle}
          icon={props.icons.add}
          handler={ctaHandler}
          active={ctaActive}
          // disabled={true}
        />
        <Button
          width={56}
          height={56}
          icon={props.icons.add}
          handler={ctaHandler}
          active={ctaActive}
          // disabled={true}
        />
        <Button
          width={185}
          height={40}
          title={ctaTitle}
          handler={ctaHandler}
          active={ctaActive}
          // disabled={true}
        />
        <Button
          width={185}
          height={56}
          title={"Предложить"}
          // handler={ctaHandler}
          // active={ctaActive}
          // disabled={true}
        />
        <Button
          width={40}
          height={40}
          icon={props.icons.drafts}
          // handler={ctaHandler}
          // active={ctaActive}
          // disabled={true}
        />
      </div>
      <div className={styles.row}>
        <ButtonOutline
          width={220}
          height={56}
          title={ctaTitle}
          icon={props.icons.add}
          handler={ctaHandler}
          active={ctaActive}
          // disabled={true}
        />
        <ButtonOutline
          width={56}
          height={56}
          icon={props.icons.add}
          handler={ctaHandler}
          active={ctaActive}
        />
        <ButtonOutline
          width={185}
          height={40}
          title={ctaTitle}
          handler={ctaHandler}
          active={ctaActive}
        />
        <ButtonOutline width={185} height={56} title={"Предложить"} />
        <ButtonOutline width={40} height={40} icon={props.icons.drafts} />
      </div>
    </>
  );
};

const mstp = (state) => ({
  icons: state.ui.icons,
  firebase: state.auth.firebase,
  firestore: state.auth.firestore,
  fireauth: state.auth.fireauth,
});

export const DemoCont = connect(mstp, {})(Demo);
