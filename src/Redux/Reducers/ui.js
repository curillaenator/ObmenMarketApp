import cta_idle from "../../Assets/Icons/cta_idle.svg";
import cta_hover from "../../Assets/Icons/cta_hover.svg";
import cta_clicked from "../../Assets/Icons/cta_clicked.svg";
import cta_active from "../../Assets/Icons/cta_active.svg";
import cta_disabled from "../../Assets/Icons/cta_disabled.svg";

import lotdraft_idle from "../../Assets/Icons/draft_idle.svg";
import lotdraft_hover from "../../Assets/Icons/draft_hover.svg";
import lotdraft_clicked from "../../Assets/Icons/draft_clicked.svg";
import lotdraft_active from "../../Assets/Icons/draft_active.svg";
import lotdraft_disabled from "../../Assets/Icons/draft_disabled.svg";

import lotextend_idle from "../../Assets/Icons/extend_idle.svg";
import lotextend_hover from "../../Assets/Icons/extend_hover.svg";
import lotextend_clicked from "../../Assets/Icons/extend_clicked.svg";
import lotextend_active from "../../Assets/Icons/extend_active.svg";
import lotextend_disabled from "../../Assets/Icons/extend_disabled.svg";

import lotpublish_idle from "../../Assets/Icons/pub_idle.svg";
import lotpublish_hover from "../../Assets/Icons/pub_hover.svg";
import lotpublish_clicked from "../../Assets/Icons/pub_clicked.svg";
import lotpublish_active from "../../Assets/Icons/pub_active.svg";
import lotpublish_disabled from "../../Assets/Icons/pub_disabled.svg";

import usericon from "../../Assets/Icons/user.svg";
import tel from "../../Assets/Icons/tel.svg";
import email from "../../Assets/Icons/mail.svg";
import country from "../../Assets/Icons/country.svg";
import city from "../../Assets/Icons/city.svg";

import time from "../../Assets/Icons/modal_time.svg";
import rock from "../../Assets/Icons/rock.svg";

