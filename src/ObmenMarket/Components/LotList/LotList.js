import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fb, db_offers } from "../../../Utils/firebase";

import { getPaginationNextPage } from "../../../Redux/Reducers/lots";

import { Button } from "../Button/Button";
import { StatusBar } from "../StatusBar/StatusBar";

import ImageShadow from "react-image-shadow";
import "./imageshadow.scss";

import styles from "./lotlist.module.scss";

const Lot = ({ data }) => {
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
        <Link to={`/profile/${data.uid}`} className={styles.author}>
          <img src={data.avatar} alt={data.username} draggable="false" />
          <p>{data.username}</p>
        </Link>

        <Link to={`/posts/${data.postid}`} className={styles.content}>
          <ImageShadow
            src={state.photo}
            className={styles.photo}
            shadowRadius="16"
            shadowBlur="20"
            width="100%"
          />

          <div className={styles.title}>{data.title}</div>

          <div className={styles.description}>{data.description}</div>

          <StatusBar offersQty={state.offersQty} expiryDate={data.expireDate} />
        </Link>
      </div>
    )
  );
};

const Pagination = ({
  lotsPending,
  allLotsLoaded,
  endBeforeID,
  getPaginationNextPage,
}) => {
  return (
    <div className={styles.lotlist_pagination}>
      {!allLotsLoaded && (
        <Button
          title={lotsPending ? "Загрузка" : "Загрузить еще..."}
          width={217}
          height={56}
          loader={lotsPending}
          disabled={lotsPending}
          handler={() => getPaginationNextPage(endBeforeID)}
        />
      )}

      {allLotsLoaded && (
        <div className={styles.message}>Все лоты загружены!</div>
      )}
    </div>
  );
};

const LotList = ({
  myLots = false,
  lotList,
  myLotList,
  allLotsLoaded,
  lotsPending,
  endBeforeID,
  getPaginationNextPage,
}) => {
  return (
    <div className={styles.lotlist}>
      <div className={styles.lotlist_list}>
        {myLots && myLotList.map((lot) => <Lot data={lot} key={lot.postid} />)}

        {!myLots && lotList.map((lot) => <Lot data={lot} key={lot.postid} />)}
      </div>

      {!myLots && (
        <Pagination
          allLotsLoaded={allLotsLoaded}
          lotsPending={lotsPending}
          getPaginationNextPage={getPaginationNextPage}
          endBeforeID={endBeforeID}
        />
      )}
    </div>
  );
};

const mstp = (state) => ({
  lotList: state.lots.lotList,
  myLotList: state.lots.myLotList,
  allLotsLoaded: state.lots.allLotsLoaded,
  endBeforeID: state.lots.endBeforeID,
  lotsPending: state.lots.lotsPending,
});

export const LotListCont = connect(mstp, { getPaginationNextPage })(LotList);
