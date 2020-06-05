import React from 'react';
import PropTypes from 'prop-types';

const VARIANT = {
  TEXT: 'text',
  OUTLINEDS: 'outlined',
  FILLED: 'filled',
};
const SIZE = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
};

export default function Button(props) {
  const variantClassNames = {
    [VARIANT.TEXT]: 'button--variant-text',
    [VARIANT.OUTLINEDS]: 'button--variant-outlined',
    [VARIANT.FILLED]: 'button--variant-filled',
  };
  const sizeClassNames = {
    [SIZE.SMALL]: 'button--size-small',
    [SIZE.MEDIUM]: 'button--size-medium',
    [SIZE.LARGE]: 'button--size-large',
  };
  const {
    variant, size, children, ...restProps
  } = props;
  const className = `button ${variantClassNames[variant]} ${sizeClassNames[size]}`;

  return (
    <button className={className} {...restProps}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(Object.values(VARIANT)),
  size: PropTypes.oneOf(Object.values(SIZE)),
};

Button.defaultProps = {
  variant: VARIANT.TEXT,
  size: SIZE.MEDIUM,
};
