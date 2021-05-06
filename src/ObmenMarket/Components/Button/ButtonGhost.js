import styled from "styled-components";
import { colors } from "../../../Utils/palette";

const titleColor = ({ base, active, danger, disabled }) => {
  if (disabled) return colors.fontDisabled;
  if (danger) return colors.fontDanger;
  if (active) return colors.fontTitle;
  return base;
};

const ButtonWrap = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: fit-content;
  height: 40px;
  padding: 0 16px;
  flex-shrink: 0;
  border: none;
  outline: none;
  background-color: transparent;
  cursor: pointer;
  will-change: filter;

  .shape {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 16px;
    background-color: ${colors.shape};
    z-index: -10;
  }

  .icon {
    display: flex;
    align-items: center;
    margin-right: ${(props) => (props.title ? "8px" : "0px")};

    & > svg {
      width: 24px;
      height: 24px;
    }
  }

  .title {
    width: fit-content;
    color: ${(props) => titleColor({ ...props, base: colors.fontTitle })};
    font-style: normal;
    font-size: 14px;
    font-weight: 600;
    line-height: 1.4;
    letter-spacing: -0.149333px;
    transition: 0.08s linear;
  }

  &:hover .title {
    color: ${(props) => titleColor({ ...props, base: colors.primary })};
  }

  &:active .title {
    color: ${(props) => titleColor({ ...props, base: colors.fontActive })};
  }
`;

export const ButtonGhost = ({
  title = "",
  icon = null,
  shape = false,
  active = false,
  danger = false,
  disabled = false,
  fontsize = null,
  handler = () => console.log("ghostButton"),
}) => {
  return (
    <ButtonWrap
      title={title}
      active={active}
      danger={danger}
      disabled={disabled}
      fontsize={fontsize}
      onClick={handler}
    >
      {shape && active && <div className="shape"></div>}

      {icon && <div className="icon">{icon}</div>}

      <div className="title">{title}</div>
    </ButtonWrap>
  );
};
