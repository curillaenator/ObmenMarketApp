import { batch } from "react-redux";

import { fst, db, fa, db_offers } from "../../Utils/firebase";

import {
  onLotCreateSendMail,
  onOfferCreateSendMail,
  onApproveByLotAuthor,
} from "../../Utils/SendMails";

import { setFormMode, setProgress } from "./home";

const SET_LOTLIST = "lots/SET_LOTLIST";
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
const SET_CURRENT_ID = "lots/SET_CURRENT_ID";
const SET_IS_LOTMETA = "lots/SET_IS_LOTMETA";
const SET_IS_LOTPHOTOS = "lots/SET_IS_LOTPHOTOS";
const SET_CURRENT_LOTMETA = "lots/SET_CURRENT_LOT";
const SET_CURRENT_LOTPHOTOS = "lots/SET_CURRENT_LOTPHOTOS";

const initialState = {
  // main page params
  lotList: [],
  lotsPending: false,
  lotsPerPage: 8,
  endBeforeID: null,
  allLotsLoaded: false,
  // profile page params
  myLotList: [],
  myLotsPending: false,
  myLotsPage: 4,
  myLotsPerPage: 4,
  lastProfile: null,
  // rest params
  createLotId: null,
  createOfferId: null,
  currentLotId: null,
  isLotMeta: false,
  isLotPhotos: false,
  currentLotMeta: null,
  currentLotPhotos: null,
};

export const lots = (state = initialState, action) => {
  switch (action.type) {
    // main page state setters

    case SET_LOTLIST:
      return { ...state, lotList: [...state.lotList, ...action.lotList] };

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

    // rest setters

    case RESET_STATE:
      return { ...initialState };

    case SET_NEWLOT_ID:
      return { ...state, createLotId: action.id };

    case SET_NEWOFFER_ID:
      return { ...state, createOfferId: action.id };

    case SET_CURRENT_ID:
      return { ...state, currentLotId: action.id };

    case SET_CURRENT_LOTMETA:
      return { ...state, currentLotMeta: action.payload };

    case SET_CURRENT_LOTPHOTOS:
      return { ...state, currentLotPhotos: action.payload };

    case SET_IS_LOTMETA:
      return { ...state, isLotMeta: action.payload };

    case SET_IS_LOTPHOTOS:
      return { ...state, isLotPhotos: action.payload };

    default:
      return state;
  }
};

// ACTIONS

const setLotList = (lotList) => ({ type: SET_LOTLIST, lotList });
const setEndBeforeID = (id) => ({ type: SET_ENDBEFORE_ID, id });
const setLotsPending = (payload) => ({ type: SET_LOTS_PENDING, payload });
const setAllLotsLoaded = (payload) => ({ type: SET_ALLLOTS_LOADED, payload });

const myLotList = (lotList) => ({ type: MY_LOTLIST, lotList });
const myLotsPending = (payload) => ({ type: MY_LOTS_PENDING, payload });
const setLastProfile = (payload) => ({ type: SET_LAST_PROFILE, payload });
export const setMyLotsPage = (payload) => ({ type: MY_LOTS_PAGE, payload });

export const setNewLotId = (id) => ({ type: SET_NEWLOT_ID, id });
const setNewOfferId = (id) => ({ type: SET_NEWOFFER_ID, id });
const setCurrentLotId = (id) => ({ type: SET_CURRENT_ID, id });
const setIsLotMeta = (payload) => ({ type: SET_IS_LOTMETA, payload });
const setIsLotPhotos = (payload) => ({ type: SET_IS_LOTPHOTOS, payload });
const setLotMeta = (payload) => ({ type: SET_CURRENT_LOTMETA, payload });
const setLotPhotos = (payload) => ({ type: SET_CURRENT_LOTPHOTOS, payload });

export const resetLotsState = () => ({ type: RESET_STATE });

// THUNKS

// Meta reset

export const resetMetaState = () => (dispatch, getState) => {
  batch(() => {
    dispatch(setNewLotId(null));
    dispatch(setCurrentLotId(null));
    dispatch(setIsLotMeta(false));
    dispatch(setIsLotPhotos(false));
    dispatch(setLotMeta(null));
    dispatch(setLotPhotos(null));
    dispatch(setNewOfferId(null));
    // dispatch(resetLotsState());
    dispatch(myLotList([]));
    // dispatch(setEndBeforeID(null));
    // dispatch(setLastProfile(null));
    dispatch(setMyLotsPage(getState().lots.myLotsPerPage));
  });
};

// fullfill each lotMeta with photoURL and offerQty

const lotMetasPageLoader = (listArr) => {
  return listArr.map(async (lot) => {
    const photoURL = await fst
      .ref()
      .child(`posts/${lot.uid}/${lot.postid}/photo0`)
      .getDownloadURL();

    const offersQtySnap = await db_offers.child(lot.postid).once("value");

    const offersQty = offersQtySnap.exists()
      ? Object.keys(await offersQtySnap.val()).length
      : 0;

    return { ...lot, photoURL, offersQty };
  });
};

// get authored lots first page for profile

