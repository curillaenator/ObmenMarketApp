import styled from "styled-components";
import loader from "../../../Assets/Images/loader.svg";

import { colors } from "../../../Utils/palette";

const StyledLoading = styled.div`
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
    <StyledLoading>
      <img src={loader} alt="" />
      <p>Загрузка...</p>
    </StyledLoading>
  );
};

const StyledLoadingFs = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;

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

export const LoadingFS = () => {
  return (
    <StyledLoadingFs>
      <img src={loader} alt="" />
      <p>Загрузка...</p>
    </StyledLoadingFs>
  );
};
