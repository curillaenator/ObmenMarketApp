import { useState } from "react";
import Lightbox from "react-image-lightbox";
import ImageShadow from "react-image-shadow";

import openGallery from "../../../Assets/Icons/openGallery.svg";

import styles from "./gallery.module.scss";

const Tint = ({ title, icon, count }) => {
  const iconMargin = title ? { marginRight: "18px" } : {};

  return (
    <div className={styles.tint}>
      <div className={styles.table}>
        {icon && <img src={icon} alt={title} style={iconMargin} />}
        {title && (
          <div className={styles.tabletitle}>
            <h3>{title}</h3>
            <p>{`${count} фото`}</p>
          </div>
        )}
      </div>
    </div>
  );
};

const Thumb = ({ photo, label, selected, setSelected }) => {
  return (
    <div
      className={
        label === selected
          ? `${styles.thumb} ${styles.thumb_active}`
          : styles.thumb
      }
      onClick={() => setSelected(label)}
    >
      <img src={photo} alt="" />
    </div>
  );
};

export const Gallery = ({ lotPhotos }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(0);

  return (
    <div className={styles.gallery}>
      <div className={styles.mainphoto} onClick={() => setIsOpen(true)}>
        <ImageShadow
          src={lotPhotos[selected]}
          className={styles.trackshadowed}
          shadowRadius="16"
          shadowBlur="20"
          style={{ width: "100%" }}
        />

        <Tint
          title="Открыть галлерею"
          icon={openGallery}
          count={lotPhotos.length}
        />
      </div>

      <div className={styles.thumbtrack}>
        {lotPhotos.map((photo, i) => (
          <Thumb
            key={photo}
            photo={photo}
            label={i}
            selected={selected}
            setSelected={setSelected}
          />
        ))}
      </div>

      {isOpen && (
        <Lightbox
          mainSrc={lotPhotos[selected]}
          nextSrc={lotPhotos[(selected + 1) % lotPhotos.length]}
          prevSrc={
            lotPhotos[(selected + lotPhotos.length - 1) % lotPhotos.length]
          }
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() =>
            setSelected((selected + lotPhotos.length - 1) % lotPhotos.length)
          }
          onMoveNextRequest={() =>
            setSelected((selected + 1) % lotPhotos.length)
          }
        />
      )}
    </div>
  );
};
