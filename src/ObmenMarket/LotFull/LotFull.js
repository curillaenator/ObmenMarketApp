import { useState, useEffect, useRef, useMemo } from "react";
import { connect, useSelector } from "react-redux";
import { useLocation, useHistory, useParams } from "react-router-dom";

import { Loading } from "../Components/Loading/Loading";
import { Controls } from "../Components/Controls/Controls";
import { Author } from "../Components/Author/Author";
import { Gallery } from "../Components/Gallery/Gallery";
import { Extend } from "../Components/Modals/Extend";
import { StatusBar } from "../Components/StatusBar/StatusBar";
import { OfferCard } from "../Components/OfferCard/OfferCard";
import { Button } from "../Components/Button/Button";
import { FormFull } from "../Components/FormFull/FormFull";
import { FormOffer } from "../Components/FormOffer/FormOffer";

import {
  getLotMeta,
  updateLotFromEditForm,
  removeLot,
  onOfferCreate,
  onOfferCancel,
  removeOffer,
  createOffer,
  setSelectedOfferID,
  acceptConfirmOffer,
} from "../../Redux/Reducers/lots";
import {
  setSiteTitle,
  setFormMode,
  setIsModalOn,
} from "../../Redux/Reducers/home";
import { chatRoom, setChatFromLotFull } from "../../Redux/Reducers/chat";

import styles from "./lotfull.module.scss";

