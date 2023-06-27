<template>
  <div class="demo-box">
    <div>
      value: {{ value }}
      <a-checkbox v-model:value="value" />
    </div>
    <a-checkbox halfChecked v-model:value="value" /><br/>
    <a-checkbox v-model:value="value" disabled /><br/>
    <a-checkbox v-model:value="value">
      选中
    </a-checkbox>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import ACheckbox from './index';
const value = ref(false);
</script>
