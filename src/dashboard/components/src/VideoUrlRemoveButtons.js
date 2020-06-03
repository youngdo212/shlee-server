import React from 'react';
import ReactDOM from 'react-dom';
import IconButton from '@material-ui/core/IconButton';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

export default {
  /** @type {HTMLElement[]} */
  containers: [],

  update() {
    if (this.containers.length) this.containers.forEach((container) => ReactDOM.unmountComponentAtNode(container));

    const containers = document.querySelectorAll('.video-url-remove-button-container');

    containers.forEach((container) => {
      ReactDOM.render(
        <IconButton>
          <RemoveCircleIcon />
        </IconButton>,
        container,
      );
    });

    this.containers = containers;
  },
};
