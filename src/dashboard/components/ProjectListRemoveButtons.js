function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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
  update: function update() {
    if (this.containers.length) this.containers.forEach(function (container) {
      return ReactDOM.unmountComponentAtNode(container);
    });

    var containers = [].concat(_toConsumableArray(document.querySelectorAll('.project-list-remove-button-container')));

    containers.forEach(function (container) {
      ReactDOM.render(React.createElement(
        IconButton,
        null,
        React.createElement(DeleteIcon, null)
      ), container);
    });

    this.containers = containers;
  }
};