import { useEffect } from "react";
import { Lot } from "../../Components/Lot/Lot";

import styles from "./lots.module.scss";

export const Lots = ({
  user,
  firestore,
  getLotsList,
  isLotsLoaded,
  ...props
}) => {
  useEffect(() => getLotsList(), [getLotsList, isLotsLoaded]);
  const lotsDisplay = props.isFormModeOn ? { display: "none" } : {};
  return (
    <div className={styles.lots} style={lotsDisplay}>
      {props.lotsList.map((p) => (
        <Lot data={p} key={p.lotId} />
      ))}
    </div>
  );
};
