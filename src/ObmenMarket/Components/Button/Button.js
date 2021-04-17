import styles from "./button.module.scss";

const Shape = ({ width, height, active, disabled }) => {
  const smoothQ = 98;
  const radius = 44;

  const W = width;
  const H = height;
  const R = H / 2.4 < radius ? H / 2.4 : radius;
  const _smooth = H / 2 < radius ? 100 : smoothQ;
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
      viewBox={`0 0 ${width} ${height}`}
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
  const iconStyle = title ? { marginRight: "14px" } : {};

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

const Title = ({ title, subtitle, disabled, active, fontsize, titlewidth }) => {
  const titlePresent = active
    ? `${styles.title} ${styles.titleActive}`
    : `${styles.title} ${styles.titleIdle}`;

  const titleClassname = disabled
    ? `${styles.title} ${styles.titleDisabled}`
    : titlePresent;

  const titleW = titlewidth ? { width: titlewidth } : {};
  const titleFz = fontsize ? { fontSize: fontsize } : {};
  const titleStyle = { ...titleW, ...titleFz };

  if (title) {
    return (
      <div className={titleClassname} style={titleStyle}>
        <div>{title}</div>
        {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
      </div>
    );
  }
  return null;
};

export const Button = ({
  width,
  height,
  title,
  subtitle,
  icon,
  active,
  disabled,
  handler,
  titlewidth,
  fontsize,
}) => {
  return (
    <button
      className={styles.ctabutton}
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

      <Icon icon={icon} disabled={disabled} title={title} active={active} />

      <Title
        title={title}
        titlewidth={titlewidth}
        subtitle={subtitle}
        disabled={disabled}
        active={active}
        fontsize={fontsize}
      />
    </button>
  );
};
