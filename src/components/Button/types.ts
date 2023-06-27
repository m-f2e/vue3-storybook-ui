import { PropType } from 'vue'

export type TButtonType = 'primary' | 'link' | 'danger' | 'default'
export type TButtonSize = 'large' | 'small'

enum ButtonTypeEnum {
  PRIMARY = 'primary',
  LINK = 'link',
  DANGER = 'danger',
  DEFAULT = 'default',
}

enum ButtonSizeEnum {
  LARGE = 'large',
  SMALL = 'small',
}

const ButtonProps = () => ({
  label: String,
  type: {
    type: String as PropType<TButtonType>,
    default: ButtonTypeEnum.DEFAULT
  },
  href: String,
  disabled: {
    type: Boolean,
    default: false,
  },
  backgroundColor: String,
  size: {
    type: String as PropType<TButtonSize>,
    default: ButtonSizeEnum.SMALL
  }
})

export {
  ButtonProps,
  ButtonTypeEnum,
  ButtonSizeEnum,
}