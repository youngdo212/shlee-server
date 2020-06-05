function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import PropTypes from 'prop-types';

var VARIANT = {
  TEXT: 'text',
  OUTLINEDS: 'outlined',
  FILLED: 'filled'
};
var SIZE = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large'
};

export default function Button(props) {
  var _variantClassNames, _sizeClassNames;

  var variantClassNames = (_variantClassNames = {}, _defineProperty(_variantClassNames, VARIANT.TEXT, 'button--variant-text'), _defineProperty(_variantClassNames, VARIANT.OUTLINEDS, 'button--variant-outlined'), _defineProperty(_variantClassNames, VARIANT.FILLED, 'button--variant-filled'), _variantClassNames);
  var sizeClassNames = (_sizeClassNames = {}, _defineProperty(_sizeClassNames, SIZE.SMALL, 'button--size-small'), _defineProperty(_sizeClassNames, SIZE.MEDIUM, 'button--size-medium'), _defineProperty(_sizeClassNames, SIZE.LARGE, 'button--size-large'), _sizeClassNames);

  var variant = props.variant,
      size = props.size,
      children = props.children,
      restProps = _objectWithoutProperties(props, ['variant', 'size', 'children']);

  var className = 'button ' + variantClassNames[variant] + ' ' + sizeClassNames[size];

  return React.createElement(
    'button',
    Object.assign({ className: className }, restProps),
    children
  );
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(Object.values(VARIANT)),
  size: PropTypes.oneOf(Object.values(SIZE))
};

Button.defaultProps = {
  variant: VARIANT.TEXT,
  size: SIZE.MEDIUM
};