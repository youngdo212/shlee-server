function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import './Button.scss';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ButtonBase from '../ButtonBase';

export default function Button(props) {
  var children = props.children,
      variant = props.variant,
      size = props.size,
      restProps = _objectWithoutProperties(props, ['children', 'variant', 'size']);

  return React.createElement(
    ButtonBase,
    Object.assign({
      className: classNames('button', 'button--variant-' + variant, 'button--size-' + size)
    }, restProps),
    children
  );
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['text', 'outlined', 'filled']),
  size: PropTypes.oneOf(['small', 'medium', 'large'])
};

Button.defaultProps = {
  variant: 'text',
  size: 'medium'
};