export const setAuthoredLots = (ownerID, paramsID) => async (
  dispatch,
  getState
) => {
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

        Promise.all(lotMetasPageLoader(listArr)).then((lotsResolved) => {
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

export const getPaginationFirstPage = () => (dispatch, getState) => {
  batch(() => {
    dispatch(setProgress(1));
    dispatch(setLotsPending(true));
  });

  db.ref("posts")
    .limitToLast(getState().lots.lotsPerPage)
    .once("value", (list) => {
      if (list.exists()) {
        const listArr = Object.keys(list.val()).map(
          (lotID) => list.val()[lotID]
        );

        Promise.all(lotMetasPageLoader(listArr)).then((lotsResolved) => {
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

        Promise.all(lotMetasPageLoader(listArr)).then((lotsResolved) => {
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

// lot create / cancel create / publish

export const onLotCreateFromForm = () => (dispatch) => {
  const lotID = db.ref().child("posts").push().key;

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
    dispatch(setIsLotMeta(false));
    dispatch(setNewLotId(null));
    dispatch(setLotMeta(null));
    dispatch(setLotPhotos(null));
  });
};

// send note on new lot create

export const publishNewLotFromForm = (lotID, updData, history) => (
  dispatch
) => {
  const draftsPath = `drafts/${lotID}`;
  const publishPath = `posts/${lotID}`;

  const setMeta = (err, path) => {
    err ? console.log(err) : onLotCreateSendMail(updData); // if no error -> send mail to lot author

    db.ref(path)
      .once("value", (snap) => {
        if (snap.exists()) {
          batch(() => {
            dispatch(setLotMeta(snap.val()));
            dispatch(setIsLotMeta(true));
            dispatch(setFormMode(false));
          });
        }
      })
      .then(() => history.push(path));
  };

  const onPublish = (err) => setMeta(err, publishPath);
  const onDraft = (err) => setMeta(err, draftsPath);

  if (updData.draft) {
    delete updData.draft;
    return db.ref(draftsPath).update(updData, onDraft);
  }

  if (!updData.draft) {
    delete updData.draft;
    return db.ref(publishPath).update(updData, onPublish);
  }
};

// lot open edit form & update from edit form

export const setEditLotForm = (lotID, isFormModeOn) => (dispatch) => {
  batch(() => {
    dispatch(setCurrentLotId(lotID));
    dispatch(setFormMode(!isFormModeOn));
  });
};

export const updateLotFromEditForm = (lotID, updData) => (dispatch) => {
  dispatch(setIsLotMeta(false));

  const onUpdate = (error) => {
    error ? console.log(error) : console.log("success");

    db.ref(`posts/${lotID}`).once("value", (snap) => {
      batch = () => {
        dispatch(setLotMeta(snap.val()));
        dispatch(setIsLotMeta(true));
        dispatch(setFormMode(false));
      };
    });
  };

  db.ref(`posts/${lotID}`).update(updData, onUpdate);
};

// get lotMeta & lotPhotos

export const getLotMeta = (lotID) => (dispatch) => {
  const getLotPhotos = async (lotMeta) => {
    const res = await fst
      .ref()
      .child("posts/" + lotMeta.uid + "/" + lotMeta.postid)
      .listAll();

    const photoList = [];

    await res.items.forEach((item) =>
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

    batch(() => {
      dispatch(setLotPhotos(photoList));
      dispatch(setLotMeta(lotMeta));
      dispatch(setIsLotPhotos(true));
      dispatch(setIsLotMeta(true));
      dispatch(setProgress(100));
    });
  };

  dispatch(setProgress(1));

  db.ref("posts/" + lotID).once("value", (snap) => {
    const lotMeta = snap.val();
    dispatch(setFormMode(false));
    getLotPhotos(lotMeta);
  });
};

// offer create / cancel create / publish

export const onOfferCreate = (lotMeta) => (dispatch) => {
  const offerID = db_offers.child(lotMeta.postid).push().key;
  dispatch(setNewOfferId(offerID));
};

export const onOfferCancel = (offerID, lotMeta) => (dispatch) => {
  db_offers.child(`${lotMeta.postid}/${offerID}`).remove();

  fst
    .ref()
    .child(`/offers/${lotMeta.postid}/${offerID}`)
    .listAll()
    .then((res) => res.items.forEach((item) => item.delete()));

  dispatch(setNewOfferId(null));
};

export const createOffer = (lotMeta, offerData) => (dispatch) => {
  const onCreate = (err) => {
    err ? console.log(err) : onOfferCreateSendMail(lotMeta, offerData); // if no error -> send mail to offer author
  };

  const offerUpdate = {};
  offerUpdate[`${lotMeta.postid}/${offerData.offerID}`] = offerData;

  db_offers.update(offerUpdate, onCreate);

  dispatch(setNewOfferId(null));
};

// offer prolong

export const add48hours = (lotMeta) => (dispatch) => {
  dispatch(setProgress(1));
  const onUpdate = (error) => {
    if (error) return console.log("ошибка записи");

    db.ref("posts/" + lotMeta.postid).once("value", (snap) => {
      batch(() => {
        dispatch(setLotMeta(snap.val()));
        dispatch(setIsLotMeta(true));
        dispatch(setProgress(100));
      });
    });
  };

  // const newExpiry = new Date(
  //   Date.parse(lotMeta.expireDate) + 2 * 24 * 60 * 60 * 1000
  // );

  const curDate = new Date();
  const newExpiry = new Date(curDate.setDate(curDate.getDate() + 7));

  db.ref("posts/" + lotMeta.postid).update({ expireDate: newExpiry }, onUpdate);
};

// offer accept by lotAuthor & confirm by offerAuthor

export const acceptConfirmOffer = (lotMeta, offerMeta, payload) => (
  dispatch
) => {
  dispatch(setProgress(1));

  const onSuccess = () => {
    db.ref(`posts/${lotMeta.postid}`).once("value", (snap) => {
      if (payload.acceptedOffer || payload.offerConfirmed) {
        onApproveByLotAuthor(lotMeta, offerMeta);
      }

      batch(() => {
        dispatch(setLotMeta(snap.val()));
        dispatch(setIsLotMeta(true));
        dispatch(setFormMode(false));
        dispatch(setProgress(100));
      });
    });
  };

  db.ref(`posts/${lotMeta.postid}`).update(payload, (err) =>
    err ? console.log(err) : onSuccess()
  );
};
