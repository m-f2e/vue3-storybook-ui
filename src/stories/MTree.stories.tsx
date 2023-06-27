import type { Meta, StoryObj } from '@storybook/vue3';

import MTree from '../components/Tree/index'
import { TreeNodeOptions } from '../components/Tree/types'

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta = {
  title: 'Example/MTree',
  component: MTree,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    source: { control: { type: 'object' } },
    showCheckbox: {
      control: { type: 'boolean' },
      default: false
    },
    checkStrictly: {
      control: { type: 'boolean' },
      default: false
    },
    lazyLoad: { control: { type: 'object', } },
    render: { control: { type: 'object' } },
  },
  args: { 
  }, // default value
} satisfies Meta<typeof MTree>;

export default meta;

type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/vue/api/csf
 * to learn how to use render functions.
 */
 function recursionPrimary(path = '0', level = 3): TreeNodeOptions[] {
  const list = [];
  for (let i = 0; i < 10; i += 1) {
    const nodeKey = `${path}-${i}`;
    const treeNode: TreeNodeOptions = {
      nodeKey,
      name: nodeKey,
      children: [],
      hasChildren: true,
    };
    if (level > 0) {
      treeNode.children = recursionPrimary(nodeKey, level - 1);
    } else {
      treeNode.hasChildren = false;
    }
    list.push(treeNode);
  }
  return list;
}

const lazyLoad = (
  node: TreeNodeOptions,
  callback: (children: TreeNodeOptions[]) => void,
) => {
  const result: TreeNodeOptions[] = [];
  for (let i = 0; i < 4; i += 1) {
    const nodeKey = `${node.nodeKey}-${i}`;
    const treeNode: TreeNodeOptions = {
      nodeKey,
      name: nodeKey,
      children: [],
      hasChildren: true,
      disabled: i % 2 == 0,
    };
    result.push(treeNode);
  }
  setTimeout(() => {
    callback(result);
  }, 500);
};

function recursionLazy(path = '0'): TreeNodeOptions[] {
  const list = [];
  for (let i = 0; i < 2; i += 1) {
    const nodeKey = `${path}-${i}`;
    const treeNode: TreeNodeOptions = {
      nodeKey,
      name: nodeKey,
      children: [],
      selected: nodeKey === '0-0',
      hasChildren: true,
    };
    list.push(treeNode);
  }
  return list;
}

function renderNode(node: TreeNodeOptions) {
  return (
    <div style="padding: 0 4px;">
      <b style="color: #f60;">{node.name}</b>
    </div>
  );
};

export const TreeDefault: Story = {
  args: {
    source: recursionPrimary(),
    showCheckbox: false
  },
  render: (args: any) => ({
    components: { MTree },
    setup() {
      return { args };
    },
    template: `<m-tree :source="args.source" :show-checkbox="args.showCheckbox">`,
  }),
};


export const TreeLazy: Story = {
  args: {
    source: recursionLazy(),
    lazyLoad: lazyLoad,
  },
  render: (args: any) => ({
    components: { MTree },
    setup() {
      return { args };
    },
    template: `<m-tree :source="args.source" :lazy-load="args.lazyLoad" />`,
  }),
};

export const TreeRender: Story = {
  args: {
    source: recursionPrimary(),
    render: renderNode,
  },
  render: (args: any) => ({
    components: { MTree },
    setup() {
      return { args };
    },
    template: `<m-tree :source="args.source" :render="args.render" />`,
  }),
};

