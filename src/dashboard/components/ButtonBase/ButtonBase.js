import './ButtonBase.scss';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default function ButtonBase({
  children,
  className,
  ...restProps
}) {
  return (
    <button
      className={classNames(
        'button-base',
        className,
      )}
      {...restProps}
    >
      {children}
    </button>
  );
}

ButtonBase.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
