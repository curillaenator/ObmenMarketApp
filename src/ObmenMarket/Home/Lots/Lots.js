import firebase from "firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { connect } from "react-redux";
import { Lot } from "../../Components/Lot/Lot";

import styles from "./lots.module.scss";

const Lots = ({ user, firestore }) => {
  const [posts, loading] = useCollectionData(firestore.collection("posts"));
  // console.log(posts);
  // const postRef = firestore.collection("posts").doc();
  // console.log(postRef);

  const postData = {
    acceptedOffer: "",
    categories: [],
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    description: "новый пост из апы новый пост из апы новый пост из апы",
    expireDate: "",
    images: [],
    overprice: false,
    published: true,
    thumbs: [],
    title: "post from app",
    uid: "",
    wishes: [],
  };

  const createPost = async () => {
    firestore.collection("posts").add(postData);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className={styles.main}>
      <div className={styles.lots}>
        {posts.map((p) => (
          <Lot data={p} key={p.uid} />
        ))}
      </div>
      <button onClick={createPost}>create</button>
    </div>
  );
};

const mstp = (state) => ({
  firestore: state.auth.firestore,
  user: state.user.user,
});

export const LotsCont = connect(mstp, {})(Lots);
