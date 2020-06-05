import React from 'react';
import ReactDOM from 'react-dom';
import Button from './Button';

export default class ProjectFormOpenButton {
  constructor() {
    this.container = document.querySelector('.project-form-open-button-container');
  }

  /**
   * Creates React element with click handler
   * @param {string} eventName 'click'
   * @param {function} handler
   */
  addEventListener(eventName, handler) {
    if (eventName !== 'click') return;

    ReactDOM.render(
      <Button variant="outlined" size="large" onClick={handler}>프로젝트 생성</Button>,
      this.container,
    );
  }
}
