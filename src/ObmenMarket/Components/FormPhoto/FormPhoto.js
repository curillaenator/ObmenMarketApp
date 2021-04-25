import loader from "../../../Assets/Images/preloader.gif";

import styles from "./formphoto.module.scss";

export const FormPhoto = ({ photo, icon, removeImg }) => {
  return (
    <div
      className={styles.photoCont}
      key={photo}
      onClick={() => removeImg(photo)}
    >
      <img className={styles.photo} src={photo} alt="" draggable={false} />

      {icon}
    </div>
  );
};

export const FormPhotoLoading = () => {
  return (
    <div className={styles.uploading}>
      <div className={styles.loaderMask}>
        <img src={loader} alt="Loading" />
      </div>
    </div>
  );
};
