import { defineComponent } from "vue"
import classNames from 'classnames'
import { ButtonTypeEnum, ButtonProps } from "./types"
import './index.scss'

export default defineComponent({
  name: 'MButton',
  props: ButtonProps(),
  setup(props, { attrs }) {
    return () => {
      const { type, href, label, size, disabled, backgroundColor } = props
      const classes = classNames('m-btn', {
        [`m-btn-${type}`]: type,
        [`m-btn-${size}`]: size,
        ['disabled']: type !== ButtonTypeEnum.LINK && disabled,
      })
      const styles = {
        backgroundColor: backgroundColor
      }
      // type link
      if (type === ButtonTypeEnum.LINK && href) {
        return <a {...attrs} href={href} class={classes} style={styles}>{label}</a>
      }
      return <button {...attrs} disabled={disabled} class={classes} style={styles}>{label}</button>
    }
  }
})