import React from 'react';
import ReactDOM from 'react-dom';
import TextField from './TextField';

export default class ProjectFormTitleInput {
  constructor() {
    this.$container = document.querySelector('.project-form-title-input-container');
    this.props = {
      label: 'Title',
      onChange: null,
      value: '',
      error: false,
      errorMessage: '',
    };
  }

  /**
   * Mounts a component with event listener
   * @param {string} eventName 'input'
   * @param {function} handler
   */
  addEventListener(eventName, handler) {
    if (eventName !== 'input') return;

    this.props.onChange = (e) => handler(e);

    ReactDOM.render(
      <TextField {...this.props} />,
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
      <TextField {...this.props} />,
      this.$container,
    );
  }

  /**
   * Rerender the component with error and error message
   * @param {boolean} [error=true]
   * @param {string} [errorMessage='']
   */
  setError(error = false, errorMessage = '') {
    this.props = { ...this.props, error, errorMessage };

    ReactDOM.render(
      <TextField {...this.props} />,
      this.$container,
    );
  }
}
