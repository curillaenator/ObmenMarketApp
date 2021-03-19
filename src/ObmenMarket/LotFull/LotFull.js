import { useRef, useState, useEffect } from "react";
import { connect } from "react-redux";

import { StatusBar } from "../Components/StatusBar/StatusBar";
import { Button } from "../Components/Button/Button";
import { ButtonOutline } from "../Components/Button/ButtonOutline";

import lotpic from "../../Assets/Images/lot.jpg";
import avapic from "../../Assets/Images/ava.jpg";

import styles from "./lotfull.module.scss";

const Gallery = () => {
  const temp = ["1", "2", "3", "4", "5"];
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
  const ref = useRef(0);
  const [width, setWidth] = useState(window.innerWidth);
  console.log(width);

  const widthHandler = () => {
    const width = window.innerWidth;
    setWidth(width);
  };

  useEffect(() => {
    document.addEventListener("resize", widthHandler());
    return document.removeEventListener("resize", widthHandler());
  });

  return (
    <div className={styles.lot}>
      <div className={styles.info}>
        <Gallery />

        <div className={styles.status}>
          <StatusBar />
        </div>

        <div className={styles.spacer}></div>

        <div className={styles.buttons} ref={ref}>
          <Button width={220} height={56} title="Предложить обмен" />
          <ButtonOutline width={220} height={56} title="Добавить 72 часа" />
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

const mstp = (state) => ({});

export const LotFullCont = connect(mstp, {})(LotFull);