const initialState = {
  icons: {
    cta: {
      idle: cta_idle,
      hover: cta_hover,
      clicked: cta_clicked,
      active: cta_active,
      disabled: cta_disabled,
    },
    lotdraft: {
      idle: lotdraft_idle,
      hover: lotdraft_hover,
      clicked: lotdraft_clicked,
      active: lotdraft_active,
      disabled: lotdraft_disabled,
    },
    lotextend: {
      idle: lotextend_idle,
      hover: lotextend_hover,
      clicked: lotextend_clicked,
      active: lotextend_active,
      disabled: lotextend_disabled,
    },
    lotpublish: {
      idle: lotpublish_idle,
      hover: lotpublish_hover,
      clicked: lotpublish_clicked,
      active: lotpublish_active,
      disabled: lotpublish_disabled,
    },
    check: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
      </svg>
    ),
    google: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
      >
        <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032 s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2 C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
      </svg>
    ),
    search: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="black"
      >
        <path d="M10.4 18.6548C11.8974 18.6548 13.3026 18.2583 14.5333 17.5669L18.4 21.4103C18.8 21.8068 19.3538 22 19.9077 22C21.1077 22 22 21.0849 22 19.9156C22 19.3767 21.8154 18.848 21.4051 18.4413L17.5692 14.6385C18.3487 13.3777 18.8 11.9034 18.8 10.3274C18.8 5.76207 15.0154 2 10.4 2C5.78462 2 2 5.76207 2 10.3274C2 14.9029 5.78462 18.6548 10.4 18.6548ZM10.4 15.7265C7.39487 15.7265 4.95385 13.3066 4.95385 10.3274C4.95385 7.35841 7.39487 4.92832 10.4 4.92832C13.4051 4.92832 15.8462 7.35841 15.8462 10.3274C15.8462 13.3066 13.4051 15.7265 10.4 15.7265Z" />
      </svg>
    ),
    delete: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path fill="#FFA9AB" d="M19 8H5v11a3 3 0 003 3h8a3 3 0 003-3V8z" />
        <path
          fill="#FF2B2B"
          d="M10 12a1 1 0 00-1 1v4a1 1 0 102 0v-4a1 1 0 00-1-1zM14 12a1 1 0 00-1 1v4a1 1 0 102 0v-4a1 1 0 00-1-1z"
        />
        <path
          fill="#FF2B2B"
          fillRule="evenodd"
          d="M8 6V5a3 3 0 013-3h2a3 3 0 013 3v1h3a1 1 0 110 2H5a1 1 0 010-2h3zm2-1a1 1 0 011-1h2a1 1 0 011 1v1h-4V5z"
          clipRule="evenodd"
        />
      </svg>
    ),
    back: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          fill="#D5B5FF"
          d="M1 8.822c0-2.738 0-4.107.533-5.153a4.889 4.889 0 012.136-2.136C4.715 1 6.084 1 8.822 1h6.356c2.738 0 4.107 0 5.153.533a4.889 4.889 0 012.136 2.136C23 4.715 23 6.084 23 8.822v6.356c0 2.738 0 4.107-.533 5.153a4.889 4.889 0 01-2.136 2.136C19.285 23 17.916 23 15.178 23H8.822c-2.738 0-4.107 0-5.153-.533a4.889 4.889 0 01-2.136-2.136C1 19.285 1 17.916 1 15.178V8.822z"
        />
        <path
          fill="#7000FF"
          fillRule="evenodd"
          d="M14.59 7.366c.547.488.547 1.28 0 1.768L11.38 12l3.21 2.866c.547.488.547 1.28 0 1.768a1.521 1.521 0 01-1.98 0l-4.2-3.75a1.158 1.158 0 010-1.768l4.2-3.75a1.521 1.521 0 011.98 0z"
          clipRule="evenodd"
        />
      </svg>
    ),
    share: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          fill="#D5B5FF"
          d="M3 14.162v2.676c0 .528 0 .982.03 1.357.033.395.104.789.297 1.167a3 3 0 001.311 1.311c.378.193.772.264 1.167.296.375.031.83.031 1.356.031h9.678c.527 0 .982 0 1.356-.03.395-.033.789-.104 1.167-.297a3 3 0 001.311-1.311c.193-.378.264-.772.296-1.167.031-.375.031-.83.031-1.356V14.16c0-.527 0-.981-.03-1.356-.033-.395-.104-.789-.297-1.167a3 3 0 00-1.311-1.311c-.378-.193-.772-.264-1.167-.296C17.82 10 17.365 10 16.839 10H7.16c-.527 0-.981 0-1.356.03-.395.033-.789.104-1.167.297a3 3 0 00-1.311 1.311c-.193.378-.264.772-.296 1.167C3 13.18 3 13.635 3 14.162z"
        />
        <path
          fill="#7000FF"
          d="M9.707 7.707a1 1 0 01-1.414-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L13 6.414V16a1 1 0 11-2 0V6.414L9.707 7.707z"
        />
      </svg>
    ),
    edit: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          fill="#7000FF"
          d="M4.775 14.658l-1.716 5.016a1 1 0 001.268 1.27l5.022-1.71c.435-.147.83-.393 1.155-.718l.506-.506L6 13l-.508.508a3 3 0 00-.717 1.15z"
        />
        <path fill="#D5B5FF" d="M14 5l-8 8 5.01 5.01 8-8L14 5z" />
        <path
          fill="#7000FF"
          d="M15.119 3.881L14 5l5.01 5.01 1.119-1.119a3 3 0 000-4.242l-.768-.768a3 3 0 00-4.242 0z"
        />
      </svg>
    ),
    fold: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className="cta_path1"
          d="M0 13C0 5.8203 5.8203 0 13 0C20.1797 0 26 5.8203 26 13C26 20.1797 20.1797 26 13 26C5.8203 26 0 20.1797 0 13ZM12.6196 8.18081C12.1119 7.67313 11.2888 7.67313 10.7812 8.18081C10.2735 8.68849 10.2735 9.51161 10.7812 10.0193L13.7619 13L10.7812 15.9808C10.2735 16.4885 10.2735 17.3116 10.7812 17.8193C11.2888 18.327 12.1119 18.327 12.6196 17.8193L16.5196 13.9193C17.0273 13.4116 17.0273 12.5885 16.5196 12.0808L12.6196 8.18081Z"
        />
      </svg>
    ),
    cancel: (
      <svg
        width="27"
        height="27"
        viewBox="0 0 27 27"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 13.3333C0 5.96954 5.96954 0 13.3333 0C20.6971 0 26.6667 5.96954 26.6667 13.3333C26.6667 20.6971 20.6971 26.6667 13.3333 26.6667C5.96954 26.6667 0 20.6971 0 13.3333ZM10.2761 8.39052C9.75544 7.86983 8.91122 7.86983 8.39052 8.39052C7.86983 8.91122 7.86983 9.75544 8.39052 10.2761L11.4477 13.3333L8.39052 16.3905C7.86983 16.9112 7.86983 17.7554 8.39052 18.2761C8.91122 18.7968 9.75544 18.7968 10.2761 18.2761L13.3333 15.219L16.3905 18.2761C16.9112 18.7968 17.7554 18.7968 18.2761 18.2761C18.7968 17.7554 18.7968 16.9112 18.2761 16.3905L15.219 13.3333L18.2761 10.2761C18.7968 9.75544 18.7968 8.91122 18.2761 8.39052C17.7554 7.86983 16.9112 7.86983 16.3905 8.39052L13.3333 11.4477L10.2761 8.39052Z" />
      </svg>
    ),
    toasts: {
      new: (
        <svg
          className="toastImage"
          xmlns="http://www.w3.org/2000/svg"
          width="52"
          height="52"
          fill="none"
          viewBox="0 0 52 52"
        >
          <rect width="44" height="44" x="4" y="4" fill="#7000FF" rx="22" />
          <path
            fill="#fff"
            d="M16 25.275c0 .94.78 1.705 1.721 1.705.95 0 1.721-.765 1.721-1.705v-.519c0-1.6 1.038-2.514 2.83-2.514h6.512v1.837c0 .765.479 1.257 1.233 1.257.363 0 .62-.123.842-.307l4.134-3.508c.56-.475.55-1.266 0-1.723l-4.134-3.5a1.286 1.286 0 00-.842-.298c-.754 0-1.233.483-1.233 1.248v1.662h-6.405c-3.984 0-6.379 1.995-6.379 5.31v1.055zm7.216 2.637c0-.765-.479-1.248-1.233-1.248-.363 0-.63.123-.842.299l-4.143 3.507c-.56.475-.541 1.266 0 1.732l4.143 3.49c.213.185.479.308.842.308.754 0 1.233-.483 1.233-1.257v-1.627h6.397c3.992 0 6.387-1.995 6.387-5.31V26.76c0-.94-.78-1.714-1.73-1.714s-1.712.774-1.712 1.714v.51c0 1.6-1.047 2.523-2.83 2.523h-6.512v-1.88z"
          />
        </svg>
      ),
      success: (
        <svg
          className="toastImage"
          width="52"
          height="52"
          viewBox="0 0 52 52"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M26 4.33337C14.0338 4.33337 4.33334 14.0339 4.33334 26C4.33334 37.9662 14.0338 47.6667 26 47.6667C37.9662 47.6667 47.6667 37.9662 47.6667 26C47.6667 14.0339 37.9662 4.33337 26 4.33337Z"
            fill="#33C74C"
          />
          <path
            d="M34.0321 20.1346C34.8782 20.9807 34.8782 22.3526 34.0321 23.1987L25.3654 31.8654C24.5193 32.7115 23.1474 32.7115 22.3013 31.8654L17.9679 27.5321C17.1218 26.6859 17.1218 25.3141 17.9679 24.4679C18.8141 23.6218 20.1859 23.6218 21.0321 24.4679L23.8333 27.2692L30.9679 20.1346C31.8141 19.2885 33.1859 19.2885 34.0321 20.1346Z"
            fill="white"
          />
        </svg>
      ),
      info: (
        <svg
          className="toastImage"
          width="52"
          height="52"
          viewBox="0 0 52 52"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M26 4.33331C14.0338 4.33331 4.33331 14.0338 4.33331 26C4.33331 37.9661 14.0338 47.6666 26 47.6666C37.9661 47.6666 47.6666 37.9661 47.6666 26C47.6666 14.0338 37.9661 4.33331 26 4.33331Z"
            fill="#7000FF"
          />
          <path
            d="M26 15.1667C24.8034 15.1667 23.8333 16.1367 23.8333 17.3334C23.8333 18.53 24.8034 19.5 26 19.5C27.1966 19.5 28.1666 18.53 28.1666 17.3334C28.1666 16.1367 27.1966 15.1667 26 15.1667Z"
            fill="white"
          />
          <path
            d="M28.1666 26C28.1666 24.8034 27.1966 23.8334 26 23.8334C24.8034 23.8334 23.8333 24.8034 23.8333 26V34.6667C23.8333 35.8633 24.8034 36.8334 26 36.8334C27.1966 36.8334 28.1666 35.8633 28.1666 34.6667V26Z"
            fill="white"
          />
        </svg>
      ),
      warning: (
        <svg
          className="toastImage"
          xmlns="http://www.w3.org/2000/svg"
          width="52"
          height="52"
          fill="none"
          viewBox="0 0 52 52"
        >
          <path
            fill="#FF701F"
            d="M20.186 10.096c2.395-4.793 9.234-4.793 11.629 0l12.993 25.998c2.16 4.322-.983 9.406-5.815 9.406H13.007c-4.832 0-7.974-5.084-5.815-9.406l12.994-25.998z"
          />
          <path
            fill="#fff"
            d="M26 17.333c-1.197 0-2.167.97-2.167 2.167v8.667a2.167 2.167 0 104.334 0V19.5c0-1.197-.97-2.167-2.167-2.167zM26 32.5a2.167 2.167 0 100 4.333 2.167 2.167 0 000-4.333z"
          />
        </svg>
      ),
      error: (
        <svg
          className="toastImage"
          xmlns="http://www.w3.org/2000/svg"
          width="52"
          height="52"
          fill="none"
          viewBox="0 0 52 52"
        >
          <path
            fill="#FF2B2B"
            d="M20.186 10.096c2.395-4.793 9.234-4.793 11.629 0l12.993 25.998c2.16 4.322-.983 9.406-5.815 9.406H13.007c-4.832 0-7.974-5.084-5.814-9.406l12.993-25.998z"
          />
          <path
            fill="#fff"
            d="M26 17.333c-1.197 0-2.167.97-2.167 2.167v8.667a2.167 2.167 0 104.334 0V19.5c0-1.197-.97-2.167-2.167-2.167zM26 32.5a2.167 2.167 0 100 4.333 2.167 2.167 0 000-4.333z"
          />
        </svg>
      ),
    },
  },
  formFull: {
    offer: {
      title: "Что вы хотите предложить к обмену?",
      name: "Название",
      category: "Категория товара",
      categorySub:
        "Укажите через запятую категории, к которым относится ваше предложение",
      price: "Примерная ценовая категория",
      priceSub:
        "Так пользователям будет легче понимать во сколько вы оцениваете своё предложение, чтобы обмен был равноценным",
    },
    description: {
      // title: "Что вы хотите предложить к обмену?",
      title: "Опишите ваше предложение",
      description: "Описание",
      descriptionSub:
        "Во время редактирования, выделите текст, который хотите сделать заголовком, жирным или ссылкой",
    },
    wish: {
      title: "Что вы хотели бы получить взамен?",
      category: "Категории товаров",
      categorySub:
        "Укажите через запятую категории товаров, на которые вы готовы меняться",
      addPayment: "Сумма доплаты",
      addPaymentSub:
        "Если будете готовы доплатить за что-то, укажите максимальную сумму",
    },
    notation:
      "Вы можете продолжить заполнение формы позже, сохраненный черновик будет находится в вашем профиле",
  },
  formProfile: {
    fullname: {
      icon: usericon,
      sup: "Полное имя",
      placeholder: "Введите ваше имя",
    },
    tel: {
      icon: tel,
      sup: "Телефон",
      placeholder: "Укажите ваш номер телефона для связи",
    },
    email: {
      icon: email,
      sup: "Электронная почта",
      placeholder: "Ваша электронная почта",
    },
    country: {
      icon: country,
      sup: "Страна",
      placeholder: "Из какой вы страны?",
    },
    city: { icon: city, sup: "Город", placeholder: "Из какого вы города?" },
  },
  formOffer: {
    title: "Что вы хотите предложить взамен?",
    name: { placeholder: "Название" },
    description: { placeholder: "Описание" },
    overprice: { title: "Согласны на доплату при обмене?" },
  },
  addTimeModal: {
    addTimeP1: {
      icon: time,
      title: "Продление объявления на 48 часов",
      text: "К счетчику времени публикации вашего объявления будет добавлено 48 часов с момента продления. Таким образом вы можете успеть получить больше интересных предложений",
    },
    addTimeP2: {
      icon: rock,
      title: "При βeta-тестировании всё бесплатно!",
      text: (
        <>
          <div style={{ marginBottom: 16 }}>
            На данный момент все платные фичи ресурса obmen.market
            предоставляются абсолютно бесплатно, т.к. мы собираем много важной
            для нас информации, которая поможет сделать сайт намного удобнее и
            полезней!
          </div>
          <div>
            Спасибо за проявленный интерес к платной услуге,{" "}
            <span style={{ color: "#fff", fontWeight: 700 }}>
              пожалуйста, продолжайте пользоваться сайтом в обычном режиме и
              нажимать любые кнопки
            </span>
            , если вы чувствуете в этом необходимость!
          </div>
        </>
      ),
    },
  },
};

export const ui = (state = initialState) => state;
