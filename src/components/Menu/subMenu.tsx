import classNames from 'classnames'
import {
	cloneVNode,
	defineComponent,
	reactive,
	ref,
  watch,
} from 'vue'
import { ItemType, SubMenuProps } from './types'

export default defineComponent({
	name: 'MSubMenu',
	props: SubMenuProps(),
	setup(props, { attrs, slots }) {
		const menuOpen = ref(false)
		const subClass = reactive({
			'm-submenu': true,
			'menu-opened': props.mode === 'vertical' ? !menuOpen.value : menuOpen.value,
		})
    const currentActive = ref<string>()

    watch(() => props.activeIndex, () => {
      // 菜单被选中，取消子菜单的选中
      if (props.activeIndex !== props.index) {
        currentActive.value = ""
      }
    })

    // 点击事件
		const handleClick = (e: MouseEvent) => {
			e.preventDefault()
			// subClass['menu-opened'] = !subClass['menu-opened']
      if (props.onSelect) {
        props.onSelect(props.index!)
      }
		}

		let timer: any
		const handleMouse = (e: MouseEvent, toggle: boolean) => {
			clearTimeout(timer)
			e.preventDefault()
			timer = setTimeout(() => {
				subClass['menu-opened'] = toggle
			}, 100)
		}
    // 标题点击
		const clickEvents = props.mode === 'vertical' ? {
      onClick: handleClick,
    } : {}

    // 鼠标移入、移出
		const hoverEvents = props.mode !== 'vertical' ? {
      onMouseenter: (e: MouseEvent) => {
        handleMouse(e, true)
      },
      onMouseleave: (e: MouseEvent) => {
        handleMouse(e, false)
      },
    } : {}

    const menuHandleClick = (index: string) => {
      currentActive.value = index
      if (props.onSelect) {
        props.onSelect(index)
      }
    };

    // 下拉项
    const renderChildren = () => {
      const items = slots.default!().map((item, index) => {
        if ((item.type as ItemType).name === 'MMenuItem') {
          return cloneVNode(item, {
            index: `${props.index}-${index.toString()}`,
            activeIndex: currentActive.value,
            onSelect: menuHandleClick
          })
        } else {
          console.error("MSubMenu's child must be a MMenuItem")
        }
      })
      return <ul class={subClass}>{items}</ul>
    }

		return () => {
			const { index, title, activeIndex } = props
			const classes = classNames('menu-item submenu-item', {
				'is-active': activeIndex === index,
			})

			return (
				<li {...attrs} key={index} class={classes} {...hoverEvents}>
					<div class='submenu-title' {...clickEvents} onClick={handleClick}>
						{title}
					</div>
					{renderChildren()}
				</li>
			)
		}
	},
})
