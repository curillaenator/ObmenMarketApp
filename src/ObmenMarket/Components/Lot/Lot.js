import { useEffect, useState } from "react";

import lotpic from "../../../Assets/Images/lot.jpg";
import avapic from "../../../Assets/Images/ava.jpg";
import offerspic from "../../../Assets/Icons/offers.svg";
import timepic from "../../../Assets/Icons/time.svg";

import styles from "./lot.module.scss";

export const Lot = ({ data }) => {
  const lotsWidthActuator = (win) => {
    win >= 1024 && setLotWidth((1024 - 112) / 2 - 28);
    win >= 640 && win < 1024 && setLotWidth((win - 64) / 2 - 16);
    win >= 375 && win < 640 && setLotWidth(win - 64);
    win >= 320 && win < 375 && setLotWidth(win - 48);
  };
  const [lotWidth, setLotWidth] = useState(null);
  useEffect(() => lotsWidthActuator(window.innerWidth), []);
  useEffect(() => {
    window.addEventListener("resize", () =>
      lotsWidthActuator(window.innerWidth)
    );
    return () => {
      window.removeEventListener("resize", () =>
        lotsWidthActuator(window.innerWidth)
      );
    };
  }, []);

  return (
    <div className={styles.lot} style={{ width: lotWidth }}>
      <div className={styles.owner}>
        <img src={avapic} alt="PHusername" draggable="false" />
        <p>Кирил Арт</p>
      </div>

      <div className={styles.content}>
        <img
          className={styles.photo}
          src={lotpic}
          alt="PHlotname"
          draggable="false"
          style={{ height: lotWidth * 0.563 }}
        />

        <div className={styles.title}>{data.title}</div>

        <div className={styles.description}>{data.description}</div>

        <div className={styles.statusbar}>
          <div className={styles.offers}>
            <img src={offerspic} alt="O" />
            <p>1 предложение</p>
          </div>
          <div className={styles.timing}>
            <p>2021/03/30 14:48:21</p>
            <img src={timepic} alt="T" />
          </div>
        </div>
      </div>
    </div>
  );
};
