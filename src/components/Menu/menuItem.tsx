import classNames from 'classnames';
import { defineComponent } from 'vue';
import { MenuItemProps } from './types';

const MenuItem = defineComponent({
  name: 'MMenuItem',
  props: MenuItemProps(),
  setup(props, { slots, attrs }) {
    return () => {
      const { index, disabled, activeIndex, onSelect } = props;
      
      // item click
      const handleClick = () => {
        if (onSelect && !disabled) {
          onSelect(index!)
        }
      };

      const classes = classNames('menu-item', {
        'is-disabled': disabled,
        'is-active': activeIndex === index,
      });
      return (
        <li {...attrs} class={classes} onClick={handleClick}>
          {slots.default!()}
        </li>
      );
    };
  },
});

MenuItem.playName = 'MenuItem';

export default MenuItem;
