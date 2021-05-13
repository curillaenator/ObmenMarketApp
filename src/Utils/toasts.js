import { cssTransition } from "react-toastify";

export const slidein = cssTransition({
  enter: "slide-in-blurred-bottom",
  exit: "slide-out-blurred-top",
});

export const toastsModel = {
  offerSuccess: {
    title: "Готово!",
    msg: "Предложение добавлено",
  },
  offerAdded: {
    title: "Новое предложение!",
    msg: (title) => `К объявлению "${title}" предложили обмен`,
  },
  offerRemoved: {
    title: "Готово!",
    msg: "Предложение удалено",
  },
  offerApproved: {
    title: "Предложение принято!",
    msg: (lotTitle, offerTitle) => (
      <>
        <span
          style={{ fontWeight: 600, color: "#ffffff" }}
        >{`"${offerTitle}" `}</span>
        в обмен на
        <span
          style={{ fontWeight: 600, color: "#ffffff" }}
        >{` "${lotTitle}"`}</span>
      </>
    ),
  },
  offerConfirmed: {
    title: "Обмен подтвержден!",
    msg: (lotTitle, offerTitle) => (
      <>
        <span
          style={{ fontWeight: 600, color: "#ffffff" }}
        >{`"${lotTitle}" `}</span>
        в обмен на
        <span
          style={{ fontWeight: 600, color: "#ffffff" }}
        >{` "${offerTitle}"`}</span>
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
