import styled from "styled-components";
import { colors } from "../../../Utils/palette";

const ButtonWrap = styled.button`
  flex-shrink: 0;
  cursor: pointer;
  width: 26px;
  height: 26px;
  background-color: transparent;

  & > svg {
    width: 26px;
    height: 26px;
    fill: ${colors.chatfont1};
    transition: 0.08s linear;
  }

  &:hover > svg {
    fill: ${colors.chatfont1hover};
  }

  &:active > svg {
    fill: ${colors.chatfont1};
  }
`;

export const ButtonIcon = ({
  icon,
  handler = () => console.log("ButtonIcon"),
}) => {
  return <ButtonWrap onClick={handler}>{icon}</ButtonWrap>;
};
