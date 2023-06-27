import { PropType } from 'vue';


const MenuKey = 'menuKey'

type SelectFunc = (selectedIndex: string) => void
type MenuMode = 'horizontal' | 'vertical'

const MenuProps = () => ({
  defaultIndex: {
    type: String,
    default: '0'
  },
  mode: {
    type: String as PropType<MenuMode>,
    default: 'horizontal'
  },
  onSelect: Function as PropType<SelectFunc>
})

const MenuItemProps = () => ({
  index: {
    type: String,
    required: true
  },
  disabled: {
    type: Boolean,
    default: false
  },
  activeIndex: String,
  onSelect: Function as PropType<SelectFunc>
})

const SubMenuProps = () => ({
  index: String,
  title: String,
  mode: {
    type: String as PropType<MenuMode>,
    default: 'horizontal'
  },
  activeIndex: String,
  onSelect: Function as PropType<SelectFunc>
})

export interface ItemType {
  [key: string]: any;
}


export interface MenuContext {
  index: string;
  onSelect?: SelectFunc;
  mode?: MenuMode
}




export { SubMenuProps, MenuKey, MenuProps, MenuItemProps }