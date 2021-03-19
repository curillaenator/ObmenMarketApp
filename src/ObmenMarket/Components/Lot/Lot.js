import { StatusBar } from "../StatusBar/StatusBar";

import lotpic from "../../../Assets/Images/lot.jpg";
import avapic from "../../../Assets/Images/ava.jpg";

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
