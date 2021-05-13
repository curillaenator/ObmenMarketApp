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
    msg: (title) => `К объявлению ${title} предложили обмен`,
  },
  offerRemoved: {
    title: "Готово!",
    msg: "Предложение удалено",
  },
};
