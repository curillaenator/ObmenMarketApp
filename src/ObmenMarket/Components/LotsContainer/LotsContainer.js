import { useState, useEffect } from "react";
import { Lot } from "../Lot/Lot";

import { postsRef } from "../../../Utils/firebase";

import styles from "./lotscontainer.module.scss";

// UTILS

const lotListObjToArr = (snapshot) => {
  if (!snapshot) return [];
  return Object.keys(snapshot)
    .map((lot) => snapshot[lot])
    .reverse();
};

const lotListAll = (setListToRender) => {
  postsRef
    .orderByChild("published")
    .equalTo(true)
    .once("value", (snapshot) => {
      setListToRender(lotListObjToArr(snapshot.val()));
    });
};

const lotListPublishedByUser = (matchedID, setLotList) => {
  postsRef
    .orderByChild("uid")
    .equalTo(matchedID)
    .once("value", (snapshot) => {
      setLotList(lotListObjToArr(snapshot.val()));
    });
};

// COMPONENT

export const LotsContainer = ({ toRender, matchedID, selected }) => {
  const [lotList, setLotList] = useState([]);
  const [listToRender, setListToRender] = useState([]);

  // console.log(listToRender);

  useEffect(() => {
    toRender === "all" && lotListAll(setListToRender);
    toRender === "profile" && lotListPublishedByUser(matchedID, setLotList);
  }, [toRender, matchedID]);

  useEffect(() => {
    selected === "published" &&
      lotList.length !== 0 &&
      setListToRender(lotList.filter((lot) => lot.published));
    selected === "drafts" &&
      lotList.length !== 0 &&
      setListToRender(lotList.filter((lot) => lot.draft));
  }, [selected, lotList]);

  return (
    <div className={styles.lots}>
      {listToRender && listToRender.map((l) => <Lot data={l} key={l.postid} />)}
    </div>
  );
};
