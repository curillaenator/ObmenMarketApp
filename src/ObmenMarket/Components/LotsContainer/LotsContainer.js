import { useState, useEffect } from "react";
import { Lot } from "../Lot/Lot";

import { postsRef } from "../../../Utils/firebase";

import styles from "./lots.module.scss";

// UTILS

const lotListObjToArr = (snapshot) => {
  return Object.keys(snapshot)
    .map((lot) => snapshot[lot])
    .reverse();
};

const lotListAll = (setListToRender) => {
  postsRef
    .orderByChild("published")
    .equalTo(true)
    .once("value", (snapshot) =>
      setListToRender(lotListObjToArr(snapshot.val()))
    );
};

const lotListPublishedByUser = (matchedID, setLotList) => {
  postsRef
    .orderByChild("uid")
    .equalTo(matchedID)
    .once("value", (snapshot) => setLotList(lotListObjToArr(snapshot.val())));
};

// COMPONENT

export const LotsContainer = ({
  isFormModeOn,
  toRender,
  matchedID,
  selected,
}) => {
  const [lotList, setLotList] = useState([]);
  const [listToRender, setListToRender] = useState([]);

  useEffect(() => {
    toRender === "all" && lotListAll(setListToRender);
    toRender === "profile" && lotListPublishedByUser(matchedID, setLotList);
  }, [toRender, matchedID]); // сделать очистку слушателя

  useEffect(() => {
    selected === "published" &&
      setListToRender(lotList.filter((lot) => lot.published));
    selected === "drafts" &&
      setListToRender(lotList.filter((lot) => lot.draft));
  }, [selected, lotList]);

  return (
    !isFormModeOn && (
      <div className={styles.lots}>
        {listToRender &&
          listToRender.map((l) => <Lot data={l} key={l.postid} />)}
      </div>
    )
  );
};
