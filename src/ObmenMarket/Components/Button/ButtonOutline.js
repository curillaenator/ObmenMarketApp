import styled from "styled-components";
import preloader from "../../../Assets/Images/loader.svg";
import { colors } from "../../../Utils/palette";

const shapeColor = ({ base, active, disabled }) => {
  if (active || disabled) return colors.primaryActive;
  return base;
};

const iconState = ({ icon, active, disabled, state }) => {
  if (disabled) return icon && icon.disabled;
  if (active) return icon && icon.active;
  return icon && icon[state];
};

const ttlColor = ({ base, active, disabled }) => {
  if (disabled) return colors.primaryDisabled;
  if (active) return colors.fontTitle;
  return base;
};

const ButtonWrap = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  position: relative;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  border: none;
  outline: none;
  background-color: transparent;
  cursor: pointer;

  .loader {
    width: 40px;
    height: 40px;
    object-fit: cover;
  }

  .shape {
    position: absolute;
    top: 0;
    left: 0;
    fill: ${(props) => shapeColor({ ...props, base: colors.outline })};
    stroke: ${(props) => shapeColor({ ...props, base: colors.outlineStroke })};
    stroke-width: 2px;
    transition: ${(props) => props.transition}s linear;
    z-index: -1;
  }

  &:hover .shape {
    fill: ${(props) => shapeColor({ ...props, base: colors.outline })};
    stroke: ${(props) => shapeColor({ ...props, base: colors.outlineHover })};
  }

  &:active .shape {
    fill: ${(props) => shapeColor({ ...props, base: colors.outlineClick })};
    stroke: ${(props) => shapeColor({ ...props, base: colors.outlineClick })};
  }

  .icon {
    height: 24px;
    width: 24px;
    margin-right: ${(props) => (props.title ? "8px" : "0px")};
    background-image: url(${(props) => iconState({ ...props, state: "idle" })});
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    transition: ${(props) => props.transition}s linear;
  }

  &:hover .icon {
    background-image: url(${(props) =>
      iconState({ ...props, state: "hover" })});
  }

  &:active .icon {
    background-image: url(${(props) =>
      iconState({ ...props, state: "clicked" })});
  }

  .title {
    font-size: ${(props) => (props.fontsize ? props.fontsize : 14)}px;
    font-weight: 700;
    letter-spacing: -0.149333px;
    color: ${(props) => ttlColor({ ...props, base: colors.primary })};
    transition: ${(props) => props.transition}s linear;
  }

  &:hover .title {
    color: ${(props) => ttlColor({ ...props, base: colors.primary })};
  }

  &:active .title {
    color: ${(props) =>
      ttlColor({ ...props, base: colors.outlineFontClicked })};
  }
`;

export const ButtonOutline = ({
  width = 217,
  height = 56,
  smooth = 98, // 98
  radius = 21.33, // 23.33 - 2px border
  title = "",
  icon = null,
  active = false,
  disabled = false,
  loader = false,
  fontsize = null,
  transition = 0.08,
  handler = () => console.log("Outline"),
}) => {
  const W = width - 2;
  const H = height - 2;
  const R = H / 2 < radius ? H / 2 : radius;
  const S = (0.08 + R * 0.000012) * smooth - 4 / smooth - 3;
  return (
    <ButtonWrap
      width={width}
      height={height}
      icon={icon}
      title={title}
      active={active}
      disabled={disabled}
      fontsize={fontsize}
      transition={transition}
      onClick={handler}
    >
      <svg
        className="shape"
        version="1.1"
        width="100%"
        height="100%"
        viewBox={`-1 -1 ${width} ${height}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d={`M ${R} 0 H${W - R} C ${W - S} 0 ${W} ${S} ${W} ${R}
              V ${H - R} C ${W} ${H - S} ${W - S} ${H} ${W - R} ${H}
              H ${R} C ${S} ${H} 0 ${H - S} 0 ${H - R}
              V ${R} C 0 ${S} ${S} 0 ${R} 0 Z`}
        ></path>
      </svg>

      {loader && <img className="loader" src={preloader} alt="Загрузка" />}

      {!loader && icon && <div className="icon"></div>}

      {title && <div className="title">{title}</div>}
    </ButtonWrap>
  );
};
