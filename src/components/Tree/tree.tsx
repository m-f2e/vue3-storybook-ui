import { defineComponent, ref, watch } from "vue";
import { cloneDeep } from 'lodash';
import { TreeProps, RequiredTreeNodeOptions, NodeKey, TreeNodeOptions, TreeNodeInstance } from "./types";
import TreeNode from "./treeNode";
import { updateDownWards, updateUpwards } from './util'
import './index.scss';

export default defineComponent({
  name: 'MTree',
  props: TreeProps(),
  emits: ['select-change', 'check-change'],
  setup(props, { slots, emit, expose }) {
    const flatList = ref<RequiredTreeNodeOptions[]>([])
    const loading = ref(false) // 当前节点的加载状态
    const selectKey = ref<NodeKey>('') // 当前选中的节点

    // 获取for循环下面的ref节点
    const nodeRefs = ref<TreeNodeInstance[]>([]);
    const setNodesRef = (index: number, node: TreeNodeInstance) => {
      if (node) {
        nodeRefs.value[index] = node
      }
    }

    // expose
    expose({
      getSelectedNode: (): RequiredTreeNodeOptions | undefined => {
        return flatList.value.find((item) => item.selected);
      },
      getCheckedNodes: (): RequiredTreeNodeOptions[] => {
        return flatList.value.filter((item) => item.checked);
      },
      getHalfCheckedNodes: (): RequiredTreeNodeOptions[] => {
        return nodeRefs.value
          .filter((item) => item.halfChecked())
          .map((item) => item.node);
      },
    });

    function falttenTree(source: TreeNodeOptions[]): RequiredTreeNodeOptions[] {
      const res: RequiredTreeNodeOptions[] = []
      // 递归生成树
      const recursion = (list: TreeNodeOptions[], level=0, parent: RequiredTreeNodeOptions | null=null): RequiredTreeNodeOptions[] => {
        return list.map((item) => {
          const node: RequiredTreeNodeOptions = {
            ...item,
            level,
            loading: false,
            disabled: item.disabled || false,
            expanded: item.expanded || false,
            selected: item.selected || false,
            checked: item.checked || parent?.checked || false,
            hasChildren: item.hasChildren || false,
            parentKey: parent?.nodeKey || null,
            children: item.children || []
          }
          if (node.selected) {
            selectKey.value = node.nodeKey
          }
          res.push(node)
          if (node.children.length && item.expanded) {
            // 需要展开才进行渲染，否则不渲染
            node.children = recursion(node.children, level + 1, node)
          }
          return node
        });
      };
      if (source.length) {
        recursion(source)
      }
      return res
    }

    // 收起节点
    const collapseNode = (node: RequiredTreeNodeOptions) => {
      const delKeys: NodeKey[] = []
      const recursion = (currentNode: RequiredTreeNodeOptions) => {
        if (currentNode.children.length) {
          currentNode.children.forEach((item) => {
            delKeys.push(item.nodeKey)
            if (item.expanded) {
              // 需要收起
              item.expanded = false
              // 递归处理
              recursion(item as RequiredTreeNodeOptions)
            }
          })
        }
      }
      recursion(node)
      // 从flatList中删除所有展开的子节点  
      if (delKeys.length) {
        flatList.value = flatList.value.filter((item) => {
          return !delKeys.includes(item.nodeKey)
        })
      }
    }

    // 展开节点
    const expandNode = (node: RequiredTreeNodeOptions, children?: TreeNodeOptions[]) => {
      // 深拷贝
      const trueChildren = children?.length ? children : cloneDeep(node.children)
      node.children = trueChildren.map((item: TreeNodeOptions) => {
        return {
          ...item,
          level: item.level || node.level + 1,
          loading: false,
          disabled: item.disabled || false,
          expanded: item.expanded || false,
          selected: item.selected || false,
          checked: item.checked || false,
          hasChildren: item.hasChildren || false,
          parentKey: node.nodeKey || null, // 非根节点都应有key
          children: item.children || []
        }
      })
      // 找到展开的节点下标
      const targetIndex = flatList.value.findIndex((item) => {
        return item.nodeKey === node.nodeKey
      })
      // 替换子节点, 在一维层面添加新的子节点
      if (targetIndex > -1) {
        flatList.value.splice(targetIndex+1, 0, ...(node.children as RequiredTreeNodeOptions[]))
      }   
    }

    // 处理折叠事件
    const handleToggleExpand = (node: RequiredTreeNodeOptions) => {
      if (loading.value) return;
      node.expanded = !node.expanded
      if (node.expanded) {
        // 展开此node下面的children
        if (node.children.length) {
          expandNode(node)
        } else {
          // 懒加载
          if (props.lazyLoad && node.hasChildren) {
            node.loading = true; // 控制图标
            loading.value = true; // 防止重复
            props.lazyLoad(node, (children) => {
              if (children.length) {
                expandNode(node, children)
              }
              node.loading = false
              loading.value = false
            })
          } else {
            node.expanded = !node.expanded
            // console.error('no children and no lazyLoad');
          }
        }
      } else {
        // 收起此node下面的children
        collapseNode(node)
      }
    }

    // 节点选中事件
    const handleSelectChange = (node: RequiredTreeNodeOptions) => {
      node.selected = !node.selected
      // 选中逻辑
      if (selectKey.value === node.nodeKey) {
        selectKey.value = ''
      } else {
        // 比较上一个选中的节点
        const preSelectedIndex = flatList.value.findIndex((item) => {
          return item.nodeKey === selectKey.value
        })
        if (preSelectedIndex > -1) {
          flatList.value[preSelectedIndex].selected = false
        }
        selectKey.value = node.nodeKey
      }
      // 发送选中事件
      emit('select-change', node)
    }

    const handleCheckChange = ([checked, node]: [boolean, RequiredTreeNodeOptions]) => {
      node.checked = checked
      // 非严格模式
      if (!props.checkStrictly) {
        // 向下更新父节点的checked
        updateDownWards(checked, node)
        // 向上更新父节点的checked
        updateUpwards(node, flatList.value)
      }
      // 发送选中事件
      emit('check-change', node)
    }

    watch(() => props.source, (newVal) => {
      flatList.value = falttenTree(newVal)
    }, { immediate: true })

    const renderChildren = () => {
      return flatList.value.map((node, index) => {
        return (
          <TreeNode 
            ref={setNodesRef.bind(null, index) as any}
            key={node.nodeKey} 
            node={node}
            render={props.render}
            iconSlot={slots.icon}
            showCheckbox={props.showCheckbox}
            checkStrictly={props.checkStrictly}
            onToggleExpand={handleToggleExpand}
            onSelectChange={handleSelectChange}
            onCheckChange={handleCheckChange}
          />
        )
      })
    }

    return () => {
      return (
        <div class="m-tree-wrap">
          <div class="m-tree">
            {renderChildren()}
          </div>
        </div>
      );
    };
  }
})