import { db, fb } from "../../Utils/firebase";
import { useState, useEffect, useRef } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { StatusBar } from "../Components/StatusBar/StatusBar";
import { Button } from "../Components/Button/Button";
import { ButtonOutline } from "../Components/Button/ButtonOutline";
import { Controls } from "../Components/Controls/Controls";

import { setFormMode } from "../../Redux/Reducers/home";

import styles from "./lotfull.module.scss";

const Gallery = ({ lotMeta }) => {
  const [lotPhotos, setLotPhotos] = useState([]);
  const photosHandler = (url) => setLotPhotos([...lotPhotos, ...url]);

  const getLotPhotos = async () => {
    const res = await fb
      .storage()
      .ref()
      .child("posts/" + lotMeta.uid + "/" + lotMeta.postid)
      .listAll();

    const photoList = [];

    res.items.forEach((item) =>
      photoList.push(
        "https://firebasestorage.googleapis.com/v0/b/" +
          item.bucket +
          "/o/posts%2F" +
          lotMeta.uid +
          "%2F" +
          lotMeta.postid +
          "%2F" +
          item.name +
          "?alt=media"
      )
    );
    photosHandler(photoList);
  };

  useEffect(() => lotMeta && getLotPhotos(), [lotMeta]);

  return (
    <div className={styles.gallery}>
      <div className={styles.big}>
        <img src={lotPhotos[0]} alt="" />
      </div>

      <div className={styles.track}>
        {lotPhotos.map((ph) => (
          <div className={styles.small} key={ph}>
            <img src={ph} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
};

const Buttons = ({ icons }) => {
  const ref = useRef(0);
  const initial = ref.current.clientWidth;

  const [followTitle, setFollowTitle] = useState(
    initial < 440 ? "" : "Следить за лотом"
  );

  const [buttonsContWidth, setButtonsContWidth] = useState(initial);
  const [buttons, setButtons] = useState({ offer: 0, follow: 0 });

  const widthHandler = () => {
    const win = window.innerWidth;
    if (win >= 1024) setButtonsContWidth(440);
    if (win >= 640 && win < 1024) setButtonsContWidth(win / 2 - 48);
    if (win >= 375 && win < 640) setButtonsContWidth(win - 64);
    if (win >= 320 && win < 375) setButtonsContWidth(win - 48);
  };

  const win = window.innerWidth;
  const more1024 = (!buttonsContWidth ? initial : buttonsContWidth) - 237;
  const less1024 = (!buttonsContWidth ? initial : buttonsContWidth) - 76;

  useEffect(() => {
    if (win >= 1024) {
      setFollowTitle("Следить за лотом");
      setButtons({ offer: 217, follow: more1024 });
    }
    if (win < 1024) {
      setFollowTitle("");
      setButtons({ offer: less1024, follow: 56 });
    }
  }, [initial, buttonsContWidth, win, more1024, less1024]);

  useEffect(() => {
    window.addEventListener("resize", widthHandler);
    return () => {
      window.removeEventListener("resize", widthHandler);
    };
  }, []);

  return (
    <div className={styles.buttons} ref={ref}>
      {!isNaN(more1024) && !isNaN(less1024) && (
        <>
          <Button
            width={buttons.offer}
            height={56}
            title="Предложить обмен"
            icon={icons.add}
          />
          <ButtonOutline
            width={buttons.follow}
            height={56}
            title={followTitle}
            icon={icons.bell}
          />
        </>
      )}
    </div>
  );
};

const Descrption = ({ lotMeta }) => {
  return (
    <div className={styles.description}>
      <div className={styles.user}>
        <img src={lotMeta.avatar} alt="Username" />
        <p>{lotMeta.username}</p>
      </div>

      <div className={styles.bigtitle}>{lotMeta.title}</div>

      <div className={styles.lottext}>{lotMeta.description}</div>

      <div className={styles.smalltitle}>Хочу обменять на:</div>

      <div className={styles.lottext}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque inventore
        voluptates delectus, nisi ad, harum repudiandae nesciunt omnis quae
        alias accusantium deleniti assumenda iste et velit eos officiis
        distinctio quibusdam.
      </div>
    </div>
  );
};

const LotStats = ({ lotMeta }) => {
  return (
    <div className={styles.stats}>
      {lotMeta.price && (
        <div className={styles.statsitem}>
          <h3 className={styles.itemtitle}>Примерная оценка стоимости</h3>
          <p className={styles.itemvalue}>{`${lotMeta.price} руб.`}</p>
        </div>
      )}

      {lotMeta.overprice && (
        <div className={styles.statsitem}>
          <h3 className={styles.itemtitle}>Автор готов доплатить</h3>
          <p className={styles.itemvalue}>Да</p>
        </div>
      )}

      {lotMeta.categories && (
        <div className={styles.statsitem}>
          <h3 className={styles.itemtitle}>Приоритетные категории обмена</h3>

          <p className={styles.itemvalue}>{lotMeta.categories}</p>
        </div>
      )}
    </div>
  );
};

const LotFull = ({ setFormMode, icons, match, isAuth, ...props }) => {
  useEffect(() => setFormMode(false), [setFormMode]);

  const [lotMeta, setLotMeta] = useState(null);

  const getLotMeta = (lotID) =>
    db.ref("posts/" + lotID).once("value", (snap) => setLotMeta(snap.val()));

  useEffect(() => getLotMeta(match.params.id), [match.params.id]);

  console.log(lotMeta);

  return (
    lotMeta && (
      <div className={styles.lotwrapper}>
        <Controls isAuth={isAuth} lotMeta={lotMeta} />

        <div className={styles.lot}>
          <div className={styles.info}>
            <Gallery lotMeta={lotMeta} />

            <div className={styles.status}>
              <StatusBar
                offersQty={lotMeta.offersQty}
                expiryDate={lotMeta.expireDate}
              />
            </div>

            <div className={styles.spacer}></div>

            <div className={styles.buttonsRef}>
              <Buttons icons={icons} />
            </div>

            <LotStats lotMeta={lotMeta} />
          </div>

          <Descrption lotMeta={lotMeta} />
        </div>
      </div>
    )
  );
};

const mstp = (state) => ({
  icons: state.ui.icons,
  isAuth: state.auth.isAuth,
});

export const LotFullCont = compose(
  withRouter,
  connect(mstp, {
    setFormMode,
  })
)(LotFull);
