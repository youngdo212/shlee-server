function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import './ButtonBase.scss';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default function ButtonBase(props) {
  var children = props.children,
      className = props.className,
      restProps = _objectWithoutProperties(props, ['children', 'className']);

  return React.createElement(
    'button',
    Object.assign({
      className: classNames('button-base', className)
    }, restProps),
    children
  );
}

ButtonBase.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};