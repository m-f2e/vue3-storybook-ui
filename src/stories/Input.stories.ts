import type { Meta, StoryObj } from '@storybook/vue3';

import MInput from '../components/Input/index'

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta = {
  title: 'Example/MInput',
  component: MInput,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    size: { control: 'select', options: ['small', 'large'] },
    modelValue: { control: 'text' },
    prepend: { control: 'text' },
    append: { control: 'text' },
  },
  args: { 
    modelValue: 'placeholder',
    disabled: false,
  }, // default value
} satisfies Meta<typeof MInput>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/vue/api/csf
 * to learn how to use render functions.
 */
export const Input: Story = {
  args: {
    // modelValue: 'placeholder',
    // disabled: false,
  },
  render: (args: any) => ({
    components: { MInput },
    setup() {
      return { args };
    },
    template: `<m-input v-model="args.modelValue" :disabled="args.disabled" :size="args.size" :prepend="args.prepend" :append="args.append" />`,
  })
};

export const InputStyle: Story = {
  args: {
  },
  render: (args: any) => ({
    components: { MInput },
    setup() {
      return { args };
    },
    template: `<m-input style="width: 200px" v-model="args.modelValue" :disabled="args.disabled" :size="args.size" :prepend="args.prepend" :append="args.append" />`,
  })
};