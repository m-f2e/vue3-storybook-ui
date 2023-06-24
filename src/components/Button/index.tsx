import { defineComponent } from "vue"
import classNames from 'classnames'
import { ButtonTypes, btnProps } from "./types"
import './index.scss'

export default defineComponent({
  name: 'MButton',
  props: btnProps(),
  setup(props, { attrs }) {
    return () => {
      const { type, href, label, size, disabled, backgroundColor } = props
      const classes = classNames('btn', {
        [`btn-${type}`]: type,
        [`btn-${size}`]: size,
        ['disabled']: type !== ButtonTypes.LINK && disabled,
      })
      const styles = {
        backgroundColor: backgroundColor
      }
      // type link
      if (type === ButtonTypes.LINK && href) {
        return <a {...attrs} href={href} className={classes} style={styles}>{label}</a>
      }
      return <button {...attrs} disabled={disabled} className={classes} style={styles}>{label}</button>
    }
  }
})