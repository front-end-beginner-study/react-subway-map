import { Story, Meta } from '@storybook/react';

import SnackBar, { SnackBarProps } from './SnackBar';

export default {
  title: 'SnackBar',
  component: SnackBar,
} as Meta;

const Template: Story<SnackBarProps> = (args) => <SnackBar {...args} />;

export const Order1 = Template.bind({});
export const Order2 = Template.bind({});

Order1.args = {
  children: '스낵바입니다.',
  order: 1,
};

Order2.args = {
  children: '스낵바입니다.',
  order: 2,
};
