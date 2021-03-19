import styles from "./statusbar.module.scss";

import offerspic from "../../../Assets/Icons/offers.svg";
import timepic from "../../../Assets/Icons/time.svg";

export const StatusBar = (props) => {
  const options = {
    // year: 'numeric',
    month: "long",
    day: "numeric",
    // hour: 'numeric',
    // minute: 'numeric',
    // second: 'numeric'
  };
  const date = new Date(props.expiryDate * 1000);
  return (
    <div className={styles.statusbar}>
      <div className={styles.offers}>
        <img src={offerspic} alt="O" />
        <p>{props.offersQty} предложений</p>
      </div>
      <div className={styles.timing}>
        <p>{date.toLocaleString("ru", options)}</p>
        <img src={timepic} alt="T" />
      </div>
    </div>
  );
};
