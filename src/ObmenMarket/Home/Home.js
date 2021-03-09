import { Welcome } from "./Welcome/Welcome";
import { CtaCont } from "./CTA/CTA";
import { LotsCont } from "./Lots/Lots";

import styles from "./home.module.scss";

export const HomeCont = () => {
  return (
    <div className={styles.home}>
      <Welcome />
      <CtaCont />
      <LotsCont />
    </div>
  );
};
