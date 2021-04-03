import { useState, useEffect, useRef } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import Lightbox from "react-image-lightbox";

import { StatusBar } from "../Components/StatusBar/StatusBar";
import { Button } from "../Components/Button/Button";
import { ButtonOutline } from "../Components/Button/ButtonOutline";
import { Controls } from "../Components/Controls/Controls";
import { FormFull } from "../Components/FormFull/FormFull";
import { OfferForm } from "./OfferForm/OfferForm";

import {
  setNewLotId,
  setIsLotCreated,
  getLotMeta,
  setEditLotForm,
  updateLotFromEditForm,
} from "../../Redux/Reducers/lots";

import openGallery from "../../Assets/Icons/openGallery.svg";

import "react-image-lightbox/style.css";
import styles from "./lotfull.module.scss";

const Gallery = ({ lotPhotos }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [pIndex, setIndex] = useState(0);

  const Tint = ({ title, icon, count }) => {
    const iconMargin = title ? { marginRight: "18px" } : {};
    const tableBorder = title
      ? {
          // width: "217px",
          // height: "56px",
          // borderRadius: "16px",
          // border: "2px solid #fff",
        }
      : {};

    return (
      <div className={styles.tint}>
        <div className={styles.table} style={tableBorder}>
          {icon && <img src={icon} alt={title} style={iconMargin} />}
          {title && (
            <div className={styles.tabletitle}>
              <h3>{title}</h3>
              <p>{`${count} фото`}</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const Thumb = ({ photo, index }) => {
    const thumbClassName =
      index === pIndex
        ? `${styles.thumb} ${styles.thumb_active}`
        : styles.thumb;

    return (
      <div
        className={thumbClassName}
        key={photo}
        onClick={() => setIndex(index)}
      >
        <img src={photo} alt="" />
      </div>
    );
  };

  return (
    <div className={styles.gallery}>
      <div className={styles.mainphoto} onClick={() => setIsOpen(true)}>
        <img src={lotPhotos[pIndex]} alt="" />
        <Tint
          title="Открыть галлерею"
          icon={openGallery}
          count={lotPhotos.length}
        />
      </div>

      <div className={styles.thumbtrack}>
        {lotPhotos.map((photo, i) => (
          <Thumb photo={photo} index={i} key={photo} />
        ))}
      </div>

      {isOpen && (
        <Lightbox
          mainSrc={lotPhotos[pIndex]}
          nextSrc={lotPhotos[(pIndex + 1) % lotPhotos.length]}
          prevSrc={
            lotPhotos[(pIndex + lotPhotos.length - 1) % lotPhotos.length]
          }
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() =>
            setIndex((pIndex + lotPhotos.length - 1) % lotPhotos.length)
          }
          onMoveNextRequest={() => setIndex((pIndex + 1) % lotPhotos.length)}
        />
      )}
    </div>
  );
};

const Buttons = ({ icons, handleOfferForm, isOfferForm, lotMeta, ownerID }) => {
  const ref = useRef(0);

  const [buttonsContWidth, setButtonsContWidth] = useState(null);
  const [buttonsWidths, setButtons] = useState({ offer: 0, follow: 0 });
  const [followTitle, setFollowTitle] = useState("");

  const widthHandler = () => {
    const win = window.innerWidth;
    if (win >= 1024) setButtonsContWidth(440);
    if (win >= 640 && win < 1024) setButtonsContWidth(win / 2 - 48);
    if (win >= 375 && win < 640) setButtonsContWidth(win - 64);
    if (win >= 320 && win < 375) setButtonsContWidth(win - 48);
  };

  useEffect(() => {
    if (buttonsContWidth && window.innerWidth >= 1024) {
      setFollowTitle("Следить за лотом");
      setButtons({ offer: 217, follow: buttonsContWidth - 237 });
    }
    if (buttonsContWidth && window.innerWidth < 1024) {
      setFollowTitle("");
      setButtons({ offer: buttonsContWidth - 76, follow: 56 });
    }
  }, [buttonsContWidth]);

  useEffect(() => {
    if (ref.current.clientWidth > 0) {
      setButtonsContWidth(ref.current.clientWidth);
    }

    window.addEventListener("resize", widthHandler);
    return () => {
      window.removeEventListener("resize", widthHandler);
    };
  }, []);

  const buttonsStyle =
    lotMeta && ownerID !== lotMeta.uid
      ? { height: "56px", marginBottom: "32px" }
      : {};

  const offerTitle = isOfferForm ? "Передумал" : "Предложить обмен";

  return (
    <div className={styles.buttons} ref={ref} style={buttonsStyle}>
      {buttonsContWidth !== 0 && (
        <>
          <Button
            width={buttonsWidths.offer}
            height={56}
            title={offerTitle}
            icon={icons.add}
            handler={handleOfferForm}
            active={isOfferForm}
          />

          <ButtonOutline
            width={buttonsWidths.follow}
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
      <Link to={`/profile/${lotMeta.uid}`} className={styles.author}>
        <img src={lotMeta.avatar} alt="Username" />
        <p>{lotMeta.username}</p>
      </Link>

      <div className={styles.bigtitle}>{lotMeta.title}</div>

      <div className={styles.lottext}>{lotMeta.description}</div>

      {/* <div className={styles.smalltitle}>Хочу обменять на:</div> */}

      {/* <div className={styles.lottext}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque inventore
        voluptates delectus, nisi ad, harum repudiandae nesciunt omnis quae
        alias accusantium deleniti assumenda iste et velit eos officiis
        distinctio quibusdam.
      </div> */}
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

const LotFull = ({
  icons,
  match,
  history,
  location,
  isAuth,
  ownerID,
  formFullUI,
  formOfferUI,
  isFormModeOn,
  currentLotId,
  currentLotMeta,
  isLotMeta,
  lotMeta,
  lotPhotos,
  setNewLotId,
  setIsLotCreated,
  getLotMeta,
  setEditLotForm,
  updateLotFromEditForm,
}) => {
  const [isOfferForm, setIsOfferForm] = useState(false);
  const handleOfferForm = () => setIsOfferForm(!isOfferForm);

  useEffect(() => {
    setNewLotId(null);
    setIsLotCreated(false);
  }, [setNewLotId, setIsLotCreated]);

  useEffect(() => getLotMeta(match.params.id), [match.params.id, getLotMeta]);

  const handleEditLot = () => setEditLotForm(match.params.id, isFormModeOn);

  return (
    <div className={styles.lotwrapper}>
      {isLotMeta && (
        <>
          <Controls
            isAuth={isAuth}
            lotMeta={lotMeta}
            goBack={history.goBack}
            handleEditLot={handleEditLot}
          />

          {!isFormModeOn && (
            <div className={styles.lot}>
              <div className={styles.info}>
                {lotPhotos && (
                  <Gallery lotMeta={lotMeta} lotPhotos={lotPhotos} />
                )}

                <div className={styles.status}>
                  <StatusBar
                    offersQty={lotMeta.offersQty}
                    expiryDate={lotMeta.expireDate}
                  />
                </div>

                <div className={styles.spacer}></div>

                {/* <div
                  className={styles.buttonsRef}
                  style={buttonsStyle}
                > */}
                {lotMeta && ownerID !== lotMeta.uid && (
                  <Buttons
                    icons={icons}
                    handleOfferForm={handleOfferForm}
                    isOfferForm={isOfferForm}
                    lotMeta={lotMeta}
                    ownerID={ownerID}
                  />
                )}
                {/* </div> */}

                {isOfferForm && (
                  <OfferForm
                    icons={icons}
                    formOfferUI={formOfferUI}
                    lotMeta={lotMeta}
                  />
                )}

                <LotStats lotMeta={lotMeta} />
              </div>

              <Descrption lotMeta={lotMeta} />
            </div>
          )}
        </>
      )}

      {isFormModeOn && (
        <FormFull
          icons={icons}
          formFullUI={formFullUI}
          lotID={currentLotId}
          lotMeta={currentLotMeta}
          lotPhotos={lotPhotos}
          update={true}
          formHandler={updateLotFromEditForm}
        />
      )}
    </div>
  );
};

const mstp = (state) => ({
  icons: state.ui.icons,
  isAuth: state.auth.isAuth,
  ownerID: state.auth.ownerID,
  formFullUI: state.ui.formFull,
  formOfferUI: state.ui.formOffer,
  isFormModeOn: state.home.isFormModeOn,
  currentLotId: state.lots.currentLotId,
  currentLotMeta: state.lots.currentLotMeta,
  isLotMeta: state.lots.isLotMeta,
  lotMeta: state.lots.currentLotMeta,
  lotPhotos: state.lots.currentLotPhotos,
});

export const LotFullCont = compose(
  withRouter,
  connect(mstp, {
    setNewLotId,
    setIsLotCreated,
    getLotMeta,
    setEditLotForm,
    updateLotFromEditForm,
  })
)(LotFull);
