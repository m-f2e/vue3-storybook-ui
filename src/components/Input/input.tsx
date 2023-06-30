import { computed, defineComponent } from "vue"
import { InputProps } from "./types"
import classNames from "classnames"
import './index.scss'

export default defineComponent({
  name: "MInput",
  props: InputProps(),
  emits: ['update:modelValue', 'onChange', 'onKeydown'],
  setup(props, { attrs, emit }) {
    const classes = computed(() => {
      return classNames('m-input-wrapper', {
        [`input-size-${props.size}`]: props.size,
        'is-disabled': props.disabled,
        'input-group': props.prepend || props.append,
        'input-group-prepend': !!props.prepend,
        'input-group-append': !!props.append,
      })
    })

    const handleChange = (e: Event) => {
      if ((e.target as HTMLInputElement).value !== props.modelValue) {
        emit('update:modelValue', (e.target as HTMLInputElement).value);
        emit('onChange', (e.target as HTMLInputElement).value);
      }
    }

    return () => {
      const { disabled, prepend, append, style, modelValue } = props
      return (
        <div class={classes.value} style={style}>
          {prepend && <div class="m-input-group-prepend">{prepend}</div>}
          <input
            {...attrs}
            value={modelValue}
            onInput={handleChange}
            onKeydown={e => emit('onKeydown', e)}
            class="m-input-inner"
            disabled={disabled}
          />
          {append && <div class="m-input-group-append">{append}</div>}
        </div>
      );
    };
  }
})