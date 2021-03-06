import { batch } from "react-redux";
import {
  fst,
  db,
  fa,
  fb,
  an,
  db_offer,
  db_chat,
  db_notes,
  // algolia,
} from "../../Utils/firebase";

import { lotImageGetter } from "../../Utils/helpers";

import {
  onLotCreateSendMail,
  onOfferCreateSendMail,
  onApproveByLotAuthor,
  onConfirmByOfferAuthor,
} from "../../Utils/SendMails";

import { setFormMode, setProgress, setNewToast, setLastSearch } from "./home";

import { toastsModel } from "../../Utils/toasts";

const SET_LOTLIST = "lots/SET_LOTLIST";
const RESET_LOTLIST = "lots/RESET_LOTLIST";
const SET_ENDBEFORE_ID = "lots/SET_ENDBEFORE_ID";
const SET_LOTS_PENDING = "lots/SET_LOTS_PENDING";
const SET_ALLLOTS_LOADED = "lots/SET_ALLLOTS_LOADED";

const MY_LOTLIST = "lots/MY_LOTLIST";
const MY_LOTS_PENDING = "lots/MY_LOTS_PENDING";
const MY_LOTS_PAGE = "lots/MY_LOTS_PAGE";
const SET_LAST_PROFILE = "lots/SET_LAST_PROFILE";

const RESET_STATE = "lots/RESET_STATE";
const SET_NEWLOT_ID = "lots/SET_NEWLOT_ID";
const SET_NEWOFFER_ID = "lots/SET_NEWOFFER_ID";
const SET_CURRENT_LOTMETA = "lots/SET_CURRENT_LOTMETA";
const SET_LOTOFFERS = "lots/SET_LOTOFFERS";
const SET_SELECTED_OFFERID = "lots/SET_SELECTED_OFFERID";
const SET_SRCH_RES = "home/SET_SRCH_RES";

const initialState = {
  // main page params
  lotList: [],
  lotsPending: false,
  lotsPerPage: 20,
  endBeforeID: null,
  allLotsLoaded: false,
  // profile page params
  myLotList: [],
  myLotsPending: false,
  myLotsPage: 8,
  myLotsPerPage: 8,
  lastProfile: null,
  // rest params
  createLotId: null,
  createOfferId: null,
  currentLotMeta: null,
  selectedOfferID: null,
  // search results
  searchResults: null,
};

export const lots = (state = initialState, action) => {
  switch (action.type) {
    // main page state setters

    case SET_LOTLIST:
      return { ...state, lotList: [...state.lotList, ...action.lotList] };

    case RESET_LOTLIST:
      return { ...state, lotList: [] };

    case SET_LOTS_PENDING:
      return { ...state, lotsPending: action.payload };

    case SET_ALLLOTS_LOADED:
      return { ...state, allLotsLoaded: action.payload };

    case SET_ENDBEFORE_ID:
      return { ...state, endBeforeID: action.id };

    // profile page state setters

    case MY_LOTLIST:
      return { ...state, myLotList: action.lotList };

    case MY_LOTS_PENDING:
      return { ...state, myLotsPending: action.payload };

    case MY_LOTS_PAGE:
      return { ...state, myLotsPage: action.payload };

    case SET_LAST_PROFILE:
      return { ...state, lastProfile: action.payload };

    // search results

    case SET_SRCH_RES:
      return { ...state, searchResults: action.payload };

    // rest setters

    case RESET_STATE:
      return { ...initialState };

    case SET_NEWLOT_ID:
      return { ...state, createLotId: action.id };

    case SET_NEWOFFER_ID:
      return { ...state, createOfferId: action.id };

    case SET_SELECTED_OFFERID:
      return { ...state, selectedOfferID: action.id };

    case SET_CURRENT_LOTMETA:
      return { ...state, currentLotMeta: action.payload };

    case SET_LOTOFFERS:
      return {
        ...state,
        currentLotMeta: { ...state.currentLotMeta, offers: action.offers },
      };

    default:
      return state;
  }
};

// ACTIONS

