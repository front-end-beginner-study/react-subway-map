import React from 'react';
import Snackbar from './Snackbar';

export default {
  title: 'Common/Snackbar',
  component: Snackbar,
  argTypes: {},
};

const Template = (args) => <Snackbar {...args} />;

export const Default = Template.bind({});
Default.args = {
  text: '지하철역이 추가되었습니다.',
};
