var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import React from 'react';
import ReactDOM from 'react-dom';
import AddCircleIcon from '../icons/addCircle.svg';
import IconButton from './IconButton';

var VideoUrlAddButton = function () {
  /** Creates instance with container property */
  function VideoUrlAddButton() {
    _classCallCheck(this, VideoUrlAddButton);

    this.container = document.querySelector('.video-url-add-button-container');
  }

  /**
   * Creates react element and put into handler
   * @param {string} eventName 'click'
   * @param {function} handler
   */


  _createClass(VideoUrlAddButton, [{
    key: 'addEventListener',
    value: function addEventListener(eventName, handler) {
      if (eventName !== 'click') return;

      ReactDOM.render(React.createElement(
        IconButton,
        { onClick: handler, tooltip: 'URL \uCD94\uAC00', type: 'button' },
        React.createElement(AddCircleIcon, null)
      ), this.container);
    }
  }]);

  return VideoUrlAddButton;
}();

export default VideoUrlAddButton;