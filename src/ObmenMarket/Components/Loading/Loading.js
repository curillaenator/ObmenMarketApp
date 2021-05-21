import styled from "styled-components";
import loader from "../../../Assets/Images/loader.svg";

import { colors } from "../../../Utils/palette";

const StyledLoader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  & > img {
    width: 40px;
    height: 40px;
    object-fit: cover;
  }

  & > p {
    font-size: 13px;
    font-weight: 500;
    color: ${colors.fontGrey};
  }
`;

export const Loading = () => {
  return (
    <StyledLoader>
      <img src={loader} alt="" />
      <p>Загрузка...</p>
    </StyledLoader>
  );
};
