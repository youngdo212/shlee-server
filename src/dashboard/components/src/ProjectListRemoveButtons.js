import React from 'react';
import ReactDOM from 'react-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from './IconButton';

export default {
  /**
   * @type {HTMLElement[]} container array
   */
  containers: [],

  /** Unmount all current containers and mount new react elements again */
  update() {
    if (this.containers.length) this.containers.forEach((container) => ReactDOM.unmountComponentAtNode(container));

    const containers = [...document.querySelectorAll('.project-list-remove-button-container')];

    containers.forEach((container) => {
      ReactDOM.render(
        <IconButton>
          <DeleteIcon />
        </IconButton>,
        container,
      );
    });

    this.containers = containers;
  },
};
