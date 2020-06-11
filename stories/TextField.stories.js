import React from 'react';
import { action } from '@storybook/addon-actions';

import TextField from '../src/dashboard/components/TextField';

const actionData = {
  onChange: action('change event!'),
};

export default {
  component: TextField,
  title: 'TextField',
  decorators: [(story) => <div style={{ width: 600, height: 300 }}>{story()}</div>],
};

export const Default = () => <TextField {...actionData} />;

export const Label = () => <TextField label="Label" {...actionData} />;

export const MultiLine = () => <TextField label="Multi Line" multiLine={true} rows={3} {...actionData} />;

export const Width = () => <TextField label="Width: 200px" width={200} {...actionData} />;

export const Placeholder = () => <TextField placeholder="Placeholder" {...actionData} />;

export const Value = () => <TextField value="Value(cannot change)" {...actionData} />;

export const Error = () => <TextField error={true} label="Error" {...actionData} />;

export const ErrorWithMessage = () => <TextField error={true} errorMessage="Error Message" label="Error" {...actionData} />;

export const Number = () => <TextField type="number" label="Number" {...actionData} />;

export const Autofocus = () => <TextField label="Autofocus" autofocus={true} />;
