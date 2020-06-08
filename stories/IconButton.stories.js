import React from 'react';
import { action } from '@storybook/addon-actions';

import IconButton from '../src/dashboard/components/IconButton';
import DeleteIcon from '../src/dashboard/icons/delete.svg';
import AddCircleIcon from '../src/dashboard/icons/addCircle.svg';

const actionData = {
  onClick: action('clicked!'),
};

export default {
  component: IconButton,
  title: 'IconButton',
  decorators: [(story) => <div style={{ padding: '100px' }}>{story()}</div>],
};

export const Default = () => <IconButton {...actionData}><DeleteIcon /></IconButton>;

export const Tooltip = () => <IconButton tooltip="This is tooltip" {...actionData}><AddCircleIcon /></IconButton>;
