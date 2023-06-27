import { computed, defineComponent } from "vue";
import classNames from 'classnames';
import { TreeNodeProps } from "./types";
import MCheck from '../Check/index';
import TreeRender from './treeRender'

export default defineComponent({
  name: 'MTreeNode',
  props: TreeNodeProps(),
  emits: ['toggle-expand', 'select-change', 'check-change'],
  setup(props, { emit, expose }) {
    // 监听选中状态
    const halfChecked = computed(() => {
      let res = false;
      if (!props.checkStrictly && props.node?.hasChildren) {
        const { children } = props.node;
        const checkedChildren = children.filter((item) => item.checked);
        res = checkedChildren.length > 0 && checkedChildren.length < children.length;
      }
      return res;
    })

    expose({
      node: props.node,
      // halfchecked变量 只有给方法才是响应式的
      halfChecked: () => halfChecked.value,
    });


    const handleExpand = () => {
      emit('toggle-expand', props.node);
    }

    const handleCheckChange = (checked: boolean) => {
      emit('check-change', [checked, props.node]);
    }

    const handleSelect = (e: MouseEvent) => {
      e.stopPropagation()
      e.preventDefault()
      if (!props.node!.disabled) {
        emit('select-change', props.node);
      }
    }

    return () => {
      const { node, render, iconSlot, showCheckbox } = props;

      // 箭头
      const renderArrow = () => {
        return (
          <div class={['node-arrow', node?.expanded ? 'expanded' : '']}>
            {
              node!.hasChildren && (
                iconSlot ? iconSlot(node?.loading) : node?.loading ? (<i class="iconfont iconloading ico-loading"></i>) : (<i class="iconfont iconExpand"></i>)
              )
            }
          </div>
        )
      }
  
      // 内容
      const titleClasses = classNames('node-title', {
        disabled: node?.disabled,
        selected: node?.selected && !showCheckbox,
      });
  
      const sameContent = () => {
        // 自定义渲染函数
        return render ? (
          <TreeRender render={render} node={node} />
        ) : (
          <div class={titleClasses}>{node!.name}</div>
        );
      }
  
      const renderContent = () => {
        if (showCheckbox) {
          return (
            <MCheck
              class="node-content node-checkbox"
              v-model:value={node!.checked}
              disabled={node?.disabled}
              halfChecked={halfChecked.value}
              onChange={handleCheckChange}
            >
              {sameContent()}
            </MCheck>
          )
        }
        return (
          <div onClick={handleSelect} class="node-content node-title">
            {sameContent()}
          </div>
        )
      }
      return (
        <div class="m-tree-node" style={{ paddingLeft: node!.level * 18 + 'px' }} key={node!.nodeKey} onClick={handleExpand}>
          {renderArrow()}
          {renderContent()}
        </div>
      );
    };
  }
})