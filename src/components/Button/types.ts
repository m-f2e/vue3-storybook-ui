import { PropType } from 'vue'

enum ButtonTypes {
  PRIMARY = 'primary',
  LINK = 'link',
  DANGER = 'danger',
  DEFAULT = 'default',
}

enum SizeTypes {
  LARGE = 'large',
  SMALL = 'small',
}

const btnProps = () => ({
  label: String,
  type: {
    type: String as PropType<ButtonTypes>,
    default: ButtonTypes.DEFAULT
  },
  href: String,
  disabled: {
    type: Boolean,
    default: false,
  },
  backgroundColor: String,
  size: {
    type: String as PropType<SizeTypes>,
    default: SizeTypes.SMALL
  }
})

export {
  btnProps,
  ButtonTypes,
  SizeTypes,
}