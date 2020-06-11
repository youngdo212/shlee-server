import React from 'react';
import ReactDOM from 'react-dom';
import TextField from './TextField';

export default class ProjectFormHeaderInput {
  constructor() {
    this.$container = document.querySelector('.project-form-header-input-container');
    this.props = {
      label: 'Header',
      onChange: null,
      value: '',
      multiLine: true,
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
}
