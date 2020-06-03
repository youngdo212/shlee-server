import React from 'react';
import ReactDOM from 'react-dom';
import Button from './Button';

export default class ProjectFormCloseButton {
  constructor() {
    this.container = document.querySelector('.project-form-close-button-container');
  }

  /**
   * Creates React element with handler
   * @param {string} eventName 'click'
   * @param {function} handler
   */
  addEventListener(eventName, handler) {
    if (eventName !== 'click') return;

    ReactDOM.render(
      <Button variant="contained" size="small" onClick={handler} type="button">닫기</Button>,
      this.container,
    );
  }
}
