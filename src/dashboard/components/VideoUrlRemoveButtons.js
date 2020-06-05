import React from 'react';
import ReactDOM from 'react-dom';
import RemoveCircleIcon from '../icons/removeCircle.svg';
import IconButton from './IconButton';

export default {
  /** @type {HTMLElement[]} */
  containers: [],

  update: function update() {
    if (this.containers.length) this.containers.forEach(function (container) {
      return ReactDOM.unmountComponentAtNode(container);
    });

    var containers = document.querySelectorAll('.video-url-remove-button-container');

    containers.forEach(function (container) {
      ReactDOM.render(React.createElement(
        IconButton,
        { type: 'button' },
        React.createElement(RemoveCircleIcon, null)
      ), container);
    });

    this.containers = containers;
  }
};