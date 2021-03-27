import { useState } from "react";
import { fb } from "../../../Utils/firebase";
import { Link } from "react-router-dom";

import { StatusBar } from "../StatusBar/StatusBar";

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
    <div className={styles.photo}>
      <img src={props.lotImage} alt={props.lotName} draggable="false" />
    </div>
  );
};

export const Lot = ({ data }) => {
  // console.log(data.uid, data.postid);
  const [photo, setPhoto] = useState(null);
  fb.storage()
    .ref()
    .child("posts/" + data.uid + "/" + data.postid + "/photo0")
    .getDownloadURL()
    .then((url) => setPhoto(url));

  return (
    <div className={styles.lot}>
      <Owner avatar={data.avatar} username={data.username} uid={data.uid} />

      <Link to={`/posts/${data.postid}`} className={styles.content}>
        <LotImage lotImage={photo} lotnName={data.title} />

        <div className={styles.title}>{data.title}</div>

        <div className={styles.description}>{data.description}</div>

        <StatusBar offersQty={data.offersQty} expiryDate={data.expireDate} />
      </Link>
    </div>
  );
};
