import lotpic from "../../../Assets/Images/lot.jpg";
import avapic from "../../../Assets/Images/ava.jpg";

import offerspic from "../../../Assets/Icons/offers.svg";
import timepic from "../../../Assets/Icons/time.svg";

import styles from "./lot.module.scss";

const Owner = (props) => {
  return (
    <div className={styles.owner}>
      <img src={props.avatar} alt={props.username} draggable="false" />
      <p>{props.ownerName}</p>
    </div>
  );
};

const LotImage = (props) => {
  return (
    <div className={styles.photo}>
      <img src={props.lotImage} alt={props.lotName} draggable="false" />
    </div>
  );
};

const StatusBar = (props) => {
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

export const Lot = ({ data }) => {
  return (
    <div className={styles.lot}>
      <Owner avatar={avapic} ownerName={"Кирилл Арт"} />

      <div className={styles.content}>
        <LotImage lotImage={lotpic} lotnName={data.title} />

        <div className={styles.title}>{data.title}</div>

        <div className={styles.description}>{data.description}</div>

        <StatusBar offersQty={5} expiryDate={data.expireDate.seconds} />
      </div>
    </div>
  );
};
