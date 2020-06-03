import React from 'react';
import ReactDOM from 'react-dom';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';

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
      <IconButton onClick={handler}>
        <AddCircleIcon />
      </IconButton>,
      this.container,
    );
  }
}
