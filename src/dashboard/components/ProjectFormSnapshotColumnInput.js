import React from 'react';
import ReactDOM from 'react-dom';
import Input from './Input';

export default class ProjectFormSnapshotColumnInput {
  constructor() {
    this.$container = document.querySelector('.project-form-snapshot-column-input-container');
    this.props = {
      label: 'Snapshot Column',
      variant: 'outlined',
      onInput: null,
      fullWidth: true,
      type: 'number',
      error: false,
      helperText: '',
      value: 1,
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
   * @param {boolean} [error=false]
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
