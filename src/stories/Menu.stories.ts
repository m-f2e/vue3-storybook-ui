import type { Meta, StoryObj } from '@storybook/vue3';

import MMenu from '../../src/components/Menu/index'
import MMenuItem from '../../src/components/Menu/menuItem'
import MSubMenu from '../../src/components/Menu/subMenu'

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta = {
  title: 'Example/MMenu',
  component: MMenu,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    defaultIndex: { control: 'text' },
    onSelect: { action: 'onSelect' },
  },
  args: { 
  }, // default value
} satisfies Meta<typeof MMenu>;

export default meta;

type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/vue/api/csf
 * to learn how to use render functions.
 */
export const Direction: Story = {
  args: {
    defaultIndex: '0',
  },
  render: (args: any) => ({
    components: { MMenu, MMenuItem, MSubMenu },
    setup() {
      return { args };
    },
    template: `<m-menu
      :defaultIndex="args.defaultIndex"
      :mode="args.mode"
      @onSelect="handleClick"
      >
      <m-menu-item>link1</m-menu-item>
      <m-menu-item disabled>link2</m-menu-item>
      <m-menu-item>link3</m-menu-item>
    </m-menu>`,
  }),
};


export const SubMenu: Story = {
  args: {
    mode: 'horizontal',
    defaultIndex: '0',
  },
  render: (args: any) => ({
    components: { MMenu, MMenuItem, MSubMenu },
    setup() {
      return { args };
    },
    template: `<m-menu 
      :defaultIndex="args.defaultIndex" 
      :mode="args.mode"
      @onSelect="handleClick">
      <m-menu-item>link1</m-menu-item>
      <m-menu-item disabled>link2</m-menu-item>
      <m-sub-menu title="下拉">
        <m-menu-item disabled>2323</m-menu-item>
        <m-menu-item>过去</m-menu-item>
        <m-menu-item>现在</m-menu-item>
      </m-sub-menu>
      <m-menu-item>link3</m-menu-item>
    </m-menu>`,
  }),
};

export const VerticalSubMenu: Story = {
  args: {
    mode: 'vertical',
    defaultIndex: '0',
  },
  render: (args: any) => ({
    components: { MMenu, MMenuItem, MSubMenu },
    setup() {
      return { args };
    },
    template: `<m-menu 
      :defaultIndex="args.defaultIndex" 
      :mode="args.mode"
      @onSelect="handleClick">
      <m-menu-item>link1</m-menu-item>
      <m-menu-item disabled>link2</m-menu-item>
      <m-sub-menu title="下拉">
        <m-menu-item disabled>2323</m-menu-item>
        <m-menu-item>过去</m-menu-item>
        <m-menu-item>现在</m-menu-item>
      </m-sub-menu>
      <m-menu-item>link3</m-menu-item>
    </m-menu>`,
  }),
};