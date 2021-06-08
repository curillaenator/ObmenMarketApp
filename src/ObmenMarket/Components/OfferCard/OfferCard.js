import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { Author } from "../Author/Author";
import { Gallery } from "../Gallery/Gallery";
import { Button } from "../Button/Button";
import { ButtonGhost } from "../Button/ButtonGhost";

import { colors } from "../../../Utils/palette";

import shrink from "../../../Assets/Icons/shrink.svg";
import imgmask from "../../../Assets/Masks/commonBtn.svg";

const HeadStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .head_details {
    display: flex;
    align-items: center;
    width: 100%;
    overflow: hidden;
    cursor: pointer;
    z-index: ${({ hide }) => (hide ? -10 : 0)};

    .head_img {
      flex-shrink: 0;
      width: 56px;
      height: 56px;
      object-fit: cover;
      mask-image: url(${imgmask});
      mask-size: cover;
      mask-repeat: no-repeat;
    }

    .head_title {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      margin: 0 12px;
      font-weight: 600;
      font-size: 14px;
      line-height: 20px;
      letter-spacing: -0.08px;
      color: ${colors.fontTitle};
      // border-bottom: 1.5px dashed ${colors.fontTitle};
    }

    &:hover .head_title {
      color: ${colors.primary};
    }
  }

  .head_buttons {
    display: flex;
    align-items: center;
    opacity: 1;
    flex-shrink: 0;
    z-index: 50;
    transition: 0.08s linear;
  }

  @media (min-width: 1024px) {
    .head_buttons {
      opacity: ${({ selected }) => (selected ? "1" : 0)};
    }

    &:hover .head_buttons {
      opacity: 1;
    }
  }
`;

const BodyStyled = styled.div`
  //   height: 100px;
  //   transition: max-height 0.3s ease-in-out;

  .body_title {
    margin: 16px 0 20px;
    padding: 0 8px;
    font-weight: 800;
    font-size: 22px;
    line-height: 28px;
    letter-spacing: -0.64px;
    color: ${colors.fontTitle};
  }

  .body_author {
    margin-bottom: 16px;
    padding: 0 8px;
  }

  .body_description {
    margin-bottom: 16px;
    padding: 0 8px;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    letter-spacing: -0.0008em;
    font-feature-settings: 'cv02' on, 'cv03' on, 'cv04' on, 'cv05' on, 'cv10' on, 'cv09' on, 'cv08' on, 'cv07' on, 'cv06' on;
    color: ${colors.fontGrey};
  }

  .body_overprice {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    padding: 0 8px;

    & > svg {
      margin-right: 11px;
    }

    & > p {
      font-weight: 600;
      font-size: 16px;
      line-height: 19px;
      letter-spacing: -0.56px;
    }
  }
`;

const OfferStyled = styled.div`
  width: 100%;
  height: ${({ selected, height }) => (selected ? height + 72 + 32 : 72)}px;
  margin-bottom: 8px;
  padding: 8px;
  border-radius: 16px;
  background-color: ${colors.chatbox};
  overflow: hidden;
  transition: background-color 0.08s linear;
  transition: height 0.2s ease-in-out;

  @media (min-width: 1024px) {
    background-color: ${({ selected }) =>
      selected ? colors.chatbox : "transparent"};

    &:hover {
      background-color: ${colors.chatbox};
    }
  }
`;

export const OfferCard = ({
  lotMeta,
  offerMeta,
  ownerID,
  selectedOfferID,
  setSelectedOfferID,
  acceptConfirmOffer,
  removeOffer,
  chatRoom,
}) => {
  const bodyRef = useRef(null);
  const { icons } = useSelector((state) => state.ui);

  useEffect(() => {
    if (lotMeta.acceptedOffer === offerMeta.offerID) {
      setSelectedOfferID(offerMeta.offerID);
    }
  }, [lotMeta.acceptedOffer, offerMeta.offerID, setSelectedOfferID]);

  const openOfferHandler = () => {
    if (offerMeta.offerID !== selectedOfferID)
      return setSelectedOfferID(offerMeta.offerID);
    return setSelectedOfferID(null);
  };

  const removeOfferHandler = () => {
    removeOffer(offerMeta.offerID);
    setSelectedOfferID(null);
  };

  const acceptConfirmReset = {
    acceptedOffer: null,
    offerConfirmed: null,
  };

  const approveOfferByLotAuthor = () => {
    if (lotMeta.acceptedOffer)
      return acceptConfirmOffer(lotMeta, offerMeta, acceptConfirmReset);

    if (!lotMeta.acceptedOffer)
      return acceptConfirmOffer(lotMeta, offerMeta, {
        acceptedOffer: offerMeta.offerID,
      });
  };

  const confirmOfferByOfferAuthor = () => {
    if (lotMeta.offerConfirmed) {
      return acceptConfirmOffer(lotMeta, offerMeta, acceptConfirmReset);
    }

    if (!lotMeta.offerConfirmed) {
      acceptConfirmOffer(lotMeta, offerMeta, {
        offerConfirmed: offerMeta.offerID,
      });
      chatRoom(lotMeta, offerMeta);
      return null;
    }
  };

  return (
    <OfferStyled
      selected={selectedOfferID === offerMeta.offerID}
      height={bodyRef.current ? bodyRef.current.scrollHeight : 0}
    >
      <HeadStyled
        selected={selectedOfferID === offerMeta.offerID}
        hide={offerMeta.offerID === lotMeta.acceptedOffer}
      >
        <div className="head_details" onClick={openOfferHandler}>
          <img
            className="head_img"
            src={
              offerMeta.offerID === selectedOfferID
                ? shrink
                : offerMeta.photoURLs[0]
            }
            alt={offerMeta.name}
          />

          <div className="head_title">
            {offerMeta.offerID === selectedOfferID
              ? "Свернуть"
              : offerMeta.name}
          </div>
        </div>

        <div className="head_buttons">
          {ownerID !== offerMeta.authorID && (
            <Button
              width={116}
              height={24}
              title={lotMeta.acceptedOffer ? "Отменить обмен" : "Согласиться"}
              fontsize={12}
              handler={approveOfferByLotAuthor}
              active={lotMeta.acceptedOffer}
            />
          )}

          {!!lotMeta.acceptedOffer &&
            lotMeta.acceptedOffer === offerMeta.offerID &&
            offerMeta.authorID === ownerID && (
              <Button
                width={126}
                height={24}
                title={
                  lotMeta.offerConfirmed ? "Отменить обмен" : "Подтвердить"
                }
                fontsize={12}
                handler={confirmOfferByOfferAuthor}
                active={lotMeta.offerConfirmed}
              />
            )}

          <ButtonGhost icon={icons.delete} handler={removeOfferHandler} />
        </div>
      </HeadStyled>

      <BodyStyled ref={bodyRef}>
        <div className="body_title">{offerMeta.name}</div>

        <Gallery lotPhotos={offerMeta.photoURLs} />

        <div className="body_author">
          <Author
            authorID={offerMeta.authorID}
            avatar={offerMeta.avatar}
            name={offerMeta.authorName}
          />
        </div>

        <div className="body_description">{offerMeta.description}</div>

        <div className="body_overprice">
          {offerMeta.overprice && icons.readytopay}

          <p>
            {offerMeta.overprice
              ? "Автор готов доплатить"
              : "Автор не готов к доплате"}
          </p>
        </div>
      </BodyStyled>
    </OfferStyled>
  );
};
