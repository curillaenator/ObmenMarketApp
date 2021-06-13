import { useState } from "react";
import Lightbox from "react-image-lightbox";
import ImageShadow from "react-image-shadow";
import styled from "styled-components";

import { colors } from "../../../Utils/palette";

import thumbMask from "../../../Assets/Masks/commonBtn.svg";
import displayMask from "../../../Assets/Masks/lotPhoto.svg";

import galleryIcon from "../../../Assets/Icons/openGallery.svg";

// import styles from "./gallery.module.scss";

const ThumbStyled = styled.div`
  position: relative;
  width: 20%;
  height: 0;
  padding-top: 20%;
  transform: scale3d(
    ${({ active }) => (active ? "0.9, 0.9, 0.9" : "0.8, 0.8, 0.8")}
  );
  filter: drop-shadow(
    0px 4px 8px
      ${({ active }) => (active ? colors.primary2IdleShadow : "transparent")}
  );
  transition: 0.08s ease-in-out;
  cursor: ${({ active }) => (active ? "default" : "pointer")};
  will-change: filter;

  .thumb_photo {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    mask-size: cover;
    mask-repeat: no-repeat;
    mask-image: url(${thumbMask});
  }

  &:hover {
    transform: scale3d(0.9, 0.9, 0.9);
    filter: drop-shadow(0px 4px 8px ${colors.primary2IdleShadow});
    will-change: filter;
    // -webkit-filter: blur(0px);
    // -moz-filter: blur(0px);
    // -ms-filter: blur(0px);
    // filter:progid:DXImageTransform.Microsoft.Blur(PixelRadius='0');
  }

  &:last-child {
    margin-right: 0;
  }
`;

const GalleryStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .display {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: calc(100% * 0.563);
    margin-bottom: 12px;
    cursor: pointer;
    transition: 0.08s ease-in-out;

    &_shadow {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;

      & > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        mask-image: url(${displayMask});
        mask-size: cover;
        mask-repeat: no-repeat;
      }
    }
  }

  .overlay {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    mask-size: cover;
    mask-repeat: no-repeat;
    opacity: 0;
    background-color: ${colors.galleryTint};
    transition: 0.12s linear;
    mask-image: url(${displayMask});

    &:hover {
      opacity: 1;
    }

    &:active {
      background-color: ${colors.galleryTintOpaque};
    }

    &_label {
      display: flex;
      justify-content: center;
      align-items: center;
      user-select: none;

      &-icon {
        margin-right: 18px;
      }

      &-title {
        & > h3 {
          font-size: 14px;
          font-weight: 700;
          line-height: 20px;
          letter-spacing: -0.149333px;
          color: ${colors.fontWhite};
          z-index: 5;
          user-select: none;
        }

        & > p {
          font-size: 12px;
          font-weight: 500;
          font-size: 12px;
          line-height: 20px;
          letter-spacing: -0.149333px;
          color: rgba(255, 255, 255, 0.64);
          user-select: none;
        }
      }
    }
  }

  .thumb_track {
    display: flex;
    margin-bottom: 24px;
    width: 101.7%;
  }
`;

export const Gallery = ({ photos }) => {
  const [isLightBox, setLightBox] = useState(false);
  const [curPhoto, setCurPhoto] = useState(0);

  return (
    <GalleryStyled>
      <div className="display" onClick={() => setLightBox(true)}>
        <ImageShadow
          src={photos[curPhoto]}
          className="display_shadow"
          shadowRadius="16"
          shadowBlur="20"
          style={{ width: "100%" }}
        />

        <div className="overlay">
          <div className="overlay_label">
            <img
              className="overlay_label-icon"
              src={galleryIcon}
              alt="Открыть галлерею"
            />

            <div className="overlay_label-title">
              <h3>Открыть галлерею</h3>
              <p>{`${photos.length} фото`}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="thumb_track">
        {photos.map((photo, index) => (
          <ThumbStyled
            key={photo}
            active={index === curPhoto}
            onClick={() => setCurPhoto(index)}
          >
            <img className="thumb_photo" src={photo} alt="LotPhoto" />
          </ThumbStyled>
        ))}
      </div>

      {isLightBox && (
        <Lightbox
          mainSrc={photos[curPhoto]}
          nextSrc={photos[(curPhoto + 1) % photos.length]}
          prevSrc={photos[(curPhoto + photos.length - 1) % photos.length]}
          onCloseRequest={() => setLightBox(false)}
          onMovePrevRequest={() =>
            setCurPhoto((curPhoto + photos.length - 1) % photos.length)
          }
          onMoveNextRequest={() => setCurPhoto((curPhoto + 1) % photos.length)}
        />
      )}
    </GalleryStyled>
  );
};
