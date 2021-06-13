import styled from "styled-components";

import { colors } from "../../../Utils/palette";

const StyledButton = styled.button`
  position: fixed;
  display: flex;
  align-items: flex-start;
  left: 0px;
  bottom: 0px;
  background-color: ${colors.chatbox};
  border: none;
  width: 6vw;
  height: 100vh;
  border-radius: 0;
  transition: 0.32s ease-in-out;
  transform: translateX(-100%);
  cursor: pointer;

  .button_content {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 40px;
    padding: 0 16px;

    & > svg {
      flex-shrink: 0;
      width: 24px;
      height: 24px;
      margin-right: ${({ isMobile }) => (isMobile ? "8px" : "0")};
    }

    &-title {
      font-size: 88%;
      font-weight: 600;
      letter-spacing: -0.08px;
    }
  }

  &:hover {
    background-color: #f3f1f5;
    color: ${colors.primary};
  }

  &:hover.button_content-title {
    ${colors.primary}
  }

  @media (min-width: 1140px) {
    transform: ${({ scroll }) =>
      scroll ? "translateX(0)" : "translateX(-100%)"};
  }
`;

export const ButtonScrollTop = ({
  icon = null,
  title = "",
  scroll = false,
  isMobile = false,
}) => {
  const handleScroll = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <StyledButton
      scroll={scroll}
      title={title}
      isMobile={isMobile}
      onClick={handleScroll}
    >
      <span className="button_content">
        {icon && icon}
        {!isMobile && title && (
          <span className="button_content-title">{title}</span>
        )}
      </span>
    </StyledButton>
  );
};