const setLotList = (lotList) => ({ type: SET_LOTLIST, lotList });
const resetLotList = () => ({ type: RESET_LOTLIST });
const setEndBeforeID = (id) => ({ type: SET_ENDBEFORE_ID, id });
const setLotsPending = (payload) => ({ type: SET_LOTS_PENDING, payload });
const setAllLotsLoaded = (payload) => ({ type: SET_ALLLOTS_LOADED, payload });

export const setSearchRes = (payload) => ({ type: SET_SRCH_RES, payload });

export const myLotList = (lotList) => ({ type: MY_LOTLIST, lotList });
const myLotsPending = (payload) => ({ type: MY_LOTS_PENDING, payload });
const setLastProfile = (payload) => ({ type: SET_LAST_PROFILE, payload });
export const setMyLotsPage = (payload) => ({ type: MY_LOTS_PAGE, payload });

const setNewLotId = (id) => ({ type: SET_NEWLOT_ID, id });
const setNewOfferId = (id) => ({ type: SET_NEWOFFER_ID, id });
export const setSelectedOfferID = (id) => ({ type: SET_SELECTED_OFFERID, id });
const setLotMeta = (payload) => ({ type: SET_CURRENT_LOTMETA, payload });
export const setLotOffers = (offers) => ({ type: SET_LOTOFFERS, offers });

export const resetLotsState = () => ({ type: RESET_STATE });

// THUNKS

export const resetSearchResult = () => (dispatch) => {
  batch(() => {
    dispatch(setSearchRes(null));
  });
};

// Meta reset

export const resetMetaState = () => (dispatch) => {
  batch(() => {
    dispatch(setNewLotId(null));
    dispatch(setLotMeta(null));
    dispatch(setNewOfferId(null));
  });
};

export const onLogoClick = () => (dispatch) => {
  batch(() => {
    dispatch(resetLotList([]));
    dispatch(setSearchRes(null));
    dispatch(setLotList([]));
    dispatch(setLastSearch(""));
  });
};

// fullfill each lotMeta with photoURL and offerQty

const lotMetaLoader = (listArr) => {
  return listArr.map(async (lot) => {
    const photoURLs = await lotImageGetter(lot);

    const offersQtySnap = await db_offer.ref(lot.postid).once("value");

    const offersQty = offersQtySnap.exists()
      ? Object.keys(offersQtySnap.val()).length
      : 0;

    return { ...lot, photoURLs, offersQty };
  });
};

// get authored lots first page for profile

export const setAuthoredLots =
  (ownerID, paramsID) => async (dispatch, getState) => {
    await batch(() => {
      dispatch(myLotsPending(true));
      dispatch(setProgress(1));
      getState().lots.lastProfile !== (paramsID || ownerID) &&
        dispatch(setMyLotsPage(getState().lots.myLotsPerPage));
    });

    db.ref("posts")
      .orderByChild("uid")
      .equalTo(paramsID || ownerID)
      .limitToLast(getState().lots.myLotsPage)
      .once("value", (list) => {
        if (list.exists()) {
          const listArr = Object.keys(list.val()).map(
            (lotID) => list.val()[lotID]
          );

          Promise.all(lotMetaLoader(listArr)).then((lotsResolved) => {
            batch(() => {
              dispatch(myLotList([...lotsResolved].reverse()));
              dispatch(setLastProfile(paramsID ? paramsID : ownerID));
              dispatch(myLotsPending(false));
              dispatch(setProgress(100));
            });
          });
        }
      });
  };

// get lots first page

export const getPaginationFirstPage = () => async (dispatch, getState) => {
  batch(() => {
    dispatch(setProgress(1));
    dispatch(setLotsPending(true));
  });

  db.ref("posts")
    .limitToLast(getState().lots.lotsPerPage)
    .once("value", (page) => {
      if (page.exists()) {
        const listArr = Object.keys(page.val()).map(
          (lotID) => page.val()[lotID]
        );

        Promise.all(lotMetaLoader(listArr)).then((lotsResolved) => {
          batch(() => {
            dispatch(setEndBeforeID(lotsResolved[0].postid));
            dispatch(setLotList([...lotsResolved].reverse()));
            dispatch(setLotsPending(false));
            dispatch(setProgress(100));
          });
        });
      }

      if (!page.exists()) {
        batch(() => {
          dispatch(setAllLotsLoaded(true));
          dispatch(setProgress(100));
        });
      }
    });
};

