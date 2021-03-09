import firebase from "firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { connect } from "react-redux";

import styles from "./lots.module.scss";

const Lots = ({ user, firestore }) => {
  const [posts, loadind] = useCollectionData(firestore.collection("posts"));

  console.log(posts);

  const createPost = async () => {
    firestore.collection("posts").add({
      uid: user.uid,
      description: "новый пост из апы",
      acceptedOffer: false,
      published: true,
      title: "post from app",
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };

  return (
    <div className={styles.lots}>
      <h3>LOTS</h3>
      <button onClick={createPost}>create harcoded post</button>
    </div>
  );
};

const mstp = (state) => ({
  firestore: state.auth.firestore,
  user: state.user.user,
});

export const LotsCont = connect(mstp, {})(Lots);
