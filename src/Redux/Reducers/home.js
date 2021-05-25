import { batch } from "react-redux";
import { db, db_offer, fst, fa } from "../../Utils/firebase";
import { toastsModel } from "../../Utils/toasts";

import { setLotOffers, setSelectedOfferID } from "./lots";

const SET_TITLE = "home/SET_TITLE";
const SET_PROGRESS = "home/SET_PROGRESS";
const SET_FORM_MODE = "home/SET_FORM_MODE";
const SET_IS_OWNER = "home/SET_IS_OWNER";
const SET_PROFILE = "home/SET_PROFILE";
const SET_IS_MODAL_ON = "home/SET_IS_MODAL_ON";
// const SET_NEW_MSGS_QTY = "home/SET_NEW_MSGS_QTY";
const SET_TOAST = "home/SET_TOAST";
const SET_TOAST_LIST = "home/SET_TOAST_LIST";
const SET_TOAST_NEW = "home/SET_TOAST_NEW";
const SET_LAST_SEARCH = "home/SET_LAST_SEARCH";
const SET_RESULTS = "home/SET_RESULTS";

const initialState = {
  title: "",
  progress: null,
  isFormModeOn: false,
  isOwner: false,
  profile: null,
  isModalOn: false,
  // newMsgsQty: {},
  isToast: null,
  toastsList: null,
  toastsNew: 0,
  lastSearch: "",
  results: null,
};

export const home = (state = initialState, action) => {
  switch (action.type) {
    case SET_TITLE:
      return { ...state, title: action.title };

    case SET_PROGRESS:
      return { ...state, progress: action.payload };

    case SET_FORM_MODE:
      return { ...state, isFormModeOn: action.mode };

    case SET_IS_OWNER:
      return { ...state, isOwner: action.payload };

    case SET_PROFILE:
      return { ...state, profile: action.payload };

    case SET_IS_MODAL_ON:
      return { ...state, isModalOn: action.payload };

    // case SET_NEW_MSGS_QTY:
    //   return { ...state, newMsgsQty: action.qty };

    case SET_TOAST:
      return { ...state, isToast: action.payload };

    case SET_TOAST_LIST:
      return { ...state, toastsList: action.payload };

    case SET_TOAST_NEW:
      return { ...state, toastsNew: action.payload };

    case SET_LAST_SEARCH:
      return { ...state, lastSearch: action.payload };

    case SET_RESULTS:
      return { ...state, results: action.payload };

    default:
      return state;
  }
};

// ACTIONs
// const setNewMsgsQty = (qty) => ({ type: SET_NEW_MSGS_QTY, qty });
export const setTitle = (title) => ({ type: SET_TITLE, title });
export const setProgress = (payload) => ({ type: SET_PROGRESS, payload });
export const setIsModalOn = (payload) => ({ type: SET_IS_MODAL_ON, payload });
export const setFormMode = (mode) => ({ type: SET_FORM_MODE, mode });
const setIsOwner = (payload) => ({ type: SET_IS_OWNER, payload });
export const setProfile = (payload) => ({ type: SET_PROFILE, payload });
const setToast = (payload) => ({ type: SET_TOAST, payload });
const setLastSearch = (payload) => ({ type: SET_LAST_SEARCH, payload });
const setResults = (payload) => ({ type: SET_RESULTS, payload });
// const setToastsList = (payload) => ({ type: SET_TOAST_LIST, payload });
// const setToastsNew = (payload) => ({ type: SET_TOAST_NEW, payload });

// THUNKs

export const setNewToast = (type, title, message, button) => (dispatch) => {
  dispatch(setToast({ type, title, message, button }));
};

// export const getNewMsgsQty = (ownerID) => (dispatch, getState) => {
// };

export const getProfile = (ownerID, matchedID) => (dispatch, getState) => {
  const id = matchedID ? matchedID : ownerID;
  const auth = fa.currentUser;

  if (!auth || auth.uid !== id) {
    return db.ref(`users/${id}`).once("value", (userMeta) => {
      batch(() => {
        dispatch(setProfile(userMeta.val()));
        dispatch(setIsOwner(false));
      });
    });
  }

  if (auth.uid === id) {
    return batch(() => {
      dispatch(setProfile(getState().auth.user));
      dispatch(setIsOwner(true));
    });
  }
};

export const realtimeToasts = (tst, history) => (dispatch, getState) => {
  if (tst.type === "offerAdded") {
    //
    // if recieve new offer for lot when on lot page
    //
    if (history.location.pathname.slice(1) === tst.toastLink) {
      const lotID = tst.toastLink.replace("posts/", "");

      db_offer
        .ref(`${lotID}/${tst.offerID}`)
        .once("value", async (newOffer) => {
          const photoPromises = await fst
            .ref()
            .child(`/offers/${lotID}/${newOffer.key}`)
            .listAll()
            .then((res) => res.items.map((item) => item.getDownloadURL()));
          const photoURLs = await Promise.all(photoPromises);

          dispatch(
            setLotOffers([
              ...(getState().lots.currentLotMeta.offers || []),
              { ...newOffer.val(), photoURLs },
            ])
          );
        })
        .then(() => {
          dispatch(
            setNewToast(
              "new",
              toastsModel.offerAdded.title,
              toastsModel.offerAdded.msg(tst.lotTitle),
              () => dispatch(setSelectedOfferID(tst.offerID))
            )
          );
        });
      // .then(() => {
      //   const ownerID = getState().auth.ownerID;
      //   db_notes.ref(`${ownerID}/${tst.toastID}`).remove();
      // });

      return;
    }

    // if reciev new offer for lot and not on lot page

    return dispatch(
      setNewToast(
        "new",
        toastsModel.offerAdded.title,
        toastsModel.offerAdded.msg(tst.lotTitle),
        () =>
          history.push(`${tst.toastLink}?action=view&offerID=${tst.offerID}`)
      )
    );
  }

  if (tst.type === "offerApproved") {
    return dispatch(
      setNewToast(
        "new",
        toastsModel.offerApproved.title,
        toastsModel.offerApproved.msg(tst.lotTitle, tst.offerTitle),
        () => {
          if (history.location.pathname.slice(1) === tst.toastLink) return null;
          return history.push(tst.toastLink);
        }
      )
    );
  }

  if (tst.type === "offerConfirmed") {
    return dispatch(
      setNewToast(
        "new",
        toastsModel.offerConfirmed.title,
        toastsModel.offerConfirmed.msg(tst.lotTitle, tst.offerTitle),
        null
        // () => history.push(tst.toastLink)
      )
    );
  }
};

export const getToastList = (ownerID) => (dispatch) => {
  //   db_notes.ref(ownerID).on("child_added", (notes) => {
  //     const notesArr = Object.keys(notes.val()).map(
  //       (noteID) => notes.val()[noteID]
  //     );
  //     dispatch(setToastsList(notes.val()));
  //   });
};

export const ctaSearch = (searchData) => (dispatch) => {
  dispatch(setLastSearch(searchData.query));

  const queryKey = db.ref().child(`search/queries/`).push().key;

  const Success = () => {
    db.ref(`search/results`).on("child_added", (added) => {
      console.log(added.val());

      if (added.key === queryKey) {
        dispatch(setResults(added.val()));
        return db.ref(`search/results`).off();
      }
    });
  };

  const Failure = (err) => {
    console.log(err);
  };

  db.ref(`search/queries/${queryKey}`).update(searchData, (err) =>
    err ? Failure(err) : Success()
  );
};
