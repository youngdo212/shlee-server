import './Tooltip.scss';
import React from 'react';
import PropTypes from 'prop-types';

export default function Tooltip(props) {
  const { children, title } = props;

  return (
    <div className="tooltip-container">
      {children}
      <div className="tooltip">{title}</div>
    </div>
  );
}

Tooltip.propTypes = {
  children: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
};
