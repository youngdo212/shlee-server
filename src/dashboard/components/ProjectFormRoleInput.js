import React from 'react';
import ReactDOM from 'react-dom';
import TextField from './TextField';

export default class ProjectFormRoleInput {
  constructor() {
    this.$container = document.querySelector('.project-form-role-input-container');
    this.props = {
      label: 'Role',
      value: '',
      onChange: null,
    };
  }

  /** Mounts react compoenent with props */
  render() {
    ReactDOM.render(
      <TextField {...this.props} />,
      this.$container,
    );
  }

  /**
   * Mounts react component with event handler
   * @param {string} eventName 'input'
   * @param {function} handler
   */
  addEventListener(eventName, handler) {
    if (eventName !== 'input') return;

    this.props.onChange = (e) => handler(e);

    this.render();
  }

  /**
   * Updates react component with value
   * @param {string} value
   */
  setValue(value) {
    this.props = { ...this.props, value };

    this.render();
  }
}
