import { colors } from "../../Utils/palette";

import usericon from "../../Assets/Icons/user.svg";
import tel from "../../Assets/Icons/tel.svg";
import email from "../../Assets/Icons/mail.svg";
import country from "../../Assets/Icons/country.svg";
import city from "../../Assets/Icons/city.svg";

const initialState = {
  icons: {
    cta: {
      idle: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.77431 14.6585L3.05859 19.6738C2.78975 20.4597 3.54066 21.2117 4.32695 20.9441L9.3489 19.235C9.78357 19.087 10.1785 18.8413 10.5032 18.5167L11.0096 18.0105L5.99961 13.0002L5.49191 13.5078C5.16801 13.8315 4.92254 14.2251 4.77431 14.6585Z"
            fill="white"
          />
          <path
            d="M14 5L6 13L11.01 18.0102L19.01 10.0102L14 5Z"
            fill="white"
            fillOpacity="0.4"
          />
          <path
            d="M15.1186 3.8812L14 4.9999L19.01 10.0101L20.1289 8.89118C21.3004 7.71961 21.3003 5.82021 20.1288 4.64866L19.3614 3.88117C18.1898 2.70952 16.2902 2.70953 15.1186 3.8812Z"
            fill="white"
          />
        </svg>
      ),
      active: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19 8H5V19C5 20.6569 6.34315 22 8 22H16C17.6569 22 19 20.6569 19 19V8Z"
            fill="#FFA9AB"
          />
          <path
            d="M10 12C9.44772 12 9 12.4477 9 13V17C9 17.5523 9.44772 18 10 18C10.5523 18 11 17.5523 11 17V13C11 12.4477 10.5523 12 10 12Z"
            fill="#FF2B2B"
          />
          <path
            d="M14 12C13.4477 12 13 12.4477 13 13V17C13 17.5523 13.4477 18 14 18C14.5523 18 15 17.5523 15 17V13C15 12.4477 14.5523 12 14 12Z"
            fill="#FF2B2B"
          />
          <path
            d="M8 6V5C8 3.34315 9.34315 2 11 2H13C14.6569 2 16 3.34315 16 5V6H19C19.5523 6 20 6.44772 20 7C20 7.55228 19.5523 8 19 8H5C4.44772 8 4 7.55228 4 7C4 6.44772 4.44772 6 5 6H8ZM10 5C10 4.44772 10.4477 4 11 4H13C13.5523 4 14 4.44772 14 5V6H10V5Z"
            fill="#FF2B2B"
          />
        </svg>
      ),
      disabled: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.77431 14.6585L3.05859 19.6738C2.78975 20.4597 3.54066 21.2117 4.32695 20.9441L9.3489 19.235C9.78357 19.087 10.1785 18.8413 10.5032 18.5167L11.0096 18.0105L5.99961 13.0002L5.49191 13.5078C5.16801 13.8315 4.92254 14.2251 4.77431 14.6585Z"
            fill="#b5b1bf"
          />
          <path
            d="M14 5L6 13L11.01 18.0102L19.01 10.0102L14 5Z"
            fill="#b5b1bf"
            fillOpacity="0.4"
          />
          <path
            d="M15.1186 3.8812L14 4.9999L19.01 10.0101L20.1289 8.89118C21.3004 7.71961 21.3003 5.82021 20.1288 4.64866L19.3614 3.88117C18.1898 2.70952 16.2902 2.70953 15.1186 3.8812Z"
            fill="#b5b1bf"
          />
        </svg>
      ),
    },
    lotextend: {
      idle: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="#fff"
            fillOpacity=".4"
            d="M20.7 13.3a8.7 8.7 0 11-17.4 0 8.7 8.7 0 0117.4 0z"
          />
          <path
            fill="#fff"
            d="M10.912 9.167c0-.72.487-1.305 1.088-1.305.6 0 1.088.585 1.088 1.305v3.915c0 .721-.487 1.305-1.088 1.305-.6 0-1.088-.584-1.088-1.305V9.168z"
          />
          <path
            fill="#fff"
            d="M10.912.25c-.6 0-1.087.541-1.087 1.208 0 .668.487 1.209 1.087 1.209h2.175c.601 0 1.088-.541 1.088-1.209 0-.667-.487-1.208-1.088-1.208h-2.175zm8.265 2.356c-.48-.4-1.162-.292-1.522.242-.36.534-.263 1.291.217 1.692l1.088.906c.48.4 1.162.292 1.522-.242.36-.534.263-1.291-.217-1.692l-1.088-.906z"
          />
        </svg>
      ),
      active: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="#fff"
            fillOpacity=".4"
            d="M20.7 13.3a8.7 8.7 0 11-17.4 0 8.7 8.7 0 0117.4 0z"
          />
          <path
            fill="#fff"
            d="M10.912 9.167c0-.72.487-1.305 1.088-1.305.6 0 1.088.585 1.088 1.305v3.915c0 .721-.487 1.305-1.088 1.305-.6 0-1.088-.584-1.088-1.305V9.168z"
          />
          <path
            fill="#fff"
            d="M10.912.25c-.6 0-1.087.541-1.087 1.208 0 .668.487 1.209 1.087 1.209h2.175c.601 0 1.088-.541 1.088-1.209 0-.667-.487-1.208-1.088-1.208h-2.175zm8.265 2.356c-.48-.4-1.162-.292-1.522.242-.36.534-.263 1.291.217 1.692l1.088.906c.48.4 1.162.292 1.522-.242.36-.534.263-1.291-.217-1.692l-1.088-.906z"
          />
        </svg>
      ),
      disabled: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="#fff"
            fillOpacity=".4"
            d="M20.7 13.3a8.7 8.7 0 11-17.4 0 8.7 8.7 0 0117.4 0z"
          />
          <path
            fill="#fff"
            d="M10.912 9.167c0-.72.487-1.305 1.088-1.305.6 0 1.088.585 1.088 1.305v3.915c0 .721-.487 1.305-1.088 1.305-.6 0-1.088-.584-1.088-1.305V9.168z"
          />
          <path
            fill="#fff"
            d="M10.912.25c-.6 0-1.087.541-1.087 1.208 0 .668.487 1.209 1.087 1.209h2.175c.601 0 1.088-.541 1.088-1.209 0-.667-.487-1.208-1.088-1.208h-2.175zm8.265 2.356c-.48-.4-1.162-.292-1.522.242-.36.534-.263 1.291.217 1.692l1.088.906c.48.4 1.162.292 1.522-.242.36-.534.263-1.291-.217-1.692l-1.088-.906z"
          />
        </svg>
      ),
    },
    lotpublish: {
      idle: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="#fff"
            fillOpacity="0.4"
            d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z"
          />
          <path
            fill="#fff"
            d="M15.707 9.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-2-2a1 1 0 111.414-1.414L11 12.586l3.293-3.293a1 1 0 011.414 0z"
          />
        </svg>
      ),
      active: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="#fff"
            fillOpacity="0.4"
            d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z"
          />
          <path
            fill="#fff"
            d="M15.707 9.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-2-2a1 1 0 111.414-1.414L11 12.586l3.293-3.293a1 1 0 011.414 0z"
          />
        </svg>
      ),
      disabled: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="#fff"
            fillOpacity="0.4"
            d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z"
          />
          <path
            fill="#fff"
            d="M15.707 9.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-2-2a1 1 0 111.414-1.414L11 12.586l3.293-3.293a1 1 0 011.414 0z"
          />
        </svg>
      ),
    },
    loadmore: {
      idle: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="#fff"
            fillOpacity=".4"
            d="M3 14.162v2.676c0 .528 0 .982.03 1.357.033.395.104.789.297 1.167a3 3 0 001.311 1.311c.378.193.772.264 1.167.296.375.031.83.031 1.356.031h9.678c.527 0 .982 0 1.356-.03.395-.033.789-.104 1.167-.297a3 3 0 001.311-1.311c.193-.378.264-.772.296-1.167.031-.375.031-.83.031-1.356V14.16c0-.527 0-.981-.03-1.356-.033-.395-.104-.789-.297-1.167a3 3 0 00-1.311-1.311c-.378-.193-.772-.264-1.167-.296C17.82 10 17.365 10 16.839 10H7.16c-.527 0-.981 0-1.356.03-.395.033-.789.104-1.167.297a3 3 0 00-1.311 1.311c-.193.378-.264.772-.296 1.167C3 13.18 3 13.635 3 14.162z"
          />
          <path
            fill="#fff"
            d="M8.293 13.707a1 1 0 111.414-1.414L11 13.586V4a1 1 0 112 0v9.586l1.293-1.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3z"
          />
        </svg>
      ),
      disabled: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="#b5b1bf"
            fillOpacity=".4"
            d="M3 14.162v2.676c0 .528 0 .982.03 1.357.033.395.104.789.297 1.167a3 3 0 001.311 1.311c.378.193.772.264 1.167.296.375.031.83.031 1.356.031h9.678c.527 0 .982 0 1.356-.03.395-.033.789-.104 1.167-.297a3 3 0 001.311-1.311c.193-.378.264-.772.296-1.167.031-.375.031-.83.031-1.356V14.16c0-.527 0-.981-.03-1.356-.033-.395-.104-.789-.297-1.167a3 3 0 00-1.311-1.311c-.378-.193-.772-.264-1.167-.296C17.82 10 17.365 10 16.839 10H7.16c-.527 0-.981 0-1.356.03-.395.033-.789.104-1.167.297a3 3 0 00-1.311 1.311c-.193.378-.264.772-.296 1.167C3 13.18 3 13.635 3 14.162z"
          />
          <path
            fill="#b5b1bf"
            d="M8.293 13.707a1 1 0 111.414-1.414L11 13.586V4a1 1 0 112 0v9.586l1.293-1.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3z"
          />
        </svg>
      ),
    },
    chat: {
      idle: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.5 17.9817V10.5444C3.5 8.42869 3.5 7.37081 3.91175 6.5627C4.27394 5.85187 4.85187 5.27394 5.5627 4.91175C6.37081 4.5 7.42869 4.5 9.54444 4.5H14.4556C16.5713 4.5 17.6292 4.5 18.4373 4.91175C19.1481 5.27394 19.7261 5.85187 20.0882 6.5627C20.5 7.37081 20.5 8.42869 20.5 10.5444V11.6778C20.5 13.7935 20.5 14.8514 20.0882 15.6595C19.7261 16.3704 19.1481 16.9483 18.4373 17.3105C17.6292 17.7222 16.5713 17.7222 14.4556 17.7222H10.4503C9.97694 17.7222 9.74024 17.7222 9.51814 17.7768C9.32125 17.8252 9.13344 17.905 8.96191 18.0131C8.76841 18.135 8.60407 18.3053 8.27538 18.646L7.39788 19.5555C6.17948 20.8183 5.57028 21.4497 5.0455 21.4976C4.59034 21.5392 4.14308 21.3586 3.84438 21.0127C3.5 20.6138 3.5 19.7364 3.5 17.9817Z"
            fill="#ffffff"
            fillOpacity="0.4"
          />
          <path
            d="M8.22233 12.5282C9.00473 12.5282 9.639 11.8939 9.639 11.1115C9.639 10.3291 9.00473 9.69482 8.22233 9.69482C7.43993 9.69482 6.80566 10.3291 6.80566 11.1115C6.80566 11.8939 7.43993 12.5282 8.22233 12.5282ZM15.778 12.5282C16.5604 12.5282 17.1947 11.8939 17.1947 11.1115C17.1947 10.3291 16.5604 9.69482 15.778 9.69482C14.9956 9.69482 14.3613 10.3291 14.3613 11.1115C14.3613 11.8939 14.9956 12.5282 15.778 12.5282ZM13.4173 11.1115C13.4173 11.8939 12.7831 12.5282 12.0007 12.5282C11.2182 12.5282 10.584 11.8939 10.584 11.1115C10.584 10.3291 11.2182 9.69482 12.0007 9.69482C12.7831 9.69482 13.4173 10.3291 13.4173 11.1115Z"
            fill="#ffffff"
          />
        </svg>
      ),
      disabled: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.5 17.9817V10.5444C3.5 8.42869 3.5 7.37081 3.91175 6.5627C4.27394 5.85187 4.85187 5.27394 5.5627 4.91175C6.37081 4.5 7.42869 4.5 9.54444 4.5H14.4556C16.5713 4.5 17.6292 4.5 18.4373 4.91175C19.1481 5.27394 19.7261 5.85187 20.0882 6.5627C20.5 7.37081 20.5 8.42869 20.5 10.5444V11.6778C20.5 13.7935 20.5 14.8514 20.0882 15.6595C19.7261 16.3704 19.1481 16.9483 18.4373 17.3105C17.6292 17.7222 16.5713 17.7222 14.4556 17.7222H10.4503C9.97694 17.7222 9.74024 17.7222 9.51814 17.7768C9.32125 17.8252 9.13344 17.905 8.96191 18.0131C8.76841 18.135 8.60407 18.3053 8.27538 18.646L7.39788 19.5555C6.17948 20.8183 5.57028 21.4497 5.0455 21.4976C4.59034 21.5392 4.14308 21.3586 3.84438 21.0127C3.5 20.6138 3.5 19.7364 3.5 17.9817Z"
            fill="#b5b1bf"
            fillOpacity="0.4"
          />
          <path
            d="M8.22233 12.5282C9.00473 12.5282 9.639 11.8939 9.639 11.1115C9.639 10.3291 9.00473 9.69482 8.22233 9.69482C7.43993 9.69482 6.80566 10.3291 6.80566 11.1115C6.80566 11.8939 7.43993 12.5282 8.22233 12.5282ZM15.778 12.5282C16.5604 12.5282 17.1947 11.8939 17.1947 11.1115C17.1947 10.3291 16.5604 9.69482 15.778 9.69482C14.9956 9.69482 14.3613 10.3291 14.3613 11.1115C14.3613 11.8939 14.9956 12.5282 15.778 12.5282ZM13.4173 11.1115C13.4173 11.8939 12.7831 12.5282 12.0007 12.5282C11.2182 12.5282 10.584 11.8939 10.584 11.1115C10.584 10.3291 11.2182 9.69482 12.0007 9.69482C12.7831 9.69482 13.4173 10.3291 13.4173 11.1115Z"
            fill="#b5b1bf"
          />
        </svg>
      ),
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
    google: {
      idle: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          fill="#ffffff"
          height="24"
        >
          <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032 s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2 C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
        </svg>
      ),
    },
    search: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
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
    modal: {
      card: (
        <svg
          width="16"
          height="12"
          viewBox="0 0 16 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 2C0 1.46957 0.210714 0.960859 0.585786 0.585786C0.960859 0.210714 1.46957 0 2 0H14C14.5304 0 15.0391 0.210714 15.4142 0.585786C15.7893 0.960859 16 1.46957 16 2V10C16 10.5304 15.7893 11.0391 15.4142 11.4142C15.0391 11.7893 14.5304 12 14 12H2C1.46957 12 0.960859 11.7893 0.585786 11.4142C0.210714 11.0391 0 10.5304 0 10V2ZM2.5 3C2.36739 3 2.24021 3.05268 2.14645 3.14645C2.05268 3.24021 2 3.36739 2 3.5V4.5C2 4.63261 2.05268 4.75979 2.14645 4.85355C2.24021 4.94732 2.36739 5 2.5 5H4.5C4.63261 5 4.75979 4.94732 4.85355 4.85355C4.94732 4.75979 5 4.63261 5 4.5V3.5C5 3.36739 4.94732 3.24021 4.85355 3.14645C4.75979 3.05268 4.63261 3 4.5 3H2.5ZM2.5 6C2.36739 6 2.24021 6.05268 2.14645 6.14645C2.05268 6.24021 2 6.36739 2 6.5C2 6.63261 2.05268 6.75979 2.14645 6.85355C2.24021 6.94732 2.36739 7 2.5 7H7.5C7.63261 7 7.75979 6.94732 7.85355 6.85355C7.94732 6.75979 8 6.63261 8 6.5C8 6.36739 7.94732 6.24021 7.85355 6.14645C7.75979 6.05268 7.63261 6 7.5 6H2.5ZM2.5 8C2.36739 8 2.24021 8.05268 2.14645 8.14645C2.05268 8.24021 2 8.36739 2 8.5C2 8.63261 2.05268 8.75979 2.14645 8.85355C2.24021 8.94732 2.36739 9 2.5 9H3.5C3.63261 9 3.75979 8.94732 3.85355 8.85355C3.94732 8.75979 4 8.63261 4 8.5C4 8.36739 3.94732 8.24021 3.85355 8.14645C3.75979 8.05268 3.63261 8 3.5 8H2.5ZM5.5 8C5.36739 8 5.24021 8.05268 5.14645 8.14645C5.05268 8.24021 5 8.36739 5 8.5C5 8.63261 5.05268 8.75979 5.14645 8.85355C5.24021 8.94732 5.36739 9 5.5 9H6.5C6.63261 9 6.75979 8.94732 6.85355 8.85355C6.94732 8.75979 7 8.63261 7 8.5C7 8.36739 6.94732 8.24021 6.85355 8.14645C6.75979 8.05268 6.63261 8 6.5 8H5.5ZM8.5 8C8.36739 8 8.24021 8.05268 8.14645 8.14645C8.05268 8.24021 8 8.36739 8 8.5C8 8.63261 8.05268 8.75979 8.14645 8.85355C8.24021 8.94732 8.36739 9 8.5 9H9.5C9.63261 9 9.75979 8.94732 9.85355 8.85355C9.94732 8.75979 10 8.63261 10 8.5C10 8.36739 9.94732 8.24021 9.85355 8.14645C9.75979 8.05268 9.63261 8 9.5 8H8.5ZM11.5 8C11.3674 8 11.2402 8.05268 11.1464 8.14645C11.0527 8.24021 11 8.36739 11 8.5C11 8.63261 11.0527 8.75979 11.1464 8.85355C11.2402 8.94732 11.3674 9 11.5 9H12.5C12.6326 9 12.7598 8.94732 12.8536 8.85355C12.9473 8.75979 13 8.63261 13 8.5C13 8.36739 12.9473 8.24021 12.8536 8.14645C12.7598 8.05268 12.6326 8 12.5 8H11.5Z"
            fill="#7000ff"
          />
        </svg>
      ),
      applepay: (
        <svg
          width="32"
          height="14"
          viewBox="0 0 32 14"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.84512 1.713C5.46912 2.161 4.87012 2.516 4.27212 2.464C4.19312 1.86 4.49112 1.213 4.83512 0.812C5.21012 0.355 5.86612 0.027 6.39812 0C6.46112 0.631 6.21512 1.251 5.84612 1.713H5.84512ZM6.39212 2.583C5.52312 2.53 4.77712 3.082 4.36512 3.082C3.94412 3.082 3.31312 2.609 2.62612 2.625C1.73512 2.636 0.902118 3.145 0.449118 3.964C-0.493882 5.593 0.204118 8.005 1.11012 9.333C1.55312 9.989 2.08312 10.708 2.78212 10.688C3.44312 10.661 3.70912 10.251 4.50612 10.251C5.31312 10.251 5.54212 10.688 6.24612 10.672C6.96912 10.661 7.42712 10.016 7.87012 9.36C8.37512 8.615 8.58312 7.885 8.59412 7.849C8.58312 7.833 7.19312 7.297 7.18312 5.682C7.17212 4.327 8.27612 3.682 8.32312 3.645C7.70312 2.708 6.72412 2.609 6.39112 2.584L6.39212 2.583ZM11.4081 0.749001V10.604H12.9231V7.235H15.0181C16.9291 7.235 18.2731 5.907 18.2731 3.99C18.2731 2.069 16.9561 0.75 15.0701 0.75L11.4081 0.749001ZM12.9231 2.041H14.6681C15.9801 2.041 16.7311 2.749 16.7311 3.994C16.7311 5.239 15.9801 5.953 14.6581 5.953H12.9231V2.041ZM21.0321 10.677C21.9851 10.677 22.8651 10.193 23.2671 9.421H23.2991V10.604H24.6991V5.697C24.6991 4.281 23.5751 3.36 21.8401 3.36C20.2361 3.36 19.0481 4.292 19.0071 5.568H20.3661C20.4811 4.959 21.0331 4.563 21.7991 4.563C22.7261 4.563 23.2421 5 23.2421 5.803V6.344L21.3571 6.459C19.5961 6.568 18.6481 7.292 18.6481 8.558C18.6481 9.834 19.6281 10.678 21.0331 10.678L21.0321 10.677ZM21.4441 9.51C20.6361 9.51 20.1211 9.119 20.1211 8.521C20.1211 7.901 20.6161 7.536 21.5581 7.478L23.2411 7.374V7.931C23.2411 8.854 22.4651 9.51 21.4381 9.51H21.4441ZM26.5691 13.286C28.0421 13.286 28.7361 12.713 29.3401 10.989L31.9961 3.458H30.4601L28.6791 9.275H28.6471L26.8661 3.458H25.2831L27.8461 10.63L27.7101 11.067C27.4751 11.802 27.1011 12.087 26.4341 12.087C26.3141 12.087 26.0851 12.072 25.9911 12.062V13.245C26.0791 13.27 26.4551 13.281 26.5641 13.281L26.5691 13.286Z"
            fill="#7000ff"
          />
        </svg>
      ),
      googlepay: (
        <svg
          width="34"
          height="15"
          viewBox="0 0 34 15"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.61642 5.3379V7.5132H8.64986C8.58868 7.85997 8.4577 8.19094 8.26473 8.48632C8.07177 8.7817 7.82079 9.03543 7.52679 9.23234C7.01998 9.57775 6.37292 9.77445 5.61429 9.77445C4.14804 9.77445 2.90864 8.77724 2.46398 7.44253C2.2313 6.74033 2.2313 5.98262 2.46398 5.28042C2.90864 3.9378 4.14804 2.9406 5.61429 2.9406C6.01173 2.93325 6.40668 3.00443 6.77614 3.15001C7.14561 3.29559 7.48222 3.51265 7.76639 3.78857L9.37501 2.17384C8.36188 1.21833 7.01385 0.691782 5.61642 0.705714C4.57104 0.709696 3.54759 1.00368 2.66162 1.55449C1.77564 2.10529 1.06243 2.89097 0.602482 3.82284C0.206296 4.61037 5.34058e-05 5.47858 5.34058e-05 6.35884C5.34058e-05 7.2391 0.206296 8.10731 0.602482 8.89484V8.90275C1.06255 9.83407 1.77596 10.619 2.66203 11.1689C3.54809 11.7187 4.57147 12.0115 5.61642 12.0141C7.12889 12.0141 8.40814 11.5115 9.33517 10.6477C10.3977 9.66634 11.0038 8.21404 11.0038 6.48646C11.0044 6.10173 10.9733 5.7176 10.9109 5.3379H5.61642ZM26.3038 5.12696C25.7657 4.63232 25.0325 4.3813 24.105 4.3813C22.9118 4.3813 22.015 4.82111 21.4222 5.69228L22.5298 6.39153C22.9353 5.79388 23.4889 5.49505 24.1905 5.49505C24.6372 5.49613 25.0677 5.66124 25.3991 5.95859C25.5606 6.09778 25.6901 6.26976 25.7789 6.46289C25.8677 6.65603 25.9138 6.86583 25.9139 7.07814V7.3687C25.4305 7.10134 24.8222 6.96001 24.0736 6.96001C23.2003 6.96001 22.4985 7.16462 21.9757 7.5807C21.453 7.99677 21.1884 8.54626 21.1884 9.24499C21.1802 9.55727 21.2425 9.8674 21.3706 10.1527C21.4988 10.438 21.6895 10.6913 21.929 10.894C22.4204 11.3338 23.0446 11.5537 23.7772 11.5537C24.6426 11.5537 25.329 11.1687 25.8491 10.3993H25.9022V11.3338H27.1034V7.18361C27.1071 6.31085 26.842 5.6195 26.3038 5.12696ZM25.2822 9.83614C25.098 10.0222 24.8783 10.1701 24.636 10.2711C24.3937 10.3721 24.1335 10.4243 23.8707 10.4247C23.5174 10.4305 23.173 10.314 22.8969 10.0951C22.7681 9.99922 22.6636 9.87474 22.5919 9.73161C22.5202 9.58848 22.4833 9.43067 22.4841 9.27083C22.4841 8.90169 22.6552 8.59531 22.9909 8.3522C23.3267 8.10909 23.7629 7.98306 24.2697 7.98306C24.9688 7.97462 25.516 8.13282 25.9059 8.44607C25.9059 8.98027 25.6955 9.44327 25.2822 9.83614ZM20.3071 2.34786C20.0252 2.0681 19.6892 1.84776 19.3194 1.70005C18.9496 1.55234 18.5535 1.48032 18.155 1.48829H14.8256V11.3359H16.081V7.34708H18.1529C19.0029 7.34708 19.72 7.06443 20.305 6.50702C20.3517 6.46009 20.3985 6.41263 20.4457 6.3657C20.9576 5.81113 21.2299 5.07932 21.204 4.3276C21.178 3.57587 20.856 2.86426 20.3071 2.34575V2.34786ZM19.4263 5.62952C19.268 5.79721 19.0756 5.92947 18.8618 6.01749C18.6479 6.10552 18.4177 6.14728 18.1863 6.13999H16.081V2.70118H18.1863C18.6356 2.69957 19.0673 2.87456 19.3869 3.18792C19.7122 3.50943 19.8983 3.94418 19.9056 4.39974C19.9129 4.85531 19.741 5.29575 19.4263 5.62741V5.62952ZM32.6353 4.59962L30.6941 9.43536H30.6702L28.6822 4.59962H27.3174L30.0688 10.904L28.5096 14.2959H29.8032L34 4.59962H32.6353Z"
            fill="#7000ff"
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
  extendModal: {
    page1: {
      icon: (
        <svg
          width="98"
          height="98"
          viewBox="0 0 98 98"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M49.0231 98C76.2171 98 98 76.1811 98 49C98 21.8189 76.2171 0 49.0231 0C45.4158 0 43.0571 2.12642 43.0571 5.5934V20.9406C43.0571 23.9453 45.1845 26.2104 48.1907 26.2104C51.1505 26.2104 53.278 23.9453 53.278 20.9406V12.5274C71.4998 14.7 85.4205 30.1858 85.4205 49C85.4205 69.0623 69.2799 85.4264 49.0231 85.4264C28.7664 85.4264 12.5795 69.0623 12.5795 49C12.6258 40.9104 15.3544 33.2368 19.933 27.1349C22.3379 23.6217 22.9391 20.5245 20.0717 17.8434C17.3431 15.2085 12.9495 15.5783 10.1746 19.4151C3.88485 27.5972 0 37.9057 0 49C0 76.1811 21.7829 98 49.0231 98ZM56.4691 57.1358C60.6314 52.8368 59.7527 46.7811 54.8967 43.6377L33.2062 29.2151C29.5989 26.8575 26.3152 30.1858 28.6739 33.7915L43.0571 55.4255C46.2482 60.2792 52.2605 61.2038 56.4691 57.1358Z"
            fill={colors.primary}
          />
        </svg>
      ),
      title: (
        <>
          Продление объявления <br />
          на 48 часов
        </>
      ),
      text: "К счетчику времени публикации вашего объявления будет добавлено 48 часов с момента продления. Таким образом вы можете успеть получить больше интересных предложений",
    },
    page2: {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="98"
          height="98"
          viewBox="0 0 24 24"
        >
          <path
            d="M21.216 8h-2.216v-1.75l1-3.095v-3.155h-5.246c-2.158 6.369-4.252 9.992-6.754 10v-1h-8v13h8v-1h2l2.507 2h8.461l3.032-2.926v-10.261l-2.784-1.813zm.784 11.225l-1.839 1.775h-6.954l-2.507-2h-2.7v-7c3.781 0 6.727-5.674 8.189-10h1.811v.791l-1 3.095v4.114h3.623l1.377.897v8.328z"
            fill="#7000ff"
          />
        </svg>
      ),
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
