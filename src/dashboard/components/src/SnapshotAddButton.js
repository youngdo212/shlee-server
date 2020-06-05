import React from 'react';
import ReactDOM from 'react-dom';
import Button from './Button';

export default class ProjectFormCloseButton {
  constructor() {
    this.container = document.querySelector('.snapshot-add-button-container');
  }

  /**
   * Creates React element with handler
   * @param {string} eventName 'click'
   * @param {function} handler
   */
  addEventListener(eventName, handler) {
    if (eventName !== 'click') return;

    ReactDOM.render(
      <Button variant="filled" size="small" onClick={handler} type="button">업로드</Button>,
      this.container,
    );
  }
}
