import { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import styled, { keyframes } from "styled-components";

import { ButtonGhost } from "../Button/ButtonGhost";

import styles from "./dropmenu.module.scss";

const appear = keyframes`
    from {
      opacity: 0;
    }
  
    to {
      opacity: 1;
    }
    `;

const StyledPopup = styled(Popup)`
  &-content {
    position: absolute;
    width: fit-content;
    height: fit-content;
    border: 2px solid #efecff;
    border-radius: 16px;
    background-color: #f9f8ff;
    box-shadow: 0px 18px 32px 0px #1a1a1a3f;
    animation: ${appear} 0.2s linear;
    z-index: 999;
  }
  &-overlay {
    background-color: transparent;
  }
`;

export const DropMenu = ({ icon, items }) => {
  const [trig, setTrig] = useState(false);

  // useEffect(() => {
  //   trig
  //     ? (window.document.lastChild.style.overflowY = "hidden")
  //     : (window.document.lastChild.style.overflowY = null);
  //   return () => (window.document.lastChild.style.overflowY = null);
  // }, [trig]);

  return (
    <StyledPopup
      trigger={
        <div
          className={trig ? `${styles.trig} ${styles.trig_act}` : styles.trig}
        >
          {icon}
        </div>
      }
      position="left top"
      arrow={false}
      on="click"
      offsetX={8}
      onOpen={() => setTrig(true)}
      onClose={() => setTrig(false)}
    >
      {items.map((item) => (
        <ButtonGhost
          key={item.title}
          title={item.title}
          icon={item.icon}
          handler={item.handler}
        />
      ))}
    </StyledPopup>
  );
};
