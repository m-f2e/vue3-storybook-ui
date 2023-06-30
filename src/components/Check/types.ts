import { CustomEventFuncType } from "../utils/types";

const CheckProps = () => ({
  modelValue: { // value
    type: Boolean,
    default: false
  },
  disabled: { // 是否禁用
    type: Boolean,
    default: false
  },
  halfChecked: { // 是否半选
    type: Boolean,
    default: false
  },
  onChange: Function as CustomEventFuncType<boolean>,
})

export {
  CheckProps
}