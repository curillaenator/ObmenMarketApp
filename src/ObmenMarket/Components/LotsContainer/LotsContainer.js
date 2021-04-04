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

const lotListAll = (setLotList) => {
  postsRef
    .orderByChild("published")
    .equalTo(true)
    .once("value", (snapshot) => {
      setLotList(lotListObjToArr(snapshot.val()));
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
  const [lotList, setLotList] = useState(null);

  useEffect(() => {
    toRender === "all" && lotListAll(setLotList);
    toRender === "profile" && lotListPublishedByUser(matchedID, setLotList);
  }, [toRender, matchedID]);

  const handleSelected = () => {
    if (lotList && selected === "published")
      return lotList.filter((lot) => lot.published);
    if (lotList && selected === "drafts")
      return lotList.filter((lot) => lot.draft);
    return null;
  };

  const handleLotList = () => {
    if (!lotList) return null;
    return lotList;
  };

  const listToRender = selected ? handleSelected() : handleLotList();

  return (
    listToRender && (
      <div className={styles.lots}>
        {listToRender.map((l) => (
          <Lot data={l} key={l.postid} />
        ))}
      </div>
    )
  );
};
