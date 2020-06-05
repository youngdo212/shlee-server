import './IconButton.scss';
import React from 'react';
import PropTypes from 'prop-types';
import ButtonBase from '../ButtonBase';
import Tooltip from '../Tooltip';

export default function IconButton(props) {
  const { children, tooltip, ...restProps } = props;
  const iconButton = <ButtonBase className="icon-button" {...restProps}>{children}</ButtonBase>;

  if (!tooltip) return iconButton;

  return <Tooltip title={tooltip}>{iconButton}</Tooltip>;
}

IconButton.propTypes = {
  children: PropTypes.element.isRequired,
  tooltip: PropTypes.string,
};
