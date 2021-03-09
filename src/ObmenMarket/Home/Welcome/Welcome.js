import styles from "./welcome.module.scss";

export const Welcome = () => {
  return (
    <h1 className={styles.welcome}>
      Обменяй ненужное <br />
      на нужное!
    </h1>
  );
};
