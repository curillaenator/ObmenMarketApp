import styles from "./buttonghost.module.scss";

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
};

const Title = ({ title, disabled, active, fontsize }) => {
  const titlePresent = active
    ? `${styles.title} ${styles.titleActive}`
    : `${styles.title} ${styles.titleIdle}`;

  const titleClassname = disabled
    ? `${styles.title} ${styles.titleDisabled}`
    : titlePresent;

  if (title) {
    return (
      <div className={titleClassname} style={{ fontSize: fontsize }}>
        <div>{title}</div>
      </div>
    );
  }
  return null;
};

const Shape = () => {
  return <div className={styles.shape}></div>;
};

export const ButtonGhost = ({
  width,
  height,
  title,
  icon,
  handler,
  active,
  disabled,
  shape,
  fontsize,
}) => {
  return (
    <button
      className={styles.ghost}
      //   style={{ width, height }}
      onClick={handler}
      disabled={disabled}
    >
      {shape && active && <Shape />}

      <Icon icon={icon} disabled={disabled} title={title} active={active} />

      <Title
        title={title}
        disabled={disabled}
        active={active}
        fontsize={fontsize}
      />
    </button>
  );
};
