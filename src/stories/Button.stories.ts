import type { Meta, StoryObj } from '@storybook/vue3';

// import Button from './Button.vue';
import MButton from '../../src/components/Button/index'

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta = {
  title: 'Example/Button',
  component: MButton,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['small', 'large'] },
    backgroundColor: { control: 'color' },
    // onClick: { action: 'clicked' },
  },
  args: {  }, // default value
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
    label: 'Button',
  },
};

export const Link: Story = {
  args: {
    type: 'link',
    label: 'Button',
    href: 'https://www.baidu.com'
  },
};

export const Large: Story = {
  args: {
    // label: 'Button',
    // size: 'large',
  },
};

export const Small: Story = {
  args: {
    // label: 'Button',
    // size: 'small',
  },
};
