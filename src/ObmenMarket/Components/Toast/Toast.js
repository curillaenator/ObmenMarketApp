import styled from "styled-components";

import { Button } from "../Button/Button";

const ToastContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  padding: 24px 30px 24px 26px;
  border-radius: 24px;
  background-color: ${(props) => props.colors.bg};
  filter: ${(props) =>
    props.type === "new" ? "drop-shadow(0 12px 16px #1a1a1a3f)" : "none"};

  .close {
    position: absolute;
    top: 16px;
    right: 16px;
    cursor: pointer;
    z-index: 10;

    & > svg {
      fill: ${(props) => props.colors.cls};
    }
  }

  .toastImage {
    flex-shrink: 0;
    margin-right: 22px;
    z-index: 10;
  }

  .text {
    z-index: 10;

    & > h3 {
      margin-top: 5px;
      margin-bottom: 6px;
      font-family: -apple-system, BlinkMacSystemFont, sans-serif, "Inter",
        "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol" !important;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      font-weight: 600;
      font-size: 16px;
      line-height: 19px;
      letter-spacing: -0.16px;
      color: ${(props) => props.colors.ttl};
    }

    & > p {
      max-width: 450px;
      margin-bottom: ${(props) => (props.button ? 16 : 0)}px;
      font-family: -apple-system, BlinkMacSystemFont, sans-serif, "Inter",
        "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol" !important;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      font-weight: 500;
      font-size: 14px;
      line-height: 22px;
      letter-spacing: -0.08px;
      color: ${(props) => props.colors.txt};
    }
  }
`;

export const ToastComponent = ({
  title = "пусто",
  text = "пусто",
  button = null,
  type,
  icon,
  close,
}) => {
  const colors = {
    success: {
      bg: "#d6f3e2",
      ttl: "#086343",
      txt: "#318063",
      cls: "#97b2a2",
      btn: "#13AE2D",
      btnhov: "#49BE5D",
    },
    info: {
      bg: "#F3EAFE",
      ttl: "#4B00AA",
      txt: "#6C2FBB",
      cls: "#988BB1",
      btn: "#685199",
      btnhov: "#806DA9",
    },
    new: {
      bg: "#9C6DFF",
      ttl: "#ffffff",
      txt: "#efe3ff",
      cls: "#7840F0",
      btn: "#7000FF",
      btnhov: "#7622FF",
    },
    warning: {
      bg: "#FFE1BE",
      ttl: "#A64F21",
      txt: "#B86C40",
      cls: "#CE9C70",
      btn: "#F84A00",
      btnhov: "#FF701F",
    },
    error: {
      bg: "#F9D3D4",
      ttl: "#9F1B1F",
      txt: "#B14043",
      cls: "#CA7C7D",
      btn: "#F31414",
      btnhov: "#FF3030",
    },
  };

  return (
    <ToastContainer colors={colors[type]} button={button} type={type}>
      <div className="close" onClick={close}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8ZM6.16569 5.03431C5.85327 4.7219 5.34673 4.7219 5.03431 5.03431C4.7219 5.34673 4.7219 5.85327 5.03431 6.16569L6.86863 8L5.03431 9.83432C4.7219 10.1467 4.7219 10.6533 5.03431 10.9657C5.34673 11.2781 5.85327 11.2781 6.16569 10.9657L8 9.13137L9.83432 10.9657C10.1467 11.2781 10.6533 11.2781 10.9657 10.9657C11.2781 10.6533 11.2781 10.1467 10.9657 9.83432L9.13137 8L10.9657 6.16569C11.2781 5.85327 11.2781 5.34673 10.9657 5.03431C10.6533 4.7219 10.1467 4.7219 9.83432 5.03431L8 6.86863L6.16569 5.03431Z" />
        </svg>
      </div>

      {icon}

      <div className="text">
        <h3>{title}</h3>

        <p>{text}</p>

        {button !== null && (
          <Button
            width={111}
            title="Открыть"
            shapeColors={{ idle: colors[type].btn, hover: colors[type].btnhov }}
            handler={button}
          />
        )}
      </div>
    </ToastContainer>
  );
};
