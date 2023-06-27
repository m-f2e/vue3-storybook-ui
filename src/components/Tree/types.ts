import { PropType, Slot } from "vue"
import { CustomEventFuncType } from "../utils/types"

// Node key
export type NodeKey = string | number

// 用户传入的source必须有nodekey和name
export interface TreeNodeOptions {
  nodeKey: NodeKey
  name: string
  level?: number // 层级，控制缩进
  loading?: boolean // 懒加载使用
  disabled?: boolean // 禁用
  expanded?: boolean // 是否展开
  selected?: boolean // 是否被选中
  checked?: boolean // 是否被勾选
  hasChildren?: boolean // 是否有子节点
  children?: TreeNodeOptions[] // 子节点
  parentKey?: NodeKey | null // 父节点key
}

// 必填项
export type RequiredTreeNodeOptions = Required<TreeNodeOptions>

export type renderFunc<T> = PropType<(node: T) => JSX.Element>

// tree node 节点实例类型
export interface TreeNodeInstance {
  node: RequiredTreeNodeOptions;
  halfChecked: () => boolean;
}

export interface TreeInstance {
  getSelectedNode: () => RequiredTreeNodeOptions | undefined;
  getCheckedNodes: () => RequiredTreeNodeOptions[] | undefined;
  getHalfCheckedNodes: () => RequiredTreeNodeOptions[] | undefined;
}

const TreeProps = () => ({
  source: {
    type: Array as PropType<TreeNodeOptions[]>,
    default: () => []
  },
  showCheckbox: {
    type: Boolean,
    default: false
  },
  checkStrictly: {
    type: Boolean,
    default: false
  },
  render: Function as renderFunc<RequiredTreeNodeOptions>,
  lazyLoad: Function as PropType<(node: RequiredTreeNodeOptions, callback:(children: TreeNodeOptions[]) => void) => void>
})

const TreeNodeProps = () => ({
  node: {
    type: Object as PropType<RequiredTreeNodeOptions>,
    required: true
  },
  showCheckbox: {
    type: Boolean,
    default: false
  },
  checkStrictly: {
    type: Boolean,
    default: false
  },
  onCheckChange: Function as CustomEventFuncType<[boolean, RequiredTreeNodeOptions]>,
  iconSlot: Function as PropType<Slot>,
  render: Function as renderFunc<RequiredTreeNodeOptions>,
  onSelectChange: Function as CustomEventFuncType<RequiredTreeNodeOptions>,
  onToggleExpand: Function as CustomEventFuncType<RequiredTreeNodeOptions>
})

const renderNodeProps = () => ({
  node: {
    type: Object as PropType<RequiredTreeNodeOptions>,
    required: true
  },
  render: {
    type: Function as renderFunc<RequiredTreeNodeOptions>,
    required: true
  }
})

export { TreeProps, TreeNodeProps, renderNodeProps }