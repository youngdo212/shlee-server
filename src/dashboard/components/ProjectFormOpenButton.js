var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import React from 'react';
import ReactDOM from 'react-dom';
import Button from './Button';

var ProjectFormOpenButton = function () {
  function ProjectFormOpenButton() {
    _classCallCheck(this, ProjectFormOpenButton);

    this.container = document.querySelector('.project-form-open-button-container');
  }

  /**
   * Creates React element with click handler
   * @param {string} eventName 'click'
   * @param {function} handler
   */


  _createClass(ProjectFormOpenButton, [{
    key: 'addEventListener',
    value: function addEventListener(eventName, handler) {
      if (eventName !== 'click') return;

      ReactDOM.render(React.createElement(
        Button,
        { variant: 'contained', size: 'large', onClick: handler },
        '\uD504\uB85C\uC81D\uD2B8 \uC0DD\uC131'
      ), this.container);
    }
  }]);

  return ProjectFormOpenButton;
}();

export default ProjectFormOpenButton;