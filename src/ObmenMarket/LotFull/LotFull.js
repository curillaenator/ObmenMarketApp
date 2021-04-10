import { useState, useEffect, useRef } from "react";
import { db_offers, fb, db } from "../../Utils/firebase";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import Lightbox from "react-image-lightbox";

import { Prolong } from "./Prolong/Prolong";
import { StatusBar } from "../Components/StatusBar/StatusBar";
import { Button } from "../Components/Button/Button";
// import { ButtonOutline } from "../Components/Button/ButtonOutline";
import { Controls } from "../Components/Controls/Controls";
import { FormFull } from "../Components/FormFull/FormFull";
import { OfferForm } from "./OfferForm/OfferForm";

import {
  setNewLotId,
  setIsLotCreated,
  getLotMeta,
  setEditLotForm,
  updateLotFromEditForm,
  onLotCreateFormCancel,
  onOfferCreate,
  onOfferCancel,
  createOffer,
  acceptConfirmOffer,
  add48hours,
} from "../../Redux/Reducers/lots";

import { setFormMode, setIsModalOn } from "../../Redux/Reducers/home";

import readytopay from "../../Assets/Icons/readytopay.svg";
import deleteBtn from "../../Assets/Icons/delete_2.svg";
import openGallery from "../../Assets/Icons/openGallery.svg";
import shrink from "../../Assets/Icons/shrink.svg";

import "react-image-lightbox/style.css";
import styles from "./lotfull.module.scss";

// COMPONENTS

const Author = ({ authorID, avatar, name }) => {
  return (
    <Link to={`/profile/${authorID}`} className={styles.author}>
      <img src={avatar} alt="Username" />
      <p>{name}</p>
    </Link>
  );
};

// GALLERY

