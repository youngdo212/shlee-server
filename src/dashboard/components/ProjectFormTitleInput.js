import React from 'react';
import ReactDOM from 'react-dom';
import Input from './Input';

export default class ProjectFormTitleInput {
  constructor() {
    this.$container = document.querySelector('.project-form-title-input-container');
    this.props = {
      label: 'Title',
      variant: 'outlined',
      onInput: null,
      value: '',
      fullWidth: true,
      error: false,
      helperText: '',
    };
  }

  /**
   * Mounts a component with event listener
   * @param {string} eventName 'input'
   * @param {function} handler
   */
  addEventListener(eventName, handler) {
    if (eventName !== 'input') return;

    this.props.onInput = (e) => handler(e);

    ReactDOM.render(
      <Input {...this.props} />,
      this.$container,
    );
  }

  /**
   * Rerender the component with new value
   * @param {string} value
   */
  setValue(value) {
    this.props = { ...this.props, value };

    ReactDOM.render(
      <Input {...this.props} />,
      this.$container,
    );
  }

  /**
   * Rerender the component with error and error message
   * @param {boolean} [error=true]
   * @param {string} [helperText='']
   */
  setError(error = false, helperText = '') {
    this.props = { ...this.props, error, helperText };

    ReactDOM.render(
      <Input {...this.props} />,
      this.$container,
    );
  }
}
