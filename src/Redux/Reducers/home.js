import { batch } from "react-redux";
import { db, db_offer, fst, fa } from "../../Utils/firebase";
import { toastsModel } from "../../Utils/toasts";
import { lotImageGetter } from "../../Utils/helpers";

import { setLotOffers, setSelectedOfferID, setSearchRes } from "./lots";

const SET_TITLE = "home/SET_TITLE";
const SET_IS_MOBILE = "home/SET_IS_MOBILE";
const SET_SCROLL = "home/SET_SCROLL";
const SET_PROGRESS = "home/SET_PROGRESS";
const SET_FORM_MODE = "home/SET_FORM_MODE";
const SET_IS_OWNER = "home/SET_IS_OWNER";
const SET_PROFILE = "home/SET_PROFILE";
const SET_IS_MODAL_ON = "home/SET_IS_MODAL_ON";
// const SET_NEW_MSGS_QTY = "home/SET_NEW_MSGS_QTY";
const SET_TOAST = "home/SET_TOAST";
const SET_TOAST_LIST = "home/SET_TOAST_LIST";
const SET_TOAST_NEW = "home/SET_TOAST_NEW";
// search
const SET_IS_SEARCH = "home/SET_IS_SEARCH";
const SET_LASTSRCH = "home/SET_LAST_SEARCH";
const SET_FILT_SEL = "home/SET_FILT_SEL";
const SET_ONSEARCH_MSG = "home/SET_ONSEARCH_MSG";

const initialState = {
  isMobile: false,
  scroll: false,
  title: "",
  progress: null,
  isFormModeOn: false,
  isOwner: false,
  profile: null,
  isModalOn: false,
  // toasts
  isToast: null,
  toastsList: null,
  toastsNew: 0,
  // search
  isSearching: false,
  lastSearch: "",
  filterSelected: "desc",
  onSearchMsg: "",
};

export const home = (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_MOBILE:
      return { ...state, isMobile: action.payload };

    case SET_SCROLL:
      return { ...state, scroll: action.payload };

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

    case SET_TOAST:
      return { ...state, isToast: action.payload };

    case SET_TOAST_LIST:
      return { ...state, toastsList: action.payload };

    case SET_TOAST_NEW:
      return { ...state, toastsNew: action.payload };

    // search

    case SET_IS_SEARCH:
      return { ...state, isSearching: action.payload };

    case SET_LASTSRCH:
      return { ...state, lastSearch: action.payload };

    case SET_FILT_SEL:
      return { ...state, filterSelected: action.payload };

    case SET_ONSEARCH_MSG:
      return { ...state, onSearchMsg: action.payload };

    default:
      return state;
  }
};

// ACTIONs
export const setIsMobile = (payload) => ({ type: SET_IS_MOBILE, payload });
export const setScroll = (payload) => ({ type: SET_SCROLL, payload });
export const setSiteTitle = (title) => ({ type: SET_TITLE, title });
export const setProgress = (payload) => ({ type: SET_PROGRESS, payload });
export const setIsModalOn = (payload) => ({ type: SET_IS_MODAL_ON, payload });
export const setFormMode = (mode) => ({ type: SET_FORM_MODE, mode });
const setIsOwner = (payload) => ({ type: SET_IS_OWNER, payload });
export const setProfile = (payload) => ({ type: SET_PROFILE, payload });
const setToast = (payload) => ({ type: SET_TOAST, payload });

const setIsSearching = (payload) => ({ type: SET_IS_SEARCH, payload });
export const setLastSearch = (payload) => ({ type: SET_LASTSRCH, payload });
const setSelectedFilter = (payload) => ({ type: SET_FILT_SEL, payload });
const setOnSearchMsg = (payload) => ({ type: SET_ONSEARCH_MSG, payload });

// THUNKs

export const setNewToast = (type, title, message, button) => (dispatch) => {
  dispatch(setToast({ type, title, message, button }));
};

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

// messages on search

const searchWorder = (query, param) => {
  const phraser = {
    none: `По вашему запросу ничего не найдено:`,
    ok: `Результаты поиска по запросу:`,
  };

  return phraser[param];
};

export const ctaSearch = (searchData) => (dispatch) => {
  batch(() => {
    dispatch(setIsSearching(true));
    dispatch(setSearchRes(null));
    dispatch(setLastSearch(searchData.query));
  });

  const queryKey = db.ref().child(`search/queries/`).push().key;

  const Success = () => {
    const failedSearch = () => {
      batch(() => {
        // dispatch(setSearchRes(null));
        dispatch(setOnSearchMsg(searchWorder(searchData.query, "none")));
        dispatch(setIsSearching(false));
      });
    };

    const timeout = setTimeout(failedSearch, 10000);

    db.ref(`search/results`).on("child_added", (added) => {
      if (added.key === queryKey) {
        db.ref(`search/results`).off();
        clearTimeout(timeout);

        //
        if (!added.exists() || added.val().hits.length === 0) {
          return failedSearch();
        }

        if (added.exists()) {
          const lotPromise = added.val().hits.map(async (item) => {
            // console.log(item.objectID);

            const lot = await db.ref(`posts/${item.objectID}`).once("value");

            // console.log(lot.val());

            const photoURLs = await lotImageGetter(lot.val());

            return { ...lot.val(), photoURLs };
          });

          Promise.all(lotPromise).then((res) => {
            batch(() => {
              dispatch(setSearchRes(res));
              dispatch(setOnSearchMsg(searchWorder(searchData.query, "ok")));
              dispatch(setIsSearching(false));
            });
          });
        }
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

export const handleSearchFilters = (filter) => (dispatch) => {
  dispatch(setSelectedFilter(filter));
};