// get get lots every next page

export const getPaginationNextPage = (endBeforeID) => (dispatch, getState) => {
  batch(() => {
    dispatch(setLotsPending(true));
    dispatch(setProgress(1));
  });

  db.ref("posts")
    .orderByKey()
    .endBefore(endBeforeID)
    .limitToLast(getState().lots.lotsPerPage)
    .once("value", (list) => {
      if (list.exists()) {
        const listArr = Object.keys(list.val()).map(
          (lotID) => list.val()[lotID]
        );

        Promise.all(lotMetaLoader(listArr)).then((lotsResolved) => {
          batch(() => {
            dispatch(setEndBeforeID(lotsResolved[0].postid));
            dispatch(setLotList([...lotsResolved].reverse()));
            dispatch(setLotsPending(false));
            dispatch(setProgress(100));
          });
        });
      }

      if (!list.exists()) {
        batch(() => {
          dispatch(setAllLotsLoaded(true));
          dispatch(setProgress(100));
        });
      }
    });
};

// lot create / cancel lot create

export const onLotCreateFromForm = () => (dispatch) => {
  const lotID = db.ref().child("posts").push().key;

  an.logEvent("user_engagement", { formOpened: "formOpened" });
  an.logEvent("formopened");

  dispatch(setNewLotId(lotID));
};

export const onLotCreateFormCancel = (lotID) => async (dispatch) => {
  const author = await fa.currentUser;

  await db.ref(`posts/${lotID}`).remove();

  await fst
    .ref()
    .child(`posts/${author.uid}/${lotID}`)
    .listAll()
    .then((res) => res.items.forEach((item) => item.delete()));

  batch(() => {
    dispatch(setNewLotId(null));
    dispatch(setLotMeta(null));
  });
};

// compile lotMeta (get lotMeta, getLotPhotos, get lotOffers, get lotOffersPhotos)

export const getLotMeta = (lotID, history) => (dispatch) => {
  dispatch(setProgress(1));

  const compileLotMeta = async (lotMeta) => {
    const pLinks = await lotImageGetter(lotMeta);

    const offersSnap = await db_offer.ref(lotMeta.postid).once("value");

    if (offersSnap.exists()) {
      const offersSnapArr = Object.keys(offersSnap.val()).map(
        (id) => offersSnap.val()[id]
      );

      const offersPromises = offersSnapArr.map(async (offer) => {
        const offerPhotoItems = await fst
          .ref()
          .child(offer.photospath)
          .listAll()
          .then((res) => res.items.map((item) => item.getDownloadURL()));

        const offerPhotoLinks = await Promise.all(offerPhotoItems);

        return { ...offer, photoURLs: offerPhotoLinks };
      });

      Promise.all(offersPromises).then((offers) => {
        batch(() => {
          dispatch(setLotMeta({ ...lotMeta, photoLinks: pLinks, offers }));
          dispatch(setProgress(100));
        });
      });
    }

    if (!offersSnap.exists()) {
      batch(() => {
        dispatch(setLotMeta({ ...lotMeta, photoLinks: pLinks, offers: null }));
        dispatch(setProgress(100));
      });
    }
  };

  db.ref(`posts/${lotID}`).once("value", (lotSnap) => {
    if (lotSnap.exists()) {
      dispatch(setFormMode(false));
      compileLotMeta(lotSnap.val());
    }

    if (!lotSnap.exists()) {
      history.push("/");
    }
  });
};

// lot publish / lot update / lot remove

