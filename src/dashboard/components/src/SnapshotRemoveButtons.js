import React from 'react';
import ReactDOM from 'react-dom';
import Button from './Button';

export default {
  /** Creates react element */
  update() {
    const containers = document.querySelectorAll('.snapshot-remove-button-container');

    containers.forEach((container) => {
      if (container.dataset.mounted === 'true') return;

      ReactDOM.render(
        <Button variant="contained" color="secondary" size="small">삭제</Button>,
        container,
      );

      container.dataset.mounted = true;
    });
  },

  /**
   * Unmount react element
   * @param {HTMLElement} container
   */
  remove(container) {
    const result = ReactDOM.unmountComponentAtNode(container);
  },
};
