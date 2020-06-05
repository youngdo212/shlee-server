import React from 'react';
import ReactDOM from 'react-dom';
import DeleteIcon from '../icons/delete.svg';
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
        <IconButton tooltip="프로젝트 삭제">
          <DeleteIcon />
        </IconButton>,
        container,
      );
    });

    this.containers = containers;
  },
};
