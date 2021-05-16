import { cssTransition } from "react-toastify";

// ANIMATION

export const slidein = cssTransition({
  enter: "slide-in-blurred-bottom",
  exit: "slide-out-blurred-top",
});

// MESSAGES STYLES

// const white600 = { fontWeight: 600, color: "#ffffff" };
const white600 = { fontWeight: 600 };

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
  offerCanceled: {
    title: "Готово!",
    msg: "Обмен отменен",
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
  profileUpdated: {
    title: "Готово!",
    msg: "Изменения профиля сохранены",
  },
  login: {
    title: "Готово!",
    msg: "Вы успешно авторизировались",
  },
  loginFailed: {
    title: "Здраствуйте!",
    msg: "Вы не авторизированы! Пожалуйста, авторизируйтесь, чтобы продолжить пользоваться нашим сервисом",
  },
  logout: {
    title: "Вы вышли из своего профиля!",
    msg: "Пожалуйста, авторизируйтесь, чтобы продолжить пользоваться нашим сервисом",
  },
  newUser: {
    title: "Ура! Вы успешно авторизировались!",
    msg: "Обменивайтесь всем со всеми!",
  }
};
