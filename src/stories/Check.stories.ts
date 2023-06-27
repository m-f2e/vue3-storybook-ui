import type { Meta, StoryObj } from '@storybook/vue3';

import MCheck from '../components/Check/index'

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta = {
  title: 'Example/MCheck',
  component: MCheck,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'boolean' },
    disabled: { control: 'boolean' },
    halfChecked: { control: 'boolean' },
  },
  args: { 
    value: false,
    disabled: false,
    halfChecked: false,
  }, // default value
} satisfies Meta<typeof MCheck>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/vue/api/csf
 * to learn how to use render functions.
 */
export const Value: Story = {
  args: {
  },
  render: (args: any) => ({
    components: { MCheck },
    setup() {
      return { args };
    },
    template: `<m-check v-model:value="args.value" :disabled="args.disabled" :halfChecked="args.halfChecked">选中</m-check>`,
  })
};

export const ContentChecked: Story = {
  args: {
  },
  render: (args: any) => ({
    components: { MCheck },
    setup() {
      return { args };
    },
    template: `<m-check v-model:value="args.value" :disabled="args.disabled" :halfChecked="args.halfChecked">选中</m-check>`,
  })
};