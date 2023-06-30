import { PropType } from "vue"

export type InputSize = 'large' | 'small'

const InputProps = () => ({
  disabled: Boolean, // 是否禁用
  size: String as PropType<InputSize>,
  prepend: String, // 前缀
  append: String, // 后缀
  style: Object, 
  modelValue: {
    type: String || Object,
    default: ''
  },
})

export {
  InputProps,
}