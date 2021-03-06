import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import ImageShadow from "react-image-shadow";
import { motion } from "framer-motion"
import {
  getPaginationFirstPage,
  getPaginationNextPage,
  setMyLotsPage,
} from "../../../Redux/Reducers/lots";

import { Button } from "../Button/Button";
import { StatusBar } from "../StatusBar/StatusBar";

import styles from "./lotlist.module.scss";



const Lot = ({ data }) => {

  const lotContainer = {
    idle: { opacity: 1 },
    hover: { opacity: 1 },
    tap: {
      scale: 0.8,
      opacity: 0,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3,
      },
    },
    exit: {
      opacity: 0
    },
  };
  
  const lotPhotoLink = {
    idle: {
      scale: 1,
      y: 0
    },
    hover: {
      scale: 1.024,
      y: 0,
    }
  };

  return (
      <motion.div className={styles.lot} variants={lotContainer} initial="idle" whileHover="hover" whileTap="tap">
        <Link to={`/profile/${data.uid}`} className={styles.author}>
          <img src={data.avatar} alt={data.username} draggable="false" />
          <p>{data.username}</p>
        </Link>

        <Link to={`/posts/${data.postid}`} className={styles.content}>
          <motion.div variants={lotPhotoLink}>
          <ImageShadow
            src={data.photoURLs[0]}
            className={styles.photo}
            shadowRadius="16"
            shadowBlur="20"
            width="100%"
          />
          </motion.div>

          <div className={styles.title}>{data.title}</div>

          <div className={styles.description}>{data.description}</div>

          <StatusBar offersQty={data.offersQty} expiryDate={data.expireDate} />
        </Link>
      </motion.div>
  );
};

const Pagination = ({
  icons,
  profileLots,
  lotsPending,
  allLotsLoaded,
  handleNextPage,
}) => {
  return (
    <div className={styles.lotlist_pagination}>
      {!allLotsLoaded && (
        <Button
          title={lotsPending ? "Загрузка" : "Загрузить еще..."}
          width={217}
          height={56}
          icon={icons.loadmore}
          loader={lotsPending}
          disabled={lotsPending}
          handler={handleNextPage}
        />
      )}

      {!profileLots && allLotsLoaded && (
        <div className={styles.message}>Все лоты загружены!</div>
      )}
    </div>
  );
};

const LotList = ({
  icons,
  profileLots = false, // false for main page, true for profile page

  // main page params (are used when myLots is false)
  lotList,
  allLotsLoaded,
  lotsPending,
  endBeforeID,
  getPaginationFirstPage,
  getPaginationNextPage,

  // profile page params (are used when myLots is true)
  myLotList,
  myLotsPending,
  myLotsPage, // current num of lots loaded
  myLotsPerPage, // num of lots to add on loadmore click
  setMyLotsPage,

  // search
  lastSearch,
  searchResults,
}) => {
  const [display, setDisplay] = useState([]);

  useEffect(
    () => lotList.length === 0 && getPaginationFirstPage(),
    [getPaginationFirstPage, lotList.length]
  );

  useEffect(() => {
    if (searchResults) return setDisplay(searchResults);
    if (profileLots) return setDisplay(myLotList);
    return setDisplay(lotList);
  }, [searchResults, profileLots, myLotList, lotList]);

  const handleNextPage = profileLots
    ? () => setMyLotsPage(myLotsPage + myLotsPerPage)
    : () => getPaginationNextPage(endBeforeID);

  if (lastSearch && !searchResults) return <div></div>;

  return (
    <div className={styles.lotlist}>
      <div className={styles.lotlist_list}>
        {display.map((lot) => (
          <Lot data={lot} key={lot.postid} />
        ))}
      </div>

      {!searchResults && (
        <Pagination
          icons={icons}
          profileLots={profileLots}
          allLotsLoaded={
            profileLots ? myLotList.length < myLotsPage : allLotsLoaded
          }
          lotsPending={profileLots ? myLotsPending : lotsPending}
          handleNextPage={handleNextPage}
        />
      )}
    </div>
  );
};

const mstp = (state) => ({
  icons: state.ui.icons,
  lotList: state.lots.lotList,
  myLotList: state.lots.myLotList,
  searchResults: state.lots.searchResults,
  allLotsLoaded: state.lots.allLotsLoaded,
  endBeforeID: state.lots.endBeforeID,
  myLotsPage: state.lots.myLotsPage,
  myLotsPerPage: state.lots.myLotsPerPage,
  lotsPending: state.lots.lotsPending,
  lastSearch: state.home.lastSearch,
  myLotsPending: state.lots.myLotsPending,
});

export const LotListCont = connect(mstp, {
  getPaginationFirstPage,
  getPaginationNextPage,
  setMyLotsPage,
})(LotList);
