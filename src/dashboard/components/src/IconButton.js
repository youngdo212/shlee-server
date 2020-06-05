import React from 'react';
import PropTypes from 'prop-types';

export default function IconButton(props) {
  const { children, tooltip, ...restProps } = props;

  return (
    <div className="icon-button-container">
      <button className="icon-button" {...restProps}>
        {children}
      </button>
      {tooltip && <div className="tooltip">{tooltip}</div>}
    </div>
  );
}

IconButton.propTypes = {
  children: PropTypes.element.isRequired,
  tooltip: PropTypes.string,
};
