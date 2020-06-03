import React from 'react';
import ReactDOM from 'react-dom';
import Button from './Button';

var container = document.querySelector('.project-form-submit-button');

ReactDOM.render(React.createElement(
  Button,
  { variant: 'contained', size: 'large', type: 'submit' },
  '\uC81C\uCD9C'
), container);