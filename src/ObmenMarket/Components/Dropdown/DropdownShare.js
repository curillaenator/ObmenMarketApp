import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";

import { ButtonGhost } from "../Button/ButtonGhost";
import { ButtonIcon } from "../Button/ButtonIcon";

import bginput from "../../../Assets/Icons/input_bg.svg";

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
  top: calc(100% + 8px);
  left: -100%;
  padding: 16px;
  border-radius: 16px;
  background-color: #ffffff;
  box-shadow: 0px 18px 32px 0px #1a1a1a3f;
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
    align-items: center;
    width: 100%;
    height: 68px;
    padding: 0 24px;
    background-color: #f7f6f9;
    box-shadow: inset 0px 2px 4px rgba(47, 0, 107, 0.1);
    border-radius: 16px;
    // background-image: url(${bginput});
    // background-size: cover;
    // background-repeat: no-repeat;

    .soc_link_text {
      font-weight: 600;
      font-size: 15px;
      line-height: 20px;
      letter-spacing: 0.8px;
      color: #7000ff;
    }
  }
`;

export const DropdownShare = ({ title, items, commonLink }) => {
  const { icons } = useSelector((state) => state.ui);
  const [trig, setTrig] = useState(false);

  const close = () => setTrig(false);

  useEffect(() => {
    trig
      ? window.document.addEventListener("click", close)
      : window.document.removeEventListener("click", close);

    return () => window.document.removeEventListener("click", close);
  }, [trig]);

  return (
    <Wrapper>
      <ButtonGhost
        icon={icons.share}
        active={trig}
        title={title}
        handler={() => setTrig(!trig)}
      />

      {trig && (
        <Menu trig={trig} height={items.length * 40 + 4}>
          <div className="soc_title">Создайте пост в соц.сетях</div>

          <div className="soc_buttons">
            {items.map((item) => (
              <ButtonGhost
                key={item.title}
                title={item.title}
                icon={item.icon}
                handler={item.handler}
              />
            ))}
          </div>

          <div className="soc_title">
            или скопируйте ссылку для мессенджеров
          </div>

          <div className="soc_link">
            <div type="text" className="soc_link_text">
              {commonLink}
            </div>

            <ButtonIcon
              icon={icons.copy}
              handler={() => navigator.clipboard.writeText(commonLink)}
            />
          </div>
        </Menu>
      )}
    </Wrapper>
  );
};
