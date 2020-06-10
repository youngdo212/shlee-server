import React from 'react';
import ReactDOM from 'react-dom';
import Input from './Input';

export default class ProjectFormHeaderInput {
  constructor() {
    this.$container = document.querySelector('.project-form-header-input-container');
    this.props = {
      label: 'Header',
      variant: 'outlined',
      onInput: null,
      value: '',
      fullWidth: true,
      multiline: true,
      rows: 3,
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
}
