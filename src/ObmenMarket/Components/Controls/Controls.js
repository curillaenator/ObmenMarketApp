import { useLocation } from "react-router-dom";

import { ButtonGhost } from "../Button/ButtonGhost";
import { DropdownShare } from "../Dropdown/DropdownShare";

import cloudtailpic from "../../../Assets/Icons/cloudtail.svg";

import styles from "./controls.module.scss";

export const Controls = ({
  isMobile,
  icons,
  isAuth,
  isAdmin,
  ownerID,
  isFormModeOn,
  setFormMode,
  lotMeta,
  history,
  removeLot,
}) => {
  const location = useLocation();

  const shareItems = [
    {
      title: "вКонтакте",
      icon: icons.shareDrop.vk,
      handler: () => {
        window.open(
          `https://vk.com/share.php?url=https://obmen.market${history.createHref(
            location
          )}?utm_source=vKontakte`,
          "_blank"
        );
      },
    },
    {
      title: "Facebook",
      icon: icons.shareDrop.fb,
      handler: () => {
        window.open(
          ` https://www.facebook.com/sharer/sharer.php?u=https://obmen.market${history.createHref(
            location
          )}?utm_source=Facebook`,
          "_blank"
        );
      },
    },
    {
      title: "Twitter",
      icon: icons.shareDrop.twitter,
      handler: () => {
        window.open(
          `http://twitter.com/share?url=https://obmen.market${history.createHref(
            location
          )}?utm_source=Twitter`,
          "_blank"
        );
      },
    },
  ];

  const titler = (ttl) => (!isMobile ? ttl : "");

  return (
    <div className={styles.controls}>
      <ButtonGhost
        title={titler("Назад")}
        handler={() => {
          setFormMode(false);
          history.goBack();
        }}
        icon={icons.back}
      />

      <div className={styles.options}>
        <DropdownShare
          isMobile={isMobile}
          title={titler("Поделиться")}
          items={shareItems}
          commonLink={`https://obmen.market${history.createHref(location)}`}
          disabled={isFormModeOn}
        />

        {isAuth && ownerID === lotMeta.uid && (
          <div className={styles.editbtn}>
            <ButtonGhost
              title={titler("Редактировать")}
              handler={() => setFormMode(!isFormModeOn)}
              icon={icons.edit}
              active={isFormModeOn}
              shape={true}
            />

            {isFormModeOn && (
              <img className={styles.cloudtail} src={cloudtailpic} alt="tail" />
            )}
          </div>
        )}

        {isAuth && (ownerID === lotMeta.uid || isAdmin) && (
          <ButtonGhost
            title={titler("Удалить")}
            handler={() => removeLot(lotMeta.postid, history)}
            icon={icons.delete}
            danger={true}
            disabled={isFormModeOn}
          />
        )}
      </div>
    </div>
  );
};