export const publishNewLotFromForm = (updData, history) => (dispatch) => {
  delete updData.draft;

  dispatch(setProgress(1));

  const Success = () => {
    history.push(`posts/${updData.postid}`);

    // update state

    batch(() => {
      dispatch(
        setNewToast(
          "success",
          toastsModel.lotAdded.title,
          toastsModel.lotAdded.msg,
          null
        )
      );

      dispatch(setNewLotId(null));
      dispatch(setFormMode(false));
      dispatch(setProgress(100));
    });

    // analitics metrics

    an.logEvent("postcreated", {
      categories: updData.categories,
      wishes: updData.wishes,
    });

    //send mail

    onLotCreateSendMail(updData);
  };

  const Failure = (err) => {
    batch(() => {
      dispatch(
        setNewToast(
          "error",
          toastsModel.commonError.title,
          toastsModel.commonError.msg,
          null
        )
      );

      dispatch(setProgress(100));
    });

    console.log(err);
  };

  db.ref(`posts/${updData.postid}`).update(updData, (err) =>
    err ? Failure(err) : Success()
  );
};

export const updateLotFromEditForm = (updData, history) => (dispatch) => {
  dispatch(setProgress(1));

  const Success = () => {
    batch(() => {
      dispatch(setLotMeta(null));
      dispatch(setFormMode(false));

      dispatch(
        setNewToast(
          "success",
          toastsModel.lotEdited.title,
          toastsModel.lotEdited.msg,
          null
        )
      );

      dispatch(getLotMeta(updData.postid, history));

      dispatch(setProgress(100));
    });
  };

  const Failure = (err) => {
    batch(() => {
      dispatch(
        setNewToast(
          "error",
          toastsModel.commonError.title,
          toastsModel.commonError.msg,
          null
        )
      );

      dispatch(setProgress(100));
    });

    console.log(err);
  };

  db.ref(`posts/${updData.postid}`).update(updData, (err) =>
    err ? Failure(err) : Success()
  );
};

export const removeLot = (lotID, history) => async (dispatch, getState) => {
  dispatch(setProgress(1));

  const ownerID = getState().auth.ownerID;

  await db.ref(`posts/${lotID}/chats`).once("value", (chats) => {
    // console.log(chats.exists());

    if (chats.exists()) {
      Object.keys(chats.val()).forEach((roomID) => {
        const offerAuthor = chats.val()[roomID].offerAuthorID;
        const lotAuthor = chats.val()[roomID].lotAuthorID;

        // console.log(roomID);

        db_chat.ref(`messages/${roomID}`).set(null);
        db_chat.ref(`chats/${roomID}`).set(null);
        db.ref(`users/${offerAuthor}/chats/${roomID}`).remove();
        db.ref(`users/${lotAuthor}/chats/${roomID}`).remove();
        dispatch(setProgress(20));
      });
    }
  });

  await db_offer
    .ref(lotID)
    .once("value", (offers) => {
      if (offers.exists()) {
        // console.log("offers del");

        Object.keys(offers.val())
          .map((offerID) => offers.val()[offerID].photospath)
          .forEach((path) => {
            fst
              .ref()
              .child(path)
              .listAll()
              .then((res) => res.items.forEach((item) => item.delete()));
          });
      }
      if (!offers.exists()) {
        console.log("no offers");
      }
      dispatch(setProgress(40));
    })
    .then(() => db_offer.ref(lotID).remove());

  await fst
    .ref()
    .child(`posts/${ownerID}/${lotID}`)
    .listAll()
    .then((res) =>
      res.items.forEach((item) => {
        item.delete();
        dispatch(setProgress(60));
      })
    );

  // await algolia.deleteObject(lotID);

  await db.ref(`posts/${lotID}`).remove();

  await batch(() => {
    dispatch(
      setNewToast(
        "warning",
        toastsModel.lotDeleted.title,
        toastsModel.lotDeleted.msg,
        null
      )
    );

    dispatch(resetLotList([]));
    dispatch(setSearchRes(null));
    dispatch(setLotList([]));

    dispatch(setProgress(100));
  });

  history.push("/");
};

// offer prolong

