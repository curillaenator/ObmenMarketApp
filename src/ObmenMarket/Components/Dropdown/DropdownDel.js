import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

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
  right: 0;
  padding: 16px;
  border-radius: 24px;
  background-color: ${colors.whiteBG};
  box-shadow: 0px 18px 32px 0px ${colors.primary2IdleShadow};
  animation: ${appear} 0.12s ease-out;
  z-index: 999;

  .del_warning {
    margin-bottom: 16px;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    letter-spacing: -0.16px;
    color: #948aaa;
  }

  .del_buttons {
    display: flex;
    align-items: center;
  }
`;

export const DropdownDel = ({
  icon,
  title,
  warntext = "Удалить?",
  disabled = false,
  compact = false,
  danger = false,
  handler,
}) => {
  const [trigger, setTrigger] = useState(false);
  const close = () => setTrigger(false);

  useEffect(() => {
    trigger
      ? window.document.addEventListener("click", close)
      : window.document.removeEventListener("click", close);

    return () => window.document.removeEventListener("click", close);
  }, [trigger]);

  return (
    <Wrapper>
      <ButtonGhost
        icon={icon}
        title={compact ? "" : title}
        shape
        danger={danger}
        active={trigger}
        disabled={disabled}
        handler={() => setTrigger(!trigger)}
      />

      {trigger && (
        <Menu trigger={trigger}>
          <div className="del_warning">{warntext}</div>

          <div className="del_buttons">
            <ButtonGhost title="Удалить" icon={icon} handler={handler} danger />

            <ButtonGhost title="Отмена" handler={close} />
          </div>
        </Menu>
      )}
    </Wrapper>
  );
};
