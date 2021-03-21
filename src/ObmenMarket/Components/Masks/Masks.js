import styles from "./masks.module.scss";
import { Button } from "../Button/Button";

export const Masks = () => {
  return (
    <div className={styles.masks}>
      <div className={styles.square}>
        <Button width={76} height={76} />
      </div>
      <div className={styles.photo}>
        <Button width={428} height={240.95} />
      </div>
      <div className={styles.photo}>
        <Button width={428} height={240.95} />
      </div>
    </div>
  );
};
