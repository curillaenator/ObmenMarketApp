import { cssTransition } from "react-toastify";

// ANIMATION

export const slidein = cssTransition({
  enter: "slide-in-blurred-bottom",
  exit: "slide-out-blurred-top",
});

// MESSAGES STYLES

const white600 = { fontWeight: 600, color: "#ffffff" };
// const default600 = { fontWeight: 600 };

// MESSAGES

export const toastsModel = {
  commonError: {
    title: "Ошибка!",
    msg: "Что-то пошло не так",
  },
  offerSuccess: {
    title: "Готово!",
    msg: "Предложение добавлено",
  },
  offerAdded: {
    title: "Новое предложение!",
    msg: (title) => (
      <>
        К объявлению
        <span style={white600}>{` "${title}" `}</span>
        предложили обмен
      </>
    ),
  },
  offerRemoved: {
    title: "Готово!",
    msg: "Предложение удалено",
  },
  offerApproved: {
    title: "Предложение принято!",
    msg: (lotTitle, offerTitle) => (
      <>
        <span style={white600}>{`"${offerTitle}" `}</span>в обмен на
        <span style={white600}>{` "${lotTitle}"`}</span>
      </>
    ),
  },
  offerConfirmed: {
    title: "Обмен подтвержден!",
    msg: (lotTitle, offerTitle) => (
      <>
        <span style={white600}>{`"${lotTitle}" `}</span>в обмен на
        <span style={white600}>{` "${offerTitle}"`}</span>
      </>
    ),
  },
  lotAdded: {
    title: "Готово!",
    msg: "Объявление создано",
  },
  lotEdited: {
    title: "Готово!",
    msg: "Изменения сохранены",
  },
  lotDeleted: {
    title: "Готово!",
    msg: "Объявление удалено",
  },
  lotExpand: {
    title: "Готово!",
    msg: "Срок публикации объявления продлен",
  },
};

// COMMON TOASTS