export const prolongLotExpiry = (daysToAdd) => (dispatch, getState) => {
  const lotMeta = getState().lots.currentLotMeta;
  dispatch(setProgress(1));

  const newExpiry = new Date(
    Date.parse(lotMeta.expireDate) + daysToAdd * 24 * 60 * 60 * 1000
  );

  const Success = () => {
    batch(() => {
      dispatch(setLotMeta({ ...lotMeta, expireDate: newExpiry }));

      dispatch(
        setNewToast(
          "success",
          toastsModel.lotExpand.title,
          toastsModel.lotExpand.msg,
          null
        )
      );

      dispatch(setProgress(100));
    });
  };

  const Failure = (err) => {
    batch(() => {
      dispatch(
        setNewToast(
          "error",
          toastsModel.commonError.title,
          toastsModel.commonError.msg,
          null
        )
      );

      dispatch(setProgress(100));
    });

    console.log(err);
  };

  db.ref(`posts/${lotMeta.postid}`).update({ expireDate: newExpiry }, (err) =>
    err ? Failure(err) : Success()
  );
};

// offer accept by lotAuthor & confirm by offerAuthor

export const acceptConfirmOffer =
  (lotMeta, offerMeta, payload) => (dispatch) => {
    dispatch(setProgress(1));

    const Success = () => {
      db.ref(`posts/${lotMeta.postid}`).once("value", (lot) => {
        //
        // ACCEPT OFFER BY LOT AUTHOR
        //
        if (lot.val().acceptedOffer && !lot.val().offerConfirmed) {
          //
          // create notification
          //
          const newEventID = db_notes.ref(offerMeta.authorID).push().key;
          db_notes.ref(`${offerMeta.authorID}/${newEventID}`).update({
            type: "offerApproved",
            toastLink: `posts/${lotMeta.postid}`,
            lotTitle: lotMeta.title,
            offerTitle: offerMeta.name,
            timestamp: fb.database.ServerValue.TIMESTAMP,
            isRead: false,
          });

          // update state

          batch(() => {
            dispatch(
              setLotMeta({ ...lotMeta, acceptedOffer: lot.val().acceptedOffer })
            );

            dispatch(
              setNewToast(
                "success",
                toastsModel.offerApproved.title,
                toastsModel.offerApproved.msg(lotMeta.title, offerMeta.name),
                null
              )
            );

            dispatch(setProgress(100));
          });

          // send mail

          onApproveByLotAuthor(lotMeta, offerMeta);
        }
        //
        // CONFIRM OFFER BY OFFER AUTHOR
        //
        if (lot.val().acceptedOffer && lot.val().offerConfirmed) {
          //
          // create notification
          //
          const newEventID = db_notes.ref(lotMeta.uid).push().key;

          db_notes.ref(`${lotMeta.uid}/${newEventID}`).update({
            type: "offerConfirmed",
            toastLink: `posts/${lotMeta.postid}`,
            lotTitle: lotMeta.title,
            offerTitle: offerMeta.name,
            timestamp: fb.database.ServerValue.TIMESTAMP,
            isRead: false,
          });

          // update state

          batch(() => {
            dispatch(
              setLotMeta({
                ...lotMeta,
                offerConfirmed: lot.val().offerConfirmed,
              })
            );

            dispatch(
              setNewToast(
                "success",
                toastsModel.offerConfirmed.title,
                toastsModel.offerConfirmed.msg(lotMeta.title, offerMeta.name),
                null
              )
            );

            dispatch(setProgress(100));
          });

          // send mail

          onConfirmByOfferAuthor(lotMeta, offerMeta);
        }
        //
        // DEFAULT (FOR CANCELING PURPOSE)
        //
        if (!lot.val().acceptedOffer && !lot.val().offerConfirmed) {
          batch(() => {
            dispatch(setLotMeta({ ...lotMeta, ...payload }));

            dispatch(
              setNewToast(
                "success",
                toastsModel.offerCanceled.title,
                toastsModel.offerCanceled.msg,
                null
              )
            );

            dispatch(setProgress(100));
          });
        }
      });
    };

    const Failure = (err) => {
      batch(() => {
        dispatch(
          setNewToast(
            "error",
            toastsModel.commonError.title,
            toastsModel.commonError.msg,
            null
          )
        );

        dispatch(setProgress(100));
      });

      console.log(err);
    };

    db.ref(`posts/${lotMeta.postid}`).update(payload, (err) =>
      err ? Failure(err) : Success()
    );
  };

