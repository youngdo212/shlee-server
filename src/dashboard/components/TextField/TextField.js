import './TextField.scss';
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class TextField extends React.Component {
  renderInput({
    placeholder,
    value,
    type = 'text',
    autofocus = false,
    ...restProps
  }) {
    return (
      <input
        className={classnames(
          'text-field__input',
          'text-field__input--tag-input',
        )}
        placeholder={placeholder}
        value={value}
        type={type}
        autoFocus={autofocus}
        {...restProps}
      />
    );
  }

  renderTextarea({
    rows = 1,
    placeholder,
    value,
    autofocus = false,
    ...restProps
  }) {
    return (
      <textarea
        className={classnames(
          'text-field__input',
          'text-field__input--tag-textarea',
        )}
        rows={rows}
        placeholder={placeholder}
        value={value}
        autoFocus={autofocus}
        {...restProps}
      />
    );
  }

  render() {
    const {
      label,
      multiLine = false,
      width,
      error = false,
      errorMessage,
      ...restProps
    } = this.props;

    return (
      <div
        className={classnames(
          'text-field',
          error && 'text-field--error',
        )}
        style={{ width }}
      >
        {multiLine ? this.renderTextarea(restProps) : this.renderInput(restProps)}
        {error && errorMessage && <div className="text-field__error-message">{errorMessage}</div>}
        {label && <div className="text-field__label">{label}</div>}
      </div>
    );
  }
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
  autofocus: PropTypes.bool,
};
