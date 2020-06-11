import './TextField.scss';
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default function TextField({
  autoFocus = false,
  error = false,
  errorMessage,
  label,
  multiLine = false,
  placeholder,
  rows = 1,
  type = 'text',
  value,
  width,
  ...restProps
}) {
  const InputComponent = multiLine ? 'textarea' : 'input';

  return (
    <div
      className={classnames(
        'text-field',
        error && 'text-field--error',
      )}
      style={{ width }}
    >
      <InputComponent
        className={classnames(
          'text-field__input',
          `text-field__input--tag-${InputComponent}`,
        )}
        autoFocus={autoFocus}
        placeholder={placeholder}
        rows={rows}
        type={type}
        value={value}
        {...restProps}
      />
      {error && errorMessage && <div className="text-field__error-message">{errorMessage}</div>}
      {label && <div className="text-field__label">{label}</div>}
    </div>
  );
}

TextField.propTypes = {
  label: PropTypes.string,
  multiLine: PropTypes.bool,
  rows: PropTypes.number,
  width: PropTypes.number,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  type: PropTypes.oneOf(['text', 'number']),
  autoFocus: PropTypes.bool,
};
