import type { Meta, StoryObj } from '@storybook/vue3';

import MButton from '../components/Button/index'

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
  args: { 
    label: 'Button'
  }, // default value
} satisfies Meta<typeof MButton>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/vue/api/csf
 * to learn how to use render functions.
 */
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
