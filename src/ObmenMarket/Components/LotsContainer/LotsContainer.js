import { useState, useEffect } from "react";
import { Lot } from "../Lot/Lot";

import { postsRef } from "../../../Utils/firebase";

import styles from "./lots.module.scss";

export const LotsContainer = ({ isFormModeOn, toRender, matchedID }) => {
  const [lotList, setLotList] = useState([]);

  useEffect(() => setLotList([]), [toRender]);

  const handleSetLotList = (snapshot) =>
    snapshot &&
    setLotList(
      Object.keys(snapshot)
        .map((lot) => snapshot[lot])
        .reverse()
    );

  const lotListAll = () =>
    postsRef.once("value", (snapshot) => handleSetLotList(snapshot.val()));

  const lotListPublishedByUser = () => {
    postsRef
      .orderByChild("uid")
      .equalTo(matchedID)
      .once("value", (snapshot) => handleSetLotList(snapshot.val()));
  };

  useEffect(() => {
    toRender === "all" && lotListAll();
    toRender === "published" && lotListPublishedByUser();
  }, [toRender]); // сделать очистку слушателя

  return (
    !isFormModeOn && (
      <div className={styles.lots}>
        {lotList && lotList.map((l) => <Lot data={l} key={l.postid} />)}
      </div>
    )
  );
};
