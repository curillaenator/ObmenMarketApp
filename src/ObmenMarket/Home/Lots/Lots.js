import { useState, useEffect } from "react";
import { Lot } from "../../Components/Lot/Lot";

import { postsRef } from "../../../Utils/firebase";

import styles from "./lots.module.scss";

export const Lots = ({ isFormModeOn }) => {
  const [lotList, setLotList] = useState([]);

  useEffect(() => {
    postsRef.once("value", (snapshot) => {
      setLotList(
        Object.keys(snapshot.val())
          .map((post) => snapshot.val()[post])
          .reverse()
      );
    });
  }, []); // сделать очистку слушателя

  return (
    !isFormModeOn && (
      <div className={styles.lots}>
        {lotList && lotList.map((l) => <Lot data={l} key={l.postid} />)}
      </div>
    )
  );
};
