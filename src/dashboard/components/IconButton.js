function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';
import PropTypes from 'prop-types';

export default function IconButton(props) {
  var children = props.children,
      tooltip = props.tooltip,
      restProps = _objectWithoutProperties(props, ['children', 'tooltip']);

  return React.createElement(
    'div',
    { className: 'icon-button-container' },
    React.createElement(
      'button',
      Object.assign({ className: 'icon-button' }, restProps),
      children
    ),
    tooltip && React.createElement(
      'div',
      { className: 'tooltip' },
      tooltip
    )
  );
}

IconButton.propTypes = {
  children: PropTypes.element.isRequired,
  tooltip: PropTypes.string
};