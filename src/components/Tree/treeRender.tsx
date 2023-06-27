import { defineComponent } from "vue";
import { renderNodeProps } from "./types";

export default defineComponent({
  name: 'MTreeRender',
  props: renderNodeProps(),
  setup(props, {}) {
    return () => {
      return props.render!(props.node!);
    };
  }
})