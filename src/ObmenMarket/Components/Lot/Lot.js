import { useState, useEffect } from "react";
import { fb, db_offers } from "../../../Utils/firebase";
import { Link } from "react-router-dom";

import { StatusBar } from "../StatusBar/StatusBar";

import ImageShadow from "react-image-shadow";

import "./imageshadow.scss";

import styles from "./lot.module.scss";

const Owner = ({ avatar, username, uid }) => {
  return (
    <Link to={`/profile/${uid}`} className={styles.author}>
      <img src={avatar} alt={username} draggable="false" />
      <p>{username}</p>
    </Link>
  );
};

const LotImage = (props) => {
  return (
    <ImageShadow
      src={props.lotImage}
      className={styles.photo}
      shadowRadius="16"
      shadowBlur="20"
      width="100%"
    />
  );
};

export const Lot = ({ data }) => {
  const initialState = {
    photo: null,
    offersQty: 0,
  };
  const [state, setState] = useState(initialState);

  useEffect(() => {
    const getNewState = async () => {
      const url = await fb
        .storage()
        .ref()
        .child("posts/" + data.uid + "/" + data.postid + "/photo0")
        .getDownloadURL();

      const qtySnap = await db_offers.child(data.postid).once("value");

      const qty = qtySnap.exists()
        ? Object.keys(await qtySnap.val()).length
        : 0;

      setState({ photo: url, offersQty: qty });
    };
    getNewState();
  }, [data]);

  return (
    state.photo && (
      <div className={styles.lot}>
        <Owner avatar={data.avatar} username={data.username} uid={data.uid} />

        <Link to={`/posts/${data.postid}`} className={styles.content}>
          <LotImage lotImage={state.photo} lotnName={data.title} />

          <div className={styles.title}>{data.title}</div>

          <div className={styles.description}>{data.description}</div>

          <StatusBar offersQty={state.offersQty} expiryDate={data.expireDate} />
        </Link>
      </div>
    )
  );
};
