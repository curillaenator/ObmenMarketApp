import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled, { keyframes } from "styled-components";

import { setNewToast } from "../../../Redux/Reducers/home";

import { ButtonGhost } from "../Button/ButtonGhost";

import { colors } from "../../../Utils/palette";

const appear = keyframes`
    from {
      opacity: 0;
      transform: translateY(20px)
    }
  
    to {
      opacity: 1;
      transform: translateY(0)
    }
    `;

const Wrapper = styled.div`
  position: relative;
`;

const Menu = styled.div`
  position: absolute;
  top: calc(100% + 12px);
  right: -200%;
  padding: 16px;
  border-radius: 24px;
  background-color: ${colors.whiteBG};
  box-shadow: 0px 18px 32px 0px ${colors.primary2IdleShadow};
  animation: ${appear} 0.12s ease-out;
  z-index: 999;

  .soc_title {
    margin-bottom: 8px;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    letter-spacing: -0.16px;
    color: #948aaa;
  }

  .soc_buttons {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
  }

  .soc_link {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 68px;
    padding: 0 24px;
    background-color: #f7f6f9;
    box-shadow: inset 0px 2px 4px rgba(47, 0, 107, 0.1);
    border-radius: 16px;
    cursor: pointer;

    .soc_link_text {
      margin-right: 8px;
      font-weight: 600;
      font-size: 15px;
      line-height: 20px;
      letter-spacing: 0.8px;
      color: ${colors.fontGrey};
    }

    & > svg {
      width: 32px;
      height: 32px;
    }

    &:hover .soc_link_text {
      color: ${colors.primary};
    }
  }

  @media (min-width: 480px) {
    right: 0;
  }
`;

export const DropdownShare = ({
  isMobile,
  title,
  items,
  commonLink,
  disabled,
}) => {
  const dispatch = useDispatch();

  const { icons } = useSelector((state) => state.ui);
  const [trig, setTrig] = useState(false);
  const close = () => setTrig(false);

  useEffect(() => {
    trig
      ? window.document.addEventListener("click", close)
      : window.document.removeEventListener("click", close);

    return () => window.document.removeEventListener("click", close);
  }, [trig]);

  const copyLink = () => {
    navigator.clipboard.writeText(commonLink);

    dispatch(
      setNewToast(
        "success",
        "Готово!",
        "Ссылка скопирована в буфер обмена",
        null
      )
    );
  };

  return (
    <Wrapper>
      <ButtonGhost
        icon={icons.share}
        title={title}
        active={trig}
        disabled={disabled}
        shape={true}
        handler={() => setTrig(!trig)}
      />

      {trig && (
        <Menu trig={trig}>
          <div className="soc_title">Создайте пост в соц.сетях</div>

          <div className="soc_buttons">
            {items.map((item) => (
              <ButtonGhost
                key={item.title}
                title={isMobile ? "" : item.title}
                icon={item.icon}
                handler={item.handler}
                iconsize={32}
              />
            ))}
          </div>

          <div className="soc_title">
            или кликните, чтобы скопировать ссылку для мессенджеров
          </div>

          <div className="soc_link" onClick={copyLink}>
            <div type="text" className="soc_link_text">
              {isMobile ? "копировать" : commonLink}
            </div>

            {icons.copy}
          </div>
        </Menu>
      )}
    </Wrapper>
  );
};
