import React from 'react';
import { action } from '@storybook/addon-actions';

import Button from '../src/dashboard/components/Button';

const actionData = {
  onClick: action('clicked!'),
};

export default {
  component: Button,
  title: 'Button',
};

export const Default = () => <Button {...actionData}>Default Button</Button>;

export const SmallText = () => <Button size="small" variant="text" {...actionData}>Small Text Button</Button>;

export const SmallOutlined = () => <Button size="small" variant="outlined" {...actionData}>Small Outlined Button</Button>;

export const SmallFilled = () => <Button size="small" variant="filled" {...actionData}>Small Filled Button</Button>;

export const MediumText = () => <Button size="medium" variant="text" {...actionData}>Medium Text Button</Button>;

export const MediumOutlined = () => <Button size="medium" variant="outlined" {...actionData}>Medium Outlined Button</Button>;

export const MediumFilled = () => <Button size="medium" variant="filled" {...actionData}>Medium Filled Button</Button>;

export const LargeText = () => <Button size="large" variant="text" {...actionData}>Large Text Button</Button>;

export const LargeOutlined = () => <Button size="large" variant="outlined" {...actionData}>Large Outlined Button</Button>;

export const LargeFilled = () => <Button size="large" variant="filled" {...actionData}>Large Filled Button</Button>;
