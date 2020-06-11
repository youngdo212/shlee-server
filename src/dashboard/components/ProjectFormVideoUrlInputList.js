import React from 'react';
import ReactDOM from 'react-dom';
import TextField from './TextField';
import IconButton from './IconButton';
import RemoveCircleIcon from '../icons/removeCircle.svg';

export default class ProjectFormVideoUrlInputList {
  constructor() {
    this.$container = document.querySelector('.project-form-video-url-input-list-container');
    this.props = {
      label: 'Video Url',
      width: 300,
    };
    this.handleInput = null;
    this.handleClick = null;
  }

  /**
   * Adds handler to props property
   * @param {string} eventName 'input' | 'click'
   * @param {function} handler
   */
  addEventListener(eventName, handler) {
    if (eventName === 'input') {
      this.handleInput = (index) => (e) => {
        handler(e.target.value, index);
      };
    } else if (eventName === 'click') {
      this.handleClick = (index) => () => {
        handler(index);
      };
    }
  }

  /**
   * Render react element using video urls
   * @param {string[]} videoUrls
   */
  render(videoUrls) {
    const videoUrlInputs = videoUrls.map((videoUrl, index) => this.renderInput(videoUrl, index));

    ReactDOM.render(
      <div>
        {videoUrlInputs}
      </div>,
      this.$container,
    );
  }

  /**
   * Renders react element with video url and index
   * @param {string} value video url
   * @param {number} index each index for video url
   */
  renderInput(value, index) {
    const props = {
      ...this.props, value, onChange: this.handleInput(index),
    };

    return (
      <div key={index}>
        <TextField {...props} />
        <IconButton onClick={this.handleClick(index)} type="button"><RemoveCircleIcon /></IconButton>
      </div>
    );
  }
}
