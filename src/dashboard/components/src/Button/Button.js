import './Button.scss';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ButtonBase from '../ButtonBase';

export default function Button(props) {
  const {
    children, variant, size, ...restProps
  } = props;

  return (
    <ButtonBase
      className={classNames(
        'button',
        `button--variant-${variant}`,
        `button--size-${size}`,
      )}
      {...restProps}
    >
      {children}
    </ButtonBase>
  );
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  variant: PropTypes.oneOf([
    'text',
    'outlined',
    'filled',
  ]),
  size: PropTypes.oneOf([
    'small',
    'medium',
    'large',
  ]),
};

Button.defaultProps = {
  variant: 'text',
  size: 'medium',
};
