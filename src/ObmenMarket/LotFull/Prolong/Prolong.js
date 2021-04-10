import { useState } from "react";
import Popup from "reactjs-popup";
import { Button } from "../../Components/Button/Button";
import { ButtonOutline } from "../../Components/Button/ButtonOutline";

import time from "../../../Assets/Icons/modal_time.svg";
import rock from "../../../Assets/Icons/rock.svg";
import bankcard from "../../../Assets/Icons/bankcard.svg";
import googlepay from "../../../Assets/Icons/googlepay.svg";
import applepay from "../../../Assets/Icons/applepay.svg";

import styles from "./prolong.module.scss";
import "./prolong.scss";

const ModalInfo = ({ icon, title, text }) => {
  return (
    <div className={styles.info}>
      <img className={styles.info_img} src={icon} alt="" />

      <div className={styles.info_title}>{title}</div>

      <div className={styles.info_text}>{text}</div>
    </div>
  );
};

const Option = ({ title, icon, option, payment, setPayment }) => {
  const optionActive = option === payment ? { backgroundColor: "#ffffff" } : {};
  const imgStyle = title !== "" ? { marginRight: "12px" } : {};
  return (
    <div
      className={styles.option}
      onClick={() => setPayment(option)}
      style={optionActive}
    >
      <img style={imgStyle} src={icon} alt={title} />
      <div className={styles.option_title}>{title}</div>
    </div>
  );
};

const Modal = ({ close, add48hours, lotMeta }) => {
  const [payment, setPayment] = useState("bankcard");
  const [modalPage, setModalPage] = useState(0);

  const handleAdd48Hours = () => {
    add48hours(lotMeta);
    close();
  };

  const options = [
    { option: "bankcard", title: "Банковской картой", icon: bankcard },
    { option: "applepay", title: "", icon: applepay },
    { option: "googlepay", title: "", icon: googlepay },
  ];

  return (
    <div className={styles.modal}>
      {modalPage === 0 && (
        <div className={styles.modalpage}>
          <ModalInfo
            icon={time}
            title="Продление объявления на 48 часов"
            text="К счетчику времени публикации вашего объявления будет добавлено 48
              часов с момента продления. Таким образом вы можете успеть получить
              больше интересных предложений"
          />

          <div className={styles.payment}>
            <div className={styles.payment_select}>
              {options.map((option) => (
                <Option
                  key={option.option}
                  title={option.title}
                  icon={option.icon}
                  option={option.option}
                  payment={payment}
                  setPayment={setPayment}
                />
              ))}
            </div>

            <div className={styles.paybutton}>
              <Button
                width={163}
                height={56}
                title="Оплатить 30₽"
                handler={() => setModalPage(modalPage + 1)}
              />
            </div>

            <div className={styles.paybutton}>
              <ButtonOutline
                width={163}
                height={56}
                title="Отмена"
                handler={() => close()}
              />
            </div>
          </div>
        </div>
      )}

      {modalPage === 1 && (
        <div className={styles.modalpage}>
          <ModalInfo
            icon={rock}
            title="При βeta-тестировании всё бесплатно!"
            text="На данный момент все платные фичи ресурса obmen.market предоставляются абсолютно бесплатно, т.к. мы собираем много важной для нас информации, которая поможет сделать сайт намного удобнее и полезней!
            Спасибо за проявленный интерес к платной услуге, пожалуйста, продолжайте пользоваться сайтом в обычном режиме и нажимать любые кнопки, если вы чувствуете в этом необходимость! "
          />

          <div className={styles.paybutton}>
            <Button
              width={163}
              height={56}
              title="Cупер"
              handler={handleAdd48Hours}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export const Prolong = ({
  butCont,
  icons,
  setIsModalOn,
  add48hours,
  lotMeta,
}) => {
  const Trigger = (open) => (
    <div className={styles.prolongButton}>
      <Button
        width={butCont}
        height={56}
        title="Продлить объявление на 48 часов"
        subtitle="за 30 рублей"
        titlewidth="calc(100% - 64px)"
        icon={icons.prolong}
      />
    </div>
  );

  return (
    <Popup
      trigger={Trigger}
      modal
      position="center center"
      lockScroll={true}
      closeOnDocumentClick={false}
      onOpen={() => setIsModalOn(true)}
      onClose={() => setIsModalOn(false)}
      //   nested
    >
      {(close) => (
        <Modal close={close} add48hours={add48hours} lotMeta={lotMeta} />
      )}
    </Popup>
  );
};
