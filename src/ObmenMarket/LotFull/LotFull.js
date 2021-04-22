import { useState, useEffect, useRef, useCallback } from "react";
import { db_offers, fb, db } from "../../Utils/firebase";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import Lightbox from "react-image-lightbox";
import ImageShadow from "react-image-shadow";

import { Prolong } from "./Prolong/Prolong";
import { StatusBar } from "../Components/StatusBar/StatusBar";
import { Button } from "../Components/Button/Button";
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

import { chatRoom, setChatFromLotFull } from "../../Redux/Reducers/chat";

import readytopay from "../../Assets/Icons/readytopay.svg";
import deleteBtn from "../../Assets/Icons/delete_2.svg";
import openGallery from "../../Assets/Icons/openGallery.svg";
import shrink from "../../Assets/Icons/shrink.svg";

import "./lightbox.css";
import "./imageshadow.scss";
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

  // const photoStyle = {
  //   width: `calc(100% / ${count})`,
  // };

  return (
    <div className={styles.phototrack} style={trackStyle}>
      {lotPhotos.map((photo) => (
        <ImageShadow
          src={photo}
          key={photo}
          shadowRadius="16"
          shadowBlur="20"
          width="100%"
        />
      ))}
    </div>
  );
};

// {/* <div className={styles.phototrack} style={trackStyle}>
//   {lotPhotos.map((photo) => (
//     <img src={photo} alt="" key={photo} style={photoStyle} />
//   ))}
// </div> */}

const Gallery = ({ lotPhotos }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(0);

  return (
    lotPhotos && (
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
    )
  );
};

// CTA_BUTTONS

const Buttons = ({
  icons,
  isOfferForm,
  isChatOn,
  lotMeta,
  ownerID,
  handleOfferForm,
  setIsModalOn,
  add48hours,
  setChatFromLotFull,
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
  const ctaIcon = isOfferForm ? icons.cancel : icons.pencil;
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
            icon={ctaIcon}
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
            disabled={!lotMeta.offerConfirmed || isChatOn}
            // icon={icons.add}
            handler={setChatFromLotFull}
            // active={isOfferForm}
          />
        </div>
      )}

      {butCont && !lotMeta.acceptedOffer && ownerID === lotMeta.uid && (
        <div className={styles.buttons_block}>
          <Prolong
            butCont={butCont}
            setIsModalOn={setIsModalOn}
            add48hours={add48hours}
          />
        </div>
      )}
    </div>
  );
};

//DESCRIPTION

const Descrption = ({ lotMeta }) => {
  return (
    <div className={styles.description}>
      <Author
        authorID={lotMeta.uid}
        avatar={lotMeta.avatar}
        name={lotMeta.username}
      />

      <div className={styles.majortitle}>{lotMeta.title}</div>

      <div className={styles.majortext}>{lotMeta.description}</div>

      {lotMeta.price && (
        <div className={styles.addinfo}>
          <h3 className={styles.addinfo_title}>Примерная оценка стоимости</h3>
          <p className={styles.addinfo_value}>{`${lotMeta.price} руб.`}</p>
        </div>
      )}

      {lotMeta.overprice && (
        <div className={styles.addinfo}>
          <h3 className={styles.addinfo_title}>Автор готов доплатить</h3>
          <p className={styles.addinfo_value}>Да</p>
        </div>
      )}

      {lotMeta.categories && (
        <div className={styles.addinfo}>
          <h3 className={styles.addinfo_title}>
            Приоритетные категории обмена
          </h3>
          <p className={styles.addinfo_value}>{lotMeta.categories}</p>
        </div>
      )}
    </div>
  );
};

// OFFERS

