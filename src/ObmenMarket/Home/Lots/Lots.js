// import firebase from "firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Lot } from "../../Components/Lot/Lot";

import styles from "./lots.module.scss";

export const Lots = ({ user, firestore, ...props }) => {
  const [posts, loading] = useCollectionData(firestore.collection("posts"));
  // console.log(posts);
  // const postRef = firestore.collection("posts").doc();
  // console.log(postRef);

  // const postData = {
  //   acceptedOffer: "",
  //   categories: [],
  //   createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  //   description: "новый пост из апы новый пост из апы новый пост из апы",
  //   expireDate: "",
  //   images: [],
  //   overprice: false,
  //   published: true,
  //   thumbs: [],
  //   title: "post from app",
  //   uid: "",
  //   wishes: [],
  // };

  // const createPost = async () => {
  //   firestore.collection("posts").add(postData);
  // };

  const lotsDisplay = props.isFormModeOn ? { display: "none" } : {};

  if (loading) return <div style={lotsDisplay}>Loading...</div>;

  return (
    <div className={styles.lots} style={lotsDisplay}>
      {/* {posts.map((p) => (
        <Lot data={p} key={p.uid} />
      ))} */}
      <Lot data={posts[0]} />
      <Lot data={posts[0]} />
      <Lot data={posts[0]} />
    </div>
  );
};
