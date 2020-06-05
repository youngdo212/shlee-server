import './Tooltip.scss';
import React from 'react';
import PropTypes from 'prop-types';

export default function Tooltip(props) {
  var children = props.children,
      title = props.title;


  return React.createElement(
    'div',
    { className: 'tooltip-container' },
    children,
    React.createElement(
      'div',
      { className: 'tooltip' },
      title
    )
  );
}

Tooltip.propTypes = {
  children: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired
};