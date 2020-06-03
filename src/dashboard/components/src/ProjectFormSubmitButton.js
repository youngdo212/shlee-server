import React from 'react';
import ReactDOM from 'react-dom';
import Button from './Button';

const container = document.querySelector('.project-form-submit-button');

ReactDOM.render(
  <Button variant="contained" size="large" type="submit">제출</Button>,
  container,
);