const Tint = ({ title, icon, count }) => {
  const iconMargin = title ? { marginRight: "18px" } : {};

  return (
    <div className={styles.tint}>
      <div className={styles.table}>
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

const Thumb = ({ photo, label, selected, setSelected }) => {
  const thumbClassName =
    label === selected
      ? `${styles.thumb} ${styles.thumb_active}`
      : styles.thumb;

  return (
    <div className={thumbClassName} onClick={() => setSelected(label)}>
      <img src={photo} alt="" />
    </div>
  );
};

const Track = ({ lotPhotos, selected }) => {
  const count = lotPhotos.length;

  const trackStyle = {
    width: `calc(100% * ${count})`,
    left: `${-100 * selected}%`,
  };

  const photoStyle = {
    width: `calc(100% / ${count})`,
  };

  return (
    <div className={styles.phototrack} style={trackStyle}>
      {lotPhotos.map((photo) => (
        <img src={photo} alt="" key={photo} style={photoStyle} />
      ))}
    </div>
  );
};

const Gallery = ({ lotPhotos }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(0);

  return (
    <div className={styles.gallery}>
      <div className={styles.mainphoto} onClick={() => setIsOpen(true)}>
        <Track lotPhotos={lotPhotos} selected={selected} />

        <Tint
          title="Открыть галлерею"
          icon={openGallery}
          count={lotPhotos.length}
        />
      </div>

      <div className={styles.thumbtrack}>
        {lotPhotos.map((photo, i) => (
          <Thumb
            key={photo}
            photo={photo}
            label={i}
            selected={selected}
            setSelected={setSelected}
          />
        ))}
      </div>

      {isOpen && (
        <Lightbox
          mainSrc={lotPhotos[selected]}
          nextSrc={lotPhotos[(selected + 1) % lotPhotos.length]}
          prevSrc={
            lotPhotos[(selected + lotPhotos.length - 1) % lotPhotos.length]
          }
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() =>
            setSelected((selected + lotPhotos.length - 1) % lotPhotos.length)
          }
          onMoveNextRequest={() =>
            setSelected((selected + 1) % lotPhotos.length)
          }
        />
      )}
    </div>
  );
};

const Buttons = ({
  icons,
  handleOfferForm,
  isOfferForm,
  lotMeta,
  ownerID,
  setIsModalOn,
  add48hours,
}) => {
  // eslint-disable-next-line
  const [draw, callDraw] = useState(0);

  const ref = useRef(0);
  const butCont = ref.current.clientWidth;

  const drawCaller = () => callDraw(window.innerWidth);

  useEffect(() => {
    callDraw(window.innerWidth);
    window.addEventListener("resize", drawCaller);
    return () => {
      window.removeEventListener("resize", drawCaller);
    };
  }, []);

  const offerTitle = isOfferForm ? "Передумал" : "Предложить обмен";
  // const followTitle = draw >= 1024 ? "Следить за лотом" : null;

  // const buttonWidths =
  //   draw >= 1024
  //     ? { offer: 217, follow: butCont - 237 }
  //     : { offer: butCont - 76, follow: 56 };

  return (
    <div className={styles.buttons} ref={ref}>
      <div className={styles.spacer}></div>

      {butCont && !lotMeta.acceptedOffer && ownerID !== lotMeta.uid && (
        <div className={styles.buttons_block}>
          <Button
            width={butCont}
            height={56}
            title={offerTitle}
            icon={icons.add}
            handler={handleOfferForm}
            active={isOfferForm}
          />
        </div>
      )}

      {butCont && lotMeta.acceptedOffer && (
        <div className={styles.buttons_block}>
          <Button
            width={butCont}
            height={56}
            title="Перейти в чат"
            disabled={!lotMeta.offerConfirmed}
            // icon={icons.add}
            // handler={handleOfferForm}
            // active={isOfferForm}
          />
        </div>
      )}

      {butCont && !lotMeta.acceptedOffer && ownerID === lotMeta.uid && (
        <div className={styles.buttons_block}>
          <Prolong
            butCont={butCont}
            icons={icons}
            setIsModalOn={setIsModalOn}
            add48hours={add48hours}
            lotMeta={lotMeta}
          />
        </div>
      )}
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

const Descrption = ({ lotMeta }) => {
  return (
    <div className={styles.description}>
      <Author
        authorID={lotMeta.uid}
        avatar={lotMeta.avatar}
        name={lotMeta.username}
      />

      <div className={styles.bigtitle}>{lotMeta.title}</div>

      <div className={styles.lottext}>{lotMeta.description}</div>

      <LotStats lotMeta={lotMeta} />
    </div>
  );
};

// OFFERS

const OfferCard = ({
  data,
  lotMeta,
  ownerID,
  onOfferCancel,
  acceptConfirmOffer,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(!isOpen);

  const [isMouse, setIsMouse] = useState(false);
  const mouseEnter = () => setIsMouse(true);
  const mouseLeave = () => setIsMouse(false);

  const [photoLinks, setPhotoLinks] = useState([]);

  const acceptConfirmReset = {
    acceptedOffer: null,
    offerConfirmed: false,
  };

  const handleRemoveOffer = () => {
    onOfferCancel(data, lotMeta);
    acceptConfirmOffer(lotMeta.postid, null, acceptConfirmReset);
  };

  const approveOfferByLotAuthor = () => {
    lotMeta.acceptedOffer
      ? acceptConfirmOffer(lotMeta.postid, null, acceptConfirmReset)
      : acceptConfirmOffer(lotMeta.postid, data.offerID, {
          acceptedOffer: data.offerID,
        });
  };

  const confirmOfferByOfferAuthor = () => {
    lotMeta.offerConfirmed
      ? acceptConfirmOffer(lotMeta.postid, null, acceptConfirmReset)
      : acceptConfirmOffer(lotMeta.postid, data.offerID, {
          offerConfirmed: true,
        });
  };

  useEffect(() => {
    if (lotMeta.acceptedOffer) setIsOpen(true);
  }, [lotMeta.acceptedOffer]);

  useEffect(() => {
    fb.storage()
      .ref()
      .child(data.photospath)
      .listAll()
      .then((res) => {
        const links = res.items.map(
          (item, i) =>
            `https://firebasestorage.googleapis.com/v0/b/${item.bucket}/o/offers%2F${lotMeta.postid}%2F${data.offerID}%2Foffer${i}?alt=media`
        );
        setPhotoLinks(links);
      });
  }, [lotMeta, data]);

  const styleButtons = isOpen || isMouse ? { opacity: 1 } : { opacity: 0 };

  const headerClassName = isOpen
    ? `${styles.header} ${styles.header_active}`
    : styles.header;

  const offerbodyStyle = isOpen
    ? styles.offerbody
    : `${styles.offerbody} ${styles.offerbody_hiden}`;

  const offerMBootom = isOpen ? { marginBottom: "8px" } : {};

  const headerJustify = lotMeta.acceptedOffer
    ? { justifyContent: "flex-end" }
    : {};

  return (
    <div className={styles.offer} style={offerMBootom}>
      <div
        className={headerClassName}
        onMouseEnter={mouseEnter}
        onMouseLeave={mouseLeave}
        style={headerJustify}
      >
        {!lotMeta.acceptedOffer && (
          <div className={styles.header_photo_name} onClick={handleOpen}>
            <div className={styles.header_photo}>
              <img src={isOpen ? shrink : photoLinks[0]} alt={data.name} />
            </div>

            <div className={styles.header_offername}>
              {isOpen ? "Свернуть" : data.name}
            </div>
          </div>
        )}

        <div className={styles.header_buttons} style={styleButtons}>
          {ownerID !== data.authorID && (
            <Button
              width={116}
              height={24}
              title={lotMeta.acceptedOffer ? "Отменить обмен" : "Согласиться"}
              fontsize={12}
              handler={approveOfferByLotAuthor}
              active={lotMeta.acceptedOffer}
            />
          )}

          {!!lotMeta.acceptedOffer &&
            lotMeta.acceptedOffer === data.offerID &&
            data.authorID === ownerID && (
              <Button
                width={126}
                height={24}
                title={
                  lotMeta.offerConfirmed ? "Отменить обмен" : "Подтвердить"
                }
                fontsize={12}
                handler={confirmOfferByOfferAuthor}
                active={lotMeta.offerConfirmed}
              />
            )}

          <div className={styles.deleteoffer} onClick={handleRemoveOffer}>
            <img src={deleteBtn} alt="Отказаться" />
          </div>
        </div>
      </div>

      <div className={offerbodyStyle}>
        <div className={styles.offerbody_title}>{data.name}</div>

        <Gallery lotPhotos={photoLinks} />

        <div className={styles.offerbody_descr}>
          <Author
            authorID={data.authorID}
            avatar={data.avatar}
            name={data.authorName}
          />

          <div className={styles.offertext}>{data.description}</div>

          <div className={styles.offerpayment}>
            {data.overprice && <img src={readytopay} alt="" />}

            <p>
              {data.overprice
                ? "Автор готов доплатить"
                : "Автор не готов к доплате"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Offers = ({
  lotMeta,
  onOfferCancel,
  acceptConfirmOffer,
  ownerID,
  setOffersQty,
}) => {
  const [offers, setOffers] = useState(null);

  useEffect(() => {
    db_offers.child(lotMeta.postid).on("value", (snapshot) => {
      if (snapshot.val()) {
        setOffersQty(Object.keys(snapshot.val()).length);

        setOffers(
          Object.keys(snapshot.val()).map((offer) => ({
            ...snapshot.val()[offer],
            postID: offer,
          }))
        );
      }
    });

    return () => db_offers.child(lotMeta.postid).off();
  }, [lotMeta, setOffersQty]);

  const handleOffersIfAccepted = () => {
    if (lotMeta.acceptedOffer)
      return offers.filter((offer) => offer.offerID === lotMeta.acceptedOffer);

    return offers;
  };

  const handleOffersIfConfirmed = () => {
    if (!lotMeta.offerConfirmed && !lotMeta.acceptedOffer) {
      return offers.filter((offer) => offer.authorID === ownerID);
    }

    return offers.filter((offer) => offer.offerID === lotMeta.acceptedOffer);
  };

  const handleFilteredOffers = () => {
    if (ownerID === lotMeta.uid) return handleOffersIfAccepted();
    if (ownerID !== lotMeta.uid) return handleOffersIfConfirmed();
  };

  const filteredOffers = offers ? handleFilteredOffers() : null;

  const offersTitle =
    ownerID === lotMeta.uid
      ? "Вам предложили в обмен:"
      : "Вы предложили к обмену:";

  return (
    filteredOffers && (
      <div className={styles.offers}>
        {filteredOffers.length > 0 && (
          <div className={styles.offers_title}>{offersTitle}</div>
        )}

        <div className={styles.offers_list}>
          {filteredOffers.map((offer) => (
            <OfferCard
              key={offer.offerID}
              ownerID={ownerID}
              data={offer}
              lotMeta={lotMeta}
              onOfferCancel={onOfferCancel}
              acceptConfirmOffer={acceptConfirmOffer}
            />
          ))}
        </div>
      </div>
    )
  );
};

// MAIN COMPONENT

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
  setFormMode,
  currentLotId,
  currentLotMeta,
  isLotMeta,
  isLotPhotos,
  lotMeta,
  lotPhotos,
  setNewLotId,
  setIsLotCreated,
  getLotMeta,
  setEditLotForm,
  updateLotFromEditForm,
  onLotCreateFormCancel,
  newOfferMeta,
  onOfferCreate,
  onOfferCancel,
  createOffer,
  acceptConfirmOffer,
  setIsModalOn,
  add48hours,
}) => {
  const [isOfferForm, setIsOfferForm] = useState(false);
  const handleEditLot = () => setEditLotForm(match.params.id, isFormModeOn);

  const [offersQty, setOffersQty] = useState(0);

  const handleOfferForm = () => {
    if (!isAuth) return history.push("/login");

    if (isOfferForm) {
      setIsOfferForm(false);
      onOfferCancel(newOfferMeta, lotMeta);
    }

    if (!isOfferForm) {
      setIsOfferForm(true);
      onOfferCreate(lotMeta);
    }
  };

  useEffect(() => {
    setNewLotId(null);
    setIsLotCreated(false);
  }, [setNewLotId, setIsLotCreated]);

  useEffect(() => {
    db.ref(`posts/${match.params.id}`).once("value", (snapshot) => {
      snapshot.exists() && getLotMeta(match.params.id);
      !snapshot.exists() && history.push("/");
    });
  }, [match.params.id, getLotMeta, history]);

  return (
    isLotMeta &&
    isLotPhotos && (
      <div className={styles.lotwrapper}>
        <Controls
          isAuth={isAuth}
          lotMeta={lotMeta}
          history={history}
          handleEditLot={handleEditLot}
          onLotCreateFormCancel={onLotCreateFormCancel}
        />

        {!isFormModeOn && (
          <div className={styles.lot}>
            <div className={styles.info}>
              <Gallery lotMeta={lotMeta} lotPhotos={lotPhotos} />

              <div className={styles.status}>
                <StatusBar
                  offersQty={offersQty}
                  expiryDate={lotMeta.expireDate}
                />
              </div>

              <Buttons
                icons={icons}
                handleOfferForm={handleOfferForm}
                isOfferForm={isOfferForm}
                lotMeta={lotMeta}
                ownerID={ownerID}
                setIsModalOn={setIsModalOn}
                add48hours={add48hours}
              />

              {isOfferForm && (
                <OfferForm
                  icons={icons}
                  formOfferUI={formOfferUI}
                  lotMeta={lotMeta}
                  newOfferMeta={newOfferMeta}
                  createOffer={createOffer}
                  setIsOfferForm={setIsOfferForm}
                />
              )}

              <div className={styles.spacer}></div>

              {isAuth && (
                <Offers
                  lotMeta={lotMeta}
                  onOfferCancel={onOfferCancel}
                  acceptConfirmOffer={acceptConfirmOffer}
                  ownerID={ownerID}
                  setOffersQty={setOffersQty}
                />
              )}
            </div>

            <Descrption lotMeta={lotMeta} />
          </div>
        )}

        {isFormModeOn && (
          <FormFull
            setFormMode={setFormMode}
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
    )
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
  isLotPhotos: state.lots.isLotPhotos,
  lotMeta: state.lots.currentLotMeta,
  lotPhotos: state.lots.currentLotPhotos,
  newOfferMeta: state.lots.newOfferMeta,
});

export const LotFullCont = compose(
  withRouter,
  connect(mstp, {
    setFormMode,
    setNewLotId,
    setIsLotCreated,
    getLotMeta,
    setEditLotForm,
    updateLotFromEditForm,
    onLotCreateFormCancel,
    onOfferCreate,
    onOfferCancel,
    createOffer,
    acceptConfirmOffer,
    setIsModalOn,
    add48hours,
  })
)(LotFull);
