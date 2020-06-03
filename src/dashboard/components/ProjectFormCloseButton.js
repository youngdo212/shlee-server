var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import React from 'react';
import ReactDOM from 'react-dom';
import Button from './Button';

var ProjectFormCloseButton = function () {
  function ProjectFormCloseButton() {
    _classCallCheck(this, ProjectFormCloseButton);

    this.container = document.querySelector('.project-form-close-button-container');
  }

  /**
   * Creates React element with handler
   * @param {string} eventName 'click'
   * @param {function} handler
   */


  _createClass(ProjectFormCloseButton, [{
    key: 'addEventListener',
    value: function addEventListener(eventName, handler) {
      if (eventName !== 'click') return;

      ReactDOM.render(React.createElement(
        Button,
        { variant: 'contained', size: 'small', onClick: handler, type: 'button' },
        '\uB2EB\uAE30'
      ), this.container);
    }
  }]);

  return ProjectFormCloseButton;
}();

export default ProjectFormCloseButton;