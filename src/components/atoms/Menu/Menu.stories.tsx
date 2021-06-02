import { Story } from '@storybook/react';
import Button from '../Button/Button';
import Menu, { MenuProps } from './Menu';

export default {
  title: 'atoms/Menu',
  component: Menu,
  argTypes: {},
};

const Template: Story<MenuProps> = args => <Menu {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  children: (
    <div>
      {['역 관리', '노선 관리', '구간 관리', '경로 조회'].map(text => (
        <Button
          key={text}
          buttonTheme="menu"
          onClick={e => {
            e;
          }}
        >
          {text}
        </Button>
      ))}
    </div>
  ),
};
