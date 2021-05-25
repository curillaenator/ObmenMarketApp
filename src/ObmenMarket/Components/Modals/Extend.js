import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Popup from "reactjs-popup";
import styled, { keyframes } from "styled-components";
import { an } from "../../../Utils/firebase";

import { setExtendPay } from "../../../Redux/Reducers/fees";
import { prolongLotExpiry } from "../../../Redux/Reducers/lots";

import { Button } from "../Button/Button";

import { colors } from "../../../Utils/palette";

const appear = keyframes`
from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const PopupStyled = styled(Popup)`
  &-overlay {
    background-color: ${colors.modalBG};
    animation: ${appear} 0.2s;
  }

  &-content {
    width: 692px;
    height: 100vh;
  }
`;

const InfoStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 41px;
  margin-bottom: 32px;
  padding: 0 24px;

  & > svg {
    margin-bottom: 34px;
  }

  .info_title {
    margin-bottom: 24px;
    font-weight: 800;
    font-size: 49px;
    line-height: 45px;
    text-align: center;
    letter-spacing: -1.576px;
    color: ${colors.fontWhite};
  }

  .info_text {
    max-width: 580px;
    font-weight: 500;
    font-size: 13px;
    line-height: 19px;
    text-align: center;
    letter-spacing: -0.08px;
    color: #a1a1a1;
  }

  @media (min-height: 600px) {
    margin-top: 64px;
  }

  @media (min-height: 900px) {
    margin-top: 210px;
  }
`;

const OptionStyled = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  margin-right: 8px;
  padding: 0 16px;
  border-radius: 16px;
  background-color: ${({ selected }) => (selected ? "#ffffff" : "transparent")};
  cursor: pointer;

  &:last-child {
    margin-right: 0;
  }

  .option_title {
    display: none;
    font-weight: 700;
    font-size: 14px;
    line-height: 1.2;
    letter-spacing: -0.149333px;
    color: ${colors.fontTitle};
  }

  @media (min-width: 480px) {
    .option_title {
      display: inline;
    }

    & > svg {
      margin-right: ${({ title }) => (title !== "" ? "12px" : "0px")};
    }
  }
`;

const CancelStyled = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  height: 56px;
  margin-top: 8px;
  padding: 0 16px;
  border: 0;
  background-color: transparent;
  color: ${colors.shape};
  font-weight: 600;
  letter-spacing: -0.149333px;
  outline: none;
  cursor: pointer;
  transition: 0.06s linear;

  &:hover {
    color: ${colors.primaryFontClicked};
  }

  &:active {
    color: ${colors.primary};
  }
`;

const ModalStyled = styled.div`
  .page {
    display: flex;
    flex-direction: column;
    align-items: center;

    .modal_buttons {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .modal_payments {
      display: flex;
      height: 72px;
      margin-bottom: 16px;
      padding: 16px;
      border-radius: 16px;
      background-color: ${colors.shape};
    }
  }
`;

export const Modal = ({
  icons,
  close,
  extendModal,
  payOptions,
  paySelected,
  dispatch,
}) => {
  const [page, setPage] = useState(1);

  const payButtonHandler = () => {
    const transID = Math.floor(100000 + Math.random() * 900000);

    // Log event
    an.logEvent("purchase", {
      transaction_id: `T${transID}`,
      affiliation: "InApp Purchase",
      currency: "RUR",
      payment_type: `${paySelected}`,
      value: 30.0, // Total Revenue
      items: {
        item_id: "SKU_extend48",
        item_name: "Продление публикации на 48 часов",
        item_category: "Встроенная покупка",
        price: 30.0,
      },
    });

    setPage(page + 1);
  };

  return (
    <ModalStyled>
      {page === 1 && (
        <div className="page">
          <InfoStyled>
            {extendModal.page1.icon}
            <div className="info_title">{extendModal.page1.title}</div>
            <div className="info_text">{extendModal.page1.text}</div>
          </InfoStyled>

          <div className="modal_payments">
            {payOptions.map((option) => (
              <OptionStyled
                key={option.name}
                onClick={() => dispatch(setExtendPay(option.name))}
                selected={option.name === paySelected}
                title={option.title}
              >
                {icons.modal[option.name]}
                <div className="option_title">{option.title}</div>
              </OptionStyled>
            ))}
          </div>

          <div className="modal_buttons">
            <Button
              width={163}
              height={56}
              title="Оплатить 30₽"
              handler={payButtonHandler}
            />

            <CancelStyled onClick={close}>Отмена</CancelStyled>
          </div>
        </div>
      )}

      {page === 2 && (
        <div className="page">
          <InfoStyled>
            {extendModal.page2.icon}
            <div className="info_title">{extendModal.page2.title}</div>
            <div className="info_text">{extendModal.page2.text}</div>
          </InfoStyled>

          <div className="modal_buttons">
            <Button
              width={163}
              height={56}
              title="Супер!"
              handler={() => {
                dispatch(prolongLotExpiry(2));
                close();
              }}
            />
          </div>
        </div>
      )}
    </ModalStyled>
  );
};

export const Extend = ({ butCont, setIsModalOn }) => {
  const dispatch = useDispatch();
  const { icons, extendModal } = useSelector((state) => state.ui);
  const { isModalOn } = useSelector((state) => state.home);
  const { paySelected, payOptions } = useSelector((state) => state.fees);

  return (
    <PopupStyled
      modal
      position="center center"
      lockScroll={true}
      closeOnDocumentClick={false}
      onOpen={() => setIsModalOn(true)}
      onClose={() => setIsModalOn(false)}
      open={isModalOn}
      trigger={() => (
        <div>
          <Button
            width={butCont}
            height={56}
            title={"Продлить объявление на 48 часов"}
            subtitle="за 30 рублей"
            titlewidth="calc(100% - 64px)"
            icon={icons.lotextend}
          />
        </div>
      )}
    >
      {(close) => (
        <Modal
          icons={icons}
          close={close}
          extendModal={extendModal}
          payOptions={payOptions}
          paySelected={paySelected}
          dispatch={dispatch}
        />
      )}
    </PopupStyled>
  );
};
