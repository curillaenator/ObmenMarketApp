import ScrollTop from "react-scrolltop-button";
import styled from "styled-components";
import { colors } from "../../../Utils/palette";

const StyledScrollTop = styled(ScrollTop)`
  position: fixed;
  display: none;
  align-items: flex-start;
  top: 0;
  right: 0;
  bottom: 0px;
  left: 0px;
  background-color: ${colors.chatbox};
  border: none;
  width: 6vw;
//   height: 100vh;
  border-radius: 0;
  transition: 0.32s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: #f3f1f5;
    color: ${colors.primary};
  }

  @media (min-width: 1140px) {
    display: flex;
  }
`;

const ContentStyled = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px;

  & > svg {
    flex-shrink: 0;
    width: 24px;
    height: 24px;
  }

  .button_title {
    display: none;
    font-size: 88%;
    font-weight: 600;
    letter-spacing: -0.08px;
  }

  @media (min-width: 1440px) {
    & > svg {
      margin-right: 4px;
    }

    .button_title {
      display: inline;
    }
  }
`;

const ButtonContent = ({ isMobile, icon, title }) => {
  return (
    <ContentStyled isMobile={isMobile}>
      {icon}
      <span className="button_title">{title}</span>
    </ContentStyled>
  );
};

export const ScrollToTop = ({
  distance = 400,
  breakpoint = 2800,
  speed = 160,
  target = 0,
  icon = null,
  title = "",
}) => {
  return (
    <StyledScrollTop
      text=""
      distance={distance}
      breakpoint={breakpoint}
      speed={speed}
      target={target}
      icon={<ButtonContent icon={icon} title={title} />}
    />
  );
};