const OfferCard = ({
  offerMeta,
  lotMeta,
  ownerID,
  onOfferCancel,
  acceptConfirmOffer,
  selectedOffer,
  setSelectedOffer,
  chatRoom,
}) => {
  const ref = useRef({});

  const [openHeigth, setOpenHeigth] = useState(null);
  const [photoLinks, setPhotoLinks] = useState(null);

  useEffect(() => {
    fb.storage()
      .ref()
      .child(offerMeta.photospath)
      .listAll()
      .then((res) => {
        const links = res.items.map(
          (item, i) =>
            `https://firebasestorage.googleapis.com/v0/b/${item.bucket}/o/offers%2F${lotMeta.postid}%2F${offerMeta.offerID}%2Foffer${i}?alt=media`
        );
        setPhotoLinks(links);
      });
  }, [lotMeta, offerMeta]);

  const select = useCallback(() => {
    setSelectedOffer(offerMeta.offerID);
    setOpenHeigth(ref.current.scrollHeight);
  }, [offerMeta.offerID, setSelectedOffer]);

  const deselect = () => setOpenHeigth(null);

  useEffect(() => {
    if (lotMeta.acceptedOffer && photoLinks) select();
    if (offerMeta.offerID !== selectedOffer) deselect();
  }, [
    select,
    photoLinks,
    selectedOffer,
    ref.current.scrollHeight,
    lotMeta.acceptedOffer,
    offerMeta.offerID,
  ]);

  const handleSelectOffer = () => (openHeigth ? deselect() : select());

  const acceptConfirmReset = {
    acceptedOffer: null,
    offerConfirmed: false,
  };

  const handleRemoveOffer = () => {
    onOfferCancel(offerMeta, lotMeta);
    acceptConfirmOffer(lotMeta.postid, acceptConfirmReset);
  };

  const approveOfferByLotAuthor = () => {
    if (lotMeta.acceptedOffer) {
      acceptConfirmOffer(lotMeta.postid, acceptConfirmReset);
      return null;
    }

    if (!lotMeta.acceptedOffer) {
      acceptConfirmOffer(lotMeta.postid, { acceptedOffer: offerMeta.offerID });
      return null;
    }
  };

  const confirmOfferByOfferAuthor = () => {
    if (lotMeta.offerConfirmed) {
      acceptConfirmOffer(lotMeta.postid, acceptConfirmReset);
      return null;
    }

    if (!lotMeta.offerConfirmed) {
      acceptConfirmOffer(lotMeta.postid, { offerConfirmed: true });
      chatRoom(lotMeta, offerMeta);
      return null;
    }
  };

  const minimizedClasses = openHeigth
    ? `${styles.minimized} ${styles.minimized_active}`
    : styles.minimized;

  const minimizedJustify = lotMeta.acceptedOffer
    ? { justifyContent: "flex-end" }
    : {};

  return (
    <div className={styles.offer}>
      <div className={minimizedClasses} style={minimizedJustify}>
        {!lotMeta.acceptedOffer && (
          <div
            className={styles.minimized_detailes}
            onClick={handleSelectOffer}
          >
            {photoLinks && (
              <img
                className={styles.minimized_detailes_img}
                src={openHeigth ? shrink : photoLinks[0]}
                alt={offerMeta.name}
              />
            )}

            <div className={styles.minimized_detailes_title}>
              {openHeigth ? "Свернуть" : offerMeta.name}
            </div>
          </div>
        )}

        <div className={styles.minimized_buttons}>
          {ownerID !== offerMeta.authorID && (
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
            lotMeta.acceptedOffer === offerMeta.offerID &&
            offerMeta.authorID === ownerID && (
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

      <div
        className={styles.maximized}
        ref={ref}
        style={{ maxHeight: `${openHeigth ? openHeigth : 0}px` }}
      >
        <div className={styles.maximized_title}>{offerMeta.name}</div>

        <Gallery lotPhotos={photoLinks} />

        <div className={styles.maximized_author}>
          <Author
            authorID={offerMeta.authorID}
            avatar={offerMeta.avatar}
            name={offerMeta.authorName}
          />
        </div>

        <div className={styles.maximized_text}>{offerMeta.description}</div>

        <div className={styles.maximized_overprice}>
          {offerMeta.overprice && <img src={readytopay} alt="" />}

          <p>
            {offerMeta.overprice
              ? "Автор готов доплатить"
              : "Автор не готов к доплате"}
          </p>
        </div>
      </div>
    </div>
  );
};

const Offers = ({
  ownerID,
  lotMeta,
  onOfferCancel,
  acceptConfirmOffer,
  setOffersQty,
  chatRoom,
}) => {
  const [offers, setOffers] = useState(null);
  const [selectedOffer, setSelectedOffer] = useState(null);

  useEffect(() => {
    db_offers.child(lotMeta.postid).on("value", (snap) => {
      if (snap.val()) {
        setOffersQty(Object.keys(snap.val()).length);

        setOffers(
          Object.keys(snap.val()).map((offer) => ({
            ...snap.val()[offer],
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

    return offers.filter(
      (offer) =>
        offer.offerID === lotMeta.acceptedOffer && offer.authorID === ownerID
    );
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
              offerMeta={offer}
              lotMeta={lotMeta}
              onOfferCancel={onOfferCancel}
              acceptConfirmOffer={acceptConfirmOffer}
              selectedOffer={selectedOffer}
              setSelectedOffer={setSelectedOffer}
              chatRoom={chatRoom}
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
  isChatOn,
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
  chatRoom,
  setChatFromLotFull,
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
          icons={icons}
          isAuth={isAuth}
          isFormModeOn={isFormModeOn}
          lotMeta={lotMeta}
          history={history}
          handleEditLot={handleEditLot}
          onLotCreateFormCancel={onLotCreateFormCancel}
        />

        {!isFormModeOn && (
          <div className={styles.lot}>
            <div className={styles.detailes}>
              <Gallery lotMeta={lotMeta} lotPhotos={lotPhotos} />

              <div className={styles.status}>
                <StatusBar
                  offersQty={offersQty}
                  expiryDate={lotMeta.expireDate}
                />
              </div>

              <Buttons
                icons={icons}
                isOfferForm={isOfferForm}
                isChatOn={isChatOn}
                lotMeta={lotMeta}
                ownerID={ownerID}
                handleOfferForm={handleOfferForm}
                setIsModalOn={setIsModalOn}
                setChatFromLotFull={setChatFromLotFull}
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
                  chatRoom={chatRoom}
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
  isChatOn: state.chat.isChatOn,
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
    chatRoom,
    setChatFromLotFull,
  })
)(LotFull);
