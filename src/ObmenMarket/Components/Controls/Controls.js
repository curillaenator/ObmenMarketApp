import { useEffect, useState } from "react";

import { ButtonGhost } from "../Button/ButtonGhost";

import cloudtailpic from "../../../Assets/Icons/cloudtail.svg";

import styles from "./controls.module.scss";

export const Controls = ({
  icons,
  isAuth,
  user,
  isFormModeOn,
  lotMeta,
  history,
  handleEditLot,
  onLotCreateFormCancel,
}) => {
  const [isTitles, setIsTitles] = useState(window.innerWidth >= 640);

  const handleDeletePost = () => {
    onLotCreateFormCancel(lotMeta.postid);
    history.push("/");
  };

  useEffect(() => {
    const listener = () => setIsTitles(window.innerWidth >= 640);

    window.addEventListener("resize", listener);
    return () => {
      window.removeEventListener("resize", listener);
    };
  });

  const titler = (ttl) => (isTitles ? ttl : "");

  return (
    <div className={styles.controls}>
      <ButtonGhost
        title={titler("Назад")}
        handler={history.goBack}
        icon={icons.back}
      />

      {isAuth && user && (user.uid === lotMeta.uid || user.isAdmin) && (
        <div className={styles.options}>
          <ButtonGhost
            title={titler("Поделиться")}
            handler={() => {}}
            icon={icons.share}
          />

          <div className={styles.editbtn}>
            <ButtonGhost
              title={titler("Редактировать")}
              handler={handleEditLot}
              icon={icons.edit}
              active={isFormModeOn}
              shape={true}
            />

            {isFormModeOn && (
              <img className={styles.cloudtail} src={cloudtailpic} alt="tail" />
            )}
          </div>

          <ButtonGhost
            title={titler("Удалить")}
            handler={handleDeletePost}
            icon={icons.delete}
          />
        </div>
      )}
    </div>
  );
};
