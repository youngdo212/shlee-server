import React from 'react';
import ReactDOM from 'react-dom';
import RemoveCircleIcon from '../icons/removeCircle.svg';
import IconButton from './IconButton';

export default {
  /** @type {HTMLElement[]} */
  containers: [],

  update() {
    if (this.containers.length) this.containers.forEach((container) => ReactDOM.unmountComponentAtNode(container));

    const containers = document.querySelectorAll('.video-url-remove-button-container');

    containers.forEach((container) => {
      ReactDOM.render(
        <IconButton tooltip="URL 삭제" type="button">
          <RemoveCircleIcon />
        </IconButton>,
        container,
      );
    });

    this.containers = containers;
  },
};
