import React from 'react';
import ReactDOM from 'react-dom';
import Button from './Button';

export default {
  /** Creates react element */
  update: function update() {
    var containers = document.querySelectorAll('.snapshot-remove-button-container');

    containers.forEach(function (container) {
      if (container.dataset.mounted === 'true') return;

      ReactDOM.render(React.createElement(
        Button,
        { variant: 'contained', color: 'secondary', size: 'small' },
        '\uC0AD\uC81C'
      ), container);

      container.dataset.mounted = true;
    });
  },


  /**
   * Unmount react element
   * @param {HTMLElement} container
   */
  remove: function remove(container) {
    var result = ReactDOM.unmountComponentAtNode(container);
  }
};