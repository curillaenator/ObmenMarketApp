import { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";

import { StatusBar } from "../Components/StatusBar/StatusBar";
import { Button } from "../Components/Button/Button";
import { ButtonOutline } from "../Components/Button/ButtonOutline";

import lotpic from "../../Assets/Images/lot.jpg";

import { setIsCurrentLotAfterRedirect } from "../../Redux/Reducers/lots";
import { setFormMode } from "../../Redux/Reducers/home";

import styles from "./lotfull.module.scss";

const Gallery = () => {
  const temp = ["1", "2", "3"];
  return (
    <div className={styles.gallery}>
      <div className={styles.big}>
        <img src={lotpic} alt="" />
      </div>

      <div className={styles.track}>
        {temp.map((ph) => (
          <div className={styles.small} key={ph}>
            <img src={lotpic} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
};

const LotFull = (props) => {
  const { setIsCurrentLotAfterRedirect, setFormMode } = props;
  useEffect(() => {
    setFormMode(false);
    setIsCurrentLotAfterRedirect(false);
  }, [setIsCurrentLotAfterRedirect, setFormMode]);

  const ref = useRef(0);
  const initial = ref.current.clientWidth;

  const [followTitle, setFollowTitle] = useState(
    initial < 440 ? "" : "Следить за лотом"
  );

  const [buttonsContWidth, setButtonsContWidth] = useState(initial);
  const [buttons, setButtons] = useState({ offer: 0, follow: 0 });

  const widthHandler = () => {
    const win = window.innerWidth;
    if (win >= 1024) setButtonsContWidth(440);
    if (win < 1024) setButtonsContWidth(win / 2 - 48);
    if (win < 375) setButtonsContWidth(win / 2 - 40);
  };

  useEffect(() => {
    console.log(initial);
    const win = window.innerWidth;
    const moreThan1024 = (!buttonsContWidth ? initial : buttonsContWidth) - 237;
    const lessThan1024 = (!buttonsContWidth ? initial : buttonsContWidth) - 76;
    if (win >= 1024) {
      setFollowTitle("Следить за лотом");
      setButtons({ offer: 217, follow: moreThan1024 });
    }
    if (win < 1024) {
      setFollowTitle("");
      setButtons({ offer: lessThan1024, follow: 56 });
    }
  }, [initial, buttonsContWidth]);

  useEffect(() => {
    window.addEventListener("resize", widthHandler);
    return () => {
      window.removeEventListener("resize", widthHandler);
    };
  }, []);

  return (
    <div className={styles.lot}>
      <div className={styles.info}>
        <Gallery />

        <div className={styles.status}>
          <StatusBar />
        </div>

        <div className={styles.spacer}></div>

        <div className={styles.buttons} ref={ref}>
          <Button
            width={buttons.offer}
            height={56}
            title="Предложить обмен"
            icon={props.icons.add}
          />
          <ButtonOutline
            width={buttons.follow}
            height={56}
            title={followTitle}
            icon={props.icons.bell}
          />
        </div>

        {/* <div class="thelot__main-stats">
          <div class="thelot__main-statsItem">
            <h3 class="thelot__main-statsName">Примерная оценка стоимости</h3>
            <p class="thelot__main-statsValue">от 5000₽ до 7000₽</p>
          </div>
          <div class="thelot__main-statsItem">
            <h3 class="thelot__main-statsName">Автор готов доплатить</h3>
            <p class="thelot__main-statsValue">Да</p>
          </div>
          <div class="thelot__main-statsItem">
            <h3 class="thelot__main-statsName">
              Приоритетные категории обмена
            </h3>
            <p class="thelot__main-statsValue">Бытовая техника</p>
            <p class="thelot__main-statsValue">Электроника</p>
            <p class="thelot__main-statsValue">Одежда</p>
            <p class="thelot__main-statsValue">Телефоны</p>
          </div>
        </div> */}
      </div>

      <div className={styles.description}>Description</div>
      {/* <div class="thelot__desc">
          <div class="thelot__desc-user">
            <a href="#">
              <img src="./img/img/ava1.jpg" alt="Username" />
              <p>Username</p>
            </a>
          </div>
          <h2 class="thelot__desc-titleH2">Название лота</h2>
          <p class="thelot__desc-txt">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam,
            voluptates maiores impedit, facere ad culpa illo a consectetur
            molestias velit odio aspernatur quasi distinctio unde! Rem, nam,
            obcaecati aliquid quia commodi repudiandae libero voluptatibus ipsum
            veniam excepturi asperiores totam porro natus ad eligendi?
            Doloremque vero eos ut dignissimos dolores praesentium delectus in
            suscipit quam facilis quisquam quae cumque, animi ad!
          </p>
          <h3 class="thelot__desc-titleH3">Хочу обменять на:</h3>
          <p class="thelot__desc-txt">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
            inventore voluptates delectus, nisi ad, harum repudiandae nesciunt
            omnis quae alias accusantium deleniti assumenda iste et velit eos
            officiis distinctio quibusdam.
          </p>
        </div> */}
    </div>
  );
};

const mstp = (state) => ({
  icons: state.ui.icons,
});

export const LotFullCont = connect(mstp, {
  setIsCurrentLotAfterRedirect,
  setFormMode,
})(LotFull);
