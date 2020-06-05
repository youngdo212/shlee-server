function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import './IconButton.scss';
import React from 'react';
import PropTypes from 'prop-types';
import ButtonBase from '../ButtonBase';
import Tooltip from '../Tooltip';

export default function IconButton(props) {
  var children = props.children,
      tooltip = props.tooltip,
      restProps = _objectWithoutProperties(props, ['children', 'tooltip']);

  var iconButton = React.createElement(
    ButtonBase,
    Object.assign({ className: 'icon-button' }, restProps),
    children
  );

  if (!tooltip) return iconButton;

  return React.createElement(
    Tooltip,
    { title: tooltip },
    iconButton
  );
}

IconButton.propTypes = {
  children: PropTypes.element.isRequired,
  tooltip: PropTypes.string
};