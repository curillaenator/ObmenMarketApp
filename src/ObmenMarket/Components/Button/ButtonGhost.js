import styled from "styled-components";
import preloader from "../../../Assets/Images/loader.svg";
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
  height: 40px;
  padding: 0 16px;
  flex-shrink: 0;
  border: none;
  outline: none;
  background-color: transparent;
  cursor: pointer;
  will-change: filter;

  .loader {
    width: 40px;
    height: 40px;
    object-fit: cover;
  }

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
    font-size: ${(props) => (props.fontsize ? props.fontsize : 14)}px;
    font-weight: 600;
    letter-spacing: -0.149333px;
    color: ${(props) => titleColor({ ...props, base: colors.fontTitle })};
    transition: ${(props) => props.transition}s linear;
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
  loader = false,
  fontsize = null,
  transition = 0.08,
  handler = () => console.log("ghostButton"),
}) => {
  return (
    <ButtonWrap
      title={title}
      active={active}
      danger={danger}
      disabled={disabled}
      fontsize={fontsize}
      transition={transition}
      onClick={handler}
    >
      {shape && active && <div className="shape"></div>}

      {loader && <img className="loader" src={preloader} alt="Загрузка" />}

      {!loader && icon && <div className="icon">{icon}</div>}

      <div className="title">{title}</div>
    </ButtonWrap>
  );
};
