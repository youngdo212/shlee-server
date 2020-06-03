import React from 'react';
import ReactDOM from 'react-dom';
import IconButton from '@material-ui/core/IconButton';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

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
        null,
        React.createElement(RemoveCircleIcon, null)
      ), container);
    });

    this.containers = containers;
  }
};