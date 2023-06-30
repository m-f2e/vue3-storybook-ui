import { computed, defineComponent } from "vue";
import classNames from "classnames";
import { CheckProps } from "./types";
import './index.scss'

export default defineComponent({
  name: 'MCheck',
  props: CheckProps(),
  emits: ['update:modelValue', 'change'],
  setup(props, { slots, emit }) {
    const classes = computed(() => {
      return classNames('m-checkbox', {
        checked: props.modelValue,
        'half-checked': props.halfChecked,
        disabled: props.disabled,
      });
    })

    const handleClick = (event: MouseEvent) => {
      event.stopPropagation();
      if (!props.disabled) {
        emit('update:modelValue', !props.modelValue);
        emit('change', !props.modelValue);
      }
    }

    return () => {
      return <div class={classes.value} onClick={handleClick}>
        <div class="inner"></div>
        <div class="content">
          {slots.default?.()}
        </div>
      </div>;
    };
  }
})