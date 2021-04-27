import loader from "../../../Assets/Images/loader.svg";

import styles from "./buttonoutline.module.scss";

const Shape = ({ width, height, active, disabled }) => {
  const smoothQ = 98;
  const radius = 44;

  const W = width - 2;
  const H = height - 2;
  const R = height / 2.4 < radius ? height / 2.4 : radius;
  const _smooth = height / 2 < radius ? 100 : smoothQ;
  const S = (0.08 + R * 0.000012) * _smooth - 4 / _smooth - 3;

  const shapePresent = active
    ? `${styles.shape} ${styles.shapeActive}`
    : `${styles.shape} ${styles.shapeIdle}`;

  const shapeClassName = disabled
    ? `${styles.shape} ${styles.shapeDisabled}`
    : shapePresent;
  return (
    <svg
      className={shapeClassName}
      version="1.1"
      width="100%"
      height="100%"
      viewBox={`-1 -1 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={`M ${R} 0 H${W - R} C ${W - S} 0 ${W} ${S} ${W} ${R}
          V ${H - R} C ${W} ${H - S} ${W - S} ${H} ${W - R} ${H}
          H ${R} C ${S} ${H} 0 ${H - S} 0 ${H - R}
          V ${R} C 0 ${S} ${S} 0 ${R} 0 Z`}
      ></path>
    </svg>
  );
};

const Icon = ({ icon, disabled, title, active }) => {
  const iconStyle = title ? { marginRight: "8px" } : {};

  const iconPresent = active
    ? `${styles.icon} ${styles.iconActive}`
    : `${styles.icon} ${styles.iconIdle}`;

  const iconClassName = disabled
    ? `${styles.icon} ${styles.iconDisabled}`
    : iconPresent;

  if (icon) {
    return (
      <div className={iconClassName} style={iconStyle}>
        {icon}
      </div>
    );
  }
  return null;
};

const Loader = () => {
  return (
    <div className={styles.loader}>
      <img src={loader} alt="Загрузка" />
    </div>
  );
};

const Title = ({ title, disabled, active }) => {
  const titlePresent = active
    ? `${styles.title} ${styles.titleActive}`
    : `${styles.title} ${styles.titleIdle}`;

  const titleClassname = disabled
    ? `${styles.title} ${styles.titleDisabled}`
    : titlePresent;

  if (title) {
    return <div className={titleClassname}>{title}</div>;
  }
  return null;
};

export const ButtonOutline = ({
  width,
  height,
  title,
  icon,
  loader = false,
  active,
  disabled,
  handler,
}) => {
  return (
    <button
      className={styles.button}
      style={{ width, height }}
      onClick={handler}
      disabled={disabled}
    >
      <Shape
        width={width}
        height={height}
        active={active}
        disabled={disabled}
      />

      {loader && <Loader />}

      {!loader && (
        <Icon icon={icon} disabled={disabled} title={title} active={active} />
      )}

      <Title title={title} disabled={disabled} active={active} />
    </button>
  );
};
