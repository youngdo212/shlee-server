import React from 'react';
import ReactDOM from 'react-dom';
import AddCircleIcon from '../icons/addCircle.svg';
import IconButton from './IconButton';

export default class VideoUrlAddButton {
  /** Creates instance with container property */
  constructor() {
    this.container = document.querySelector('.video-url-add-button-container');
  }

  /**
   * Creates react element and put into handler
   * @param {string} eventName 'click'
   * @param {function} handler
   */
  addEventListener(eventName, handler) {
    if (eventName !== 'click') return;

    ReactDOM.render(
      <IconButton onClick={handler} tooltip="URL 추가" type="button">
        <AddCircleIcon />
      </IconButton>,
      this.container,
    );
  }
}
