import React from 'react';
import PropTypes from 'prop-types';

/**
 * Primary UI component for user interaction
 */
 import styles from "./button.module.scss";

 const Shape = ({ width, height, active, disabled }) => {
   const smoothQ = 72;
   const radius = 25;
 
   const W = width;
   const H = height;
   const R = H / 2 < radius ? H / 2 : radius;
   const _smooth = H / 2 < radius ? 85 : smoothQ;
   const S = (0.08 + R * 0.0009) * _smooth - 5 / _smooth - 4;
 
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
 
 export const Button = ({
   width,
   height,
   title,
   icon,
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
       <Icon icon={icon} disabled={disabled} title={title} active={active} />
       <Title title={title} disabled={disabled} active={active} />
     </button>
   );
 };
 

Button.propTypes = {
  /**
   * Is this the principal call to action on the page?
   */
  primary: PropTypes.bool,
  /**
   * What background color to use
   */
  backgroundColor: PropTypes.string,
  /**
   * How large should the button be?
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /**
   * Button contents
   */
  label: PropTypes.string.isRequired,
  /**
   * Optional click handler
   */
  onClick: PropTypes.func,
};

Button.defaultProps = {
  backgroundColor: null,
  primary: false,
  size: 'medium',
  onClick: undefined,
};