// offer create / remove / cancel create / publish

export const onOfferCreate = (lotMeta) => (dispatch) => {
  const offerID = db_offer.ref(lotMeta.postid).push().key;
  dispatch(setNewOfferId(offerID));
};

export const onOfferCancel = (offerID) => (dispatch, getState) => {
  const lotMeta = getState().lots.currentLotMeta;

  const Success = async () => {
    await fst
      .ref()
      .child(`/offers/${lotMeta.postid}/${offerID}`)
      .listAll()
      .then((res) => res.items.forEach((item) => item.delete()));

    const offers = lotMeta.offers
      ? lotMeta.offers.filter((offer) => offer.offerID !== offerID)
      : [];

    batch(() => {
      dispatch(setNewOfferId(null));
      dispatch(setLotOffers(offers));
    });
  };

  db_offer
    .ref(`${lotMeta.postid}/${offerID}`)
    .set(null, (err) => (err ? console.lor(err) : Success()));
};

export const removeOffer = (offerID) => (dispatch, getState) => {
  const lotMeta = getState().lots.currentLotMeta;

  batch(() => {
    dispatch(setProgress(1));
  });

  const Success = () => {
    batch(() => {
      dispatch(
        setNewToast(
          "success",
          toastsModel.offerRemoved.title,
          toastsModel.offerRemoved.msg,
          null
        )
      );

      dispatch(onOfferCancel(offerID));

      dispatch(
        setLotMeta({ ...lotMeta, acceptedOffer: null, offerConfirmed: null })
      );

      dispatch(setProgress(100));
    });
  };

  const Failure = () => {
    batch(() => {
      dispatch(
        setNewToast(
          "error",
          toastsModel.commonError.title,
          toastsModel.commonError.msg,
          null
        )
      );

      dispatch(setProgress(100));
    });
  };

  db.ref(`posts/${lotMeta.postid}`).update(
    {
      acceptedOffer: null,
      offerConfirmed: null,
    },
    (err) => (err ? Failure() : Success())
  );
};

export const createOffer = (lotMeta, offerData) => (dispatch, getState) => {
  dispatch(setProgress(1));

  const Success = async () => {
    //
    // get new offer photo links
    //
    const photoPromises = await fst
      .ref()
      .child(`/offers/${lotMeta.postid}/${offerData.offerID}`)
      .listAll()
      .then((res) => res.items.map((item) => item.getDownloadURL()));
    const photoURLs = await Promise.all(photoPromises);

    // create new notification event

    const newEventID = db_notes.ref(lotMeta.uid).push().key;
    db_notes.ref(`${lotMeta.uid}/${newEventID}`).update({
      type: "offerAdded",
      toastLink: `posts/${lotMeta.postid}`, // ?action=view&offerID=${offerData.offerID}
      offerID: offerData.offerID,
      toastID: newEventID,
      lotTitle: lotMeta.title,
      offerTitle: offerData.name,
      timestamp: fb.database.ServerValue.TIMESTAMP,
      isRead: false,
    });

    // compile full new offer meta (with photos)

    const newOfferMeta = { ...offerData, photoURLs };

    // updte states

    batch(() => {
      dispatch(setNewOfferId(null));

      dispatch(
        setLotOffers([
          ...(getState().lots.currentLotMeta.offers || []),
          newOfferMeta,
        ])
      );

      dispatch(
        setNewToast(
          "success",
          toastsModel.offerSuccess.title,
          toastsModel.offerSuccess.msg,
          null
        )
      );

      dispatch(setProgress(100));
    });

    // offer created analytics

    an.logEvent("offercreated");

    // send mail

    onOfferCreateSendMail(lotMeta, newOfferMeta);
  };

  const Failure = (err) => {
    dispatch(
      setNewToast(
        "error",
        toastsModel.commonError.title,
        toastsModel.commonError.msg,
        null
      )
    );

    console.log(err);
  };

  db_offer
    .ref(`${lotMeta.postid}/${offerData.offerID}`)
    .update(offerData, (err) => (err ? Failure(err) : Success()));
};