const LotButtons = ({
  icons,
  isOfferForm,
  isChatOn,
  lotMeta,
  ownerID,
  handleOfferForm,
  setIsModalOn,
  setChatFromLotFull,
}) => {
  const [draw, callDraw] = useState(null);

  const btnContainer = useRef(0);

  const drawCaller = () => callDraw(window.innerWidth);

  useEffect(() => {
    callDraw(window.innerWidth);
    window.addEventListener("resize", drawCaller);
    return () => {
      window.removeEventListener("resize", drawCaller);
    };
  }, []);

  return (
    <div className={styles.buttons} ref={btnContainer}>
      <div className={styles.spacer}></div>

      {draw && !lotMeta.acceptedOffer && ownerID !== lotMeta.uid && (
        <div className={styles.buttons_block}>
          <Button
            width={btnContainer.current.clientWidth}
            height={56}
            title={isOfferForm ? "Передумал" : "Предложить обмен"}
            icon={icons.ctaoffer}
            handler={handleOfferForm}
            active={isOfferForm}
          />
        </div>
      )}

      {draw && lotMeta.acceptedOffer && (
        <div className={styles.buttons_block}>
          <Button
            width={btnContainer.current.clientWidth}
            height={56}
            title="Открыть мессенджер"
            disabled={!lotMeta.offerConfirmed || isChatOn}
            icon={icons.chat}
            handler={setChatFromLotFull}
          />
        </div>
      )}

      {draw && !lotMeta.acceptedOffer && ownerID === lotMeta.uid && (
        <div className={styles.buttons_block}>
          <Extend
            butCont={btnContainer.current.clientWidth}
            setIsModalOn={setIsModalOn}
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
      <div className={styles.author}>
        <Author
          authorID={lotMeta.uid}
          avatar={lotMeta.avatar}
          name={lotMeta.username}
        />
      </div>

      <div className={styles.majortitle}>{lotMeta.title}</div>

      <div className={styles.majortext}>{lotMeta.description}</div>

      {lotMeta.categories && (
        <div className={styles.addinfo}>
          <h3 className={styles.addinfo_title}>Категория</h3>
          <p className={styles.addinfo_value}>{lotMeta.categories}</p>
        </div>
      )}

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

      {lotMeta.wishes && (
        <div className={styles.addinfo}>
          <h3 className={styles.addinfo_title}>
            Приоритетные категории обмена
          </h3>
          <p className={styles.addinfo_value}>{lotMeta.wishes}</p>
        </div>
      )}
    </div>
  );
};

// OFFERS

const Offers = ({
  ownerID,
  lotMeta,
  acceptConfirmOffer,
  chatRoom,
  removeOffer,
  setSelectedOfferID,
}) => {
  const offers = lotMeta.offers;
  const selectedOfferID = useSelector((state) => state.lots.selectedOfferID);

  const handleFilteredOffers = () => {
    if (ownerID === lotMeta.uid) {
      if (lotMeta.acceptedOffer)
        return offers.filter(
          (offer) => offer.offerID === lotMeta.acceptedOffer
        );

      return offers;
    }

    if (ownerID !== lotMeta.uid) {
      if (!lotMeta.offerConfirmed && !lotMeta.acceptedOffer) {
        return offers.filter((offer) => offer.authorID === ownerID);
      }

      return offers.filter(
        (offer) =>
          offer.offerID === lotMeta.acceptedOffer && offer.authorID === ownerID
      );
    }
  };

  const filteredOffers = offers ? handleFilteredOffers() : null;

  return (
    filteredOffers && (
      <>
        {filteredOffers.length > 0 && (
          <div className={styles.offers_title}>
            {ownerID === lotMeta.uid ? "Предложения" : "Вы предложили к обмену"}
          </div>
        )}

        {filteredOffers.map((offer) => (
          <OfferCard
            key={offer.offerID}
            ownerID={ownerID}
            offerMeta={offer}
            lotMeta={lotMeta}
            removeOffer={removeOffer}
            acceptConfirmOffer={acceptConfirmOffer}
            selectedOfferID={selectedOfferID}
            setSelectedOfferID={setSelectedOfferID}
            chatRoom={chatRoom}
          />
        ))}
      </>
    )
  );
};

// MAIN COMPONENT

const LotFull = ({
  isMobile,
  icons,
  isAuth,
  ownerID,
  user,
  formFullUI,
  formOfferUI,
  isFormModeOn,
  setFormMode,
  createOfferId,
  lotMeta,
  getLotMeta,
  isChatOn,
  setSiteTitle,
  updateLotFromEditForm,
  removeLot,
  onOfferCreate,
  onOfferCancel,
  removeOffer,
  createOffer,
  setSelectedOfferID,
  acceptConfirmOffer,
  setIsModalOn,
  chatRoom,
  setChatFromLotFull,
}) => {
  const history = useHistory();
  const { lotid } = useParams();

  const [isOfferForm, setIsOfferForm] = useState(false);
  const handleOfferForm = () => {
    if (!isAuth) return history.push("/login");

    if (isOfferForm) {
      setIsOfferForm(false);
      onOfferCancel(createOfferId);
    }

    if (!isOfferForm) {
      setIsOfferForm(true);
      onOfferCreate(lotMeta);
    }
  };

  const locationSeacrh = useLocation().search;
  const query = useMemo(
    () => new URLSearchParams(locationSeacrh),
    [locationSeacrh]
  );

  const querySelector = useMemo(
    () => ({
      approved: (offerMeta) => {
        acceptConfirmOffer(lotMeta, offerMeta, {
          acceptedOffer: query.get("offerID"),
        });

        history.push(`/posts/${lotid}`);
      },
      confirmed: (offerMeta) => {
        acceptConfirmOffer(lotMeta, offerMeta, {
          offerConfirmed: query.get("offerID"),
        });

        chatRoom(lotMeta, offerMeta);

        history.push(`/posts/${lotid}`);
      },
      decline: (offerMeta) => {
        removeOffer(offerMeta.offerID);
        history.push(`/posts/${lotid}`);
      },
      view: (offerMeta) => {
        setSelectedOfferID(offerMeta.offerID);
        history.push(`/posts/${lotid}`);
      },
      extend: () => {
        setIsModalOn(true);
        history.push(`/posts/${lotid}`);
      },
    }),
    [
      lotid,
      acceptConfirmOffer,
      setSelectedOfferID,
      removeOffer,
      chatRoom,
      history,
      lotMeta,
      query,
      setIsModalOn,
    ]
  );

  // get lotMeta

  useEffect(() => getLotMeta(lotid, history), [lotid, getLotMeta, history]);

  // handle queries from url

  useEffect(() => {
    if (!isAuth) {
      console.log("!auth");

      return null;
      // return history.push(`/posts/${lotid}`);
    }

    if (!lotMeta || !query.has("action")) {
      console.log("!lotMeta & !action");

      return null;
    }

    if (query.has("action") && !querySelector[query.get("action")]) {
      console.log("bad link query");
      return history.push(`/posts/${lotid}`);
    }

    if (
      query.get("action") === "approved" ||
      query.get("action") === "confirmed" ||
      query.get("action") === "decline" ||
      query.get("action") === "view" ||
      query.get("action") === "extend"
    ) {
      console.log(query.get("action"));

      const offers = lotMeta.offers || [];
      const offerMeta = offers.find((o) => o.offerID === query.get("offerID"));

      return querySelector[query.get("action")](offerMeta);
    }
  }, [isAuth, lotid, query, querySelector, history, lotMeta]);

  // change page title

  useEffect(() => {
    lotMeta && setSiteTitle(lotMeta.title);
  }, [lotMeta, setSiteTitle]);

  if (!lotMeta) return <Loading />;

  return (
    <div className={styles.lotwrapper}>
      <Controls
        isMobile={isMobile}
        icons={icons}
        isAuth={isAuth}
        isAdmin={user.isAdmin}
        ownerID={ownerID}
        isFormModeOn={isFormModeOn}
        setFormMode={setFormMode}
        lotMeta={lotMeta}
        history={history}
        removeLot={removeLot}
      />

      {!isFormModeOn && (
        <div className={styles.lot}>
          <div className={styles.detailes}>
            <Gallery lotPhotos={lotMeta.photoLinks} />

            <div className={styles.status}>
              <StatusBar
                offersQty={lotMeta.offers ? lotMeta.offers.length : 0}
                expiryDate={lotMeta.expireDate}
              />
            </div>

            <LotButtons
              icons={icons}
              isOfferForm={isOfferForm}
              isChatOn={isChatOn}
              lotMeta={lotMeta}
              ownerID={ownerID}
              handleOfferForm={handleOfferForm}
              setIsModalOn={setIsModalOn}
              setChatFromLotFull={setChatFromLotFull}
            />

            {isOfferForm && (
              <FormOffer
                ownerID={ownerID}
                user={user}
                icons={icons}
                formOfferUI={formOfferUI}
                lotMeta={lotMeta}
                createOffer={createOffer}
                createOfferId={createOfferId}
                setIsOfferForm={setIsOfferForm}
              />
            )}

            <div className={styles.spacer}></div>

            {isAuth && (
              <Offers
                ownerID={ownerID}
                lotMeta={lotMeta}
                removeOffer={removeOffer}
                acceptConfirmOffer={acceptConfirmOffer}
                setSelectedOfferID={setSelectedOfferID}
                chatRoom={chatRoom}
              />
            )}
          </div>

          <Descrption lotMeta={lotMeta} />
        </div>
      )}

      {isFormModeOn && (
        <FormFull
          icons={icons}
          ownerID={ownerID}
          formFullUI={formFullUI}
          lotMeta={lotMeta}
          update={true}
          setFormMode={setFormMode}
          formHandler={updateLotFromEditForm}
        />
      )}
    </div>
  );
};

const mstp = (state) => ({
  isMobile: state.home.isMobile,
  icons: state.ui.icons,
  isAuth: state.auth.isAuth,
  ownerID: state.auth.ownerID,
  user: state.auth.user,
  formFullUI: state.ui.formFull,
  formOfferUI: state.ui.formOffer,
  isFormModeOn: state.home.isFormModeOn,
  lotMeta: state.lots.currentLotMeta,
  createOfferId: state.lots.createOfferId,
  isChatOn: state.chat.isChatOn,
});

export const LotFullCont = connect(mstp, {
  setSiteTitle,
  setFormMode,
  getLotMeta,
  updateLotFromEditForm,
  removeLot,
  onOfferCreate,
  onOfferCancel,
  removeOffer,
  createOffer,
  setSelectedOfferID,
  acceptConfirmOffer,
  setIsModalOn,
  chatRoom,
  setChatFromLotFull,
})(LotFull);
