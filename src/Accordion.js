/* eslint-disable no-undef */
/* eslint-disable func-names */
/* eslint-disable no-else-return */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import './Accordion.scss';

function Accordion(props) {
  const { title, content, index } = props;

  const [setActive, setActiveState] = useState('');
  const [setHeight, setHeightState] = useState('0px');

  const children = useRef({});

  useEffect(() => {
    if (setActive === 'active') {
      setHeightState(`${children.current.scrollHeight + 75}px`);
    }
  }, [content, setActive, children.current.scrollHeight]);

  const toggleAccordion = () => {
    setActiveState(setActive === '' ? 'active' : '');
    setHeightState(setActive === 'active' ? '0px' : `${children.current.scrollHeight + 75}px`);
  };

  return (
    <div className='accordion__section' key={`accordion-${title}-${index}`}>
      <div className={`accordion ${setActive}`} onClick={toggleAccordion}>
        <h2 className='accordion__title'>{title}</h2>
      </div>
      <div ref={children} style={{ maxHeight: `${setHeight}` }} className='accordion__content'>
        {content}
      </div>
    </div>
  );
}

Accordion.propTypes = {
  index: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.oneOfType([PropTypes.object, PropTypes.arrayOf(PropTypes.object)]).isRequired,
};

export default Accordion;
