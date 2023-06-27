import classNames from 'classnames';
import {
  cloneVNode,
  defineComponent,
  ref,
  watch,
} from 'vue';
import { ItemType, MenuProps } from './types';
import './index.scss';

export default defineComponent({
  name: 'MMenu',
  props: MenuProps(),
  emits: ['onSelect'],
  setup(props, { emit, slots, attrs }) {
    const currentActive = ref<string>(props.defaultIndex);

    watch(() => props.defaultIndex, (newVal) => {
      currentActive.value = newVal;
    })

    const handleClick = (index: string) => {
      if (index.indexOf('-') !== undefined) {
        const indexTmp = index.split('-')[0];
        currentActive.value = indexTmp;
      } else {
        currentActive.value = index;
      }
      emit('onSelect', index);
    };

    return () => {
      const { mode } = props;
      const renderChildren = () => {
        return slots.default!().map((item, index) => {
          if (
            (item.type as ItemType).name === 'MMenuItem' ||
            (item.type as ItemType).name === 'MSubMenu'
          ) {
            // 拷贝一个vue节点
            return cloneVNode(item, { index: index.toString(), onSelect: handleClick, activeIndex: currentActive.value, mode });
          } else {
            console.error("Menu's child must be MenuItem or MSubMenu");
          }
        });
      };

      const classes = classNames('m-menu', {
        [`menu-${mode}`]: mode
      });

      return (
        <ul {...attrs} class={classes}>
          {renderChildren()}
        </ul>
      );
    };
  },
});
