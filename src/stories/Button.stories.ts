import type { Meta, StoryObj } from '@storybook/vue3';

import MButton from '../components/Button/index'

// 类型配置
const meta = {
  title: 'Example/MButton',
  component: MButton,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['default', 'primary', 'danger'], defaultValue: 'default' },
    size: { control: 'select', options: ['small', 'large'], defaultValue: 'small' },
    backgroundColor: { control: 'color' },
    label: { control: 'text' },
  },
  args: { // default value
    label: 'Button'
  }, 
} satisfies Meta<typeof MButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// 示例
export const Primary: Story = {
  args: {
    type: 'primary',
  },
};

export const Link: Story = {
  args: {
    type: 'link',
    href: 'https://www.baidu.com'
  },
};

export const Danger: Story = {
  args: {
    type: 'danger',
  },
};
