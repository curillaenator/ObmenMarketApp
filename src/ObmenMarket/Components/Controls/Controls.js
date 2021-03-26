import styles from "./controls.module.scss";

import back from "../../../Assets/Icons/back_arrow.svg";
import share from "../../../Assets/Icons/share.svg";
import del from "../../../Assets/Icons/delete.svg";
import edit from "../../../Assets/Icons/edit.svg";

export const Controls = (props) => {
  return (
    <div className={styles.controls}>
      <div className={styles.back}>
        <img src={back} alt="Вернуться" />
        <p>Назад</p>
      </div>

      <div className={styles.options}>
        <div className={styles.option}>
          <img src={share} alt="Поделиться" />
          <p>Поделиться</p>
        </div>

        <div className={styles.option}>
          <img src={edit} alt="Редактировать" />
          <p>Редактировать</p>
        </div>

        <div className={styles.option}>
          <img src={del} alt="Удалить" />
          <p>Удалить</p>
        </div>
      </div>
    </div>
  );
};
