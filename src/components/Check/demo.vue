<template>
  <div class="demo-box">
    <div>
      value: {{ value }}
      <a-checkbox v-model="value" />
    </div><br>
    <a-checkbox halfChecked v-model="value" /><br/>
    <a-checkbox v-model="value" disabled /><br/>
    <a-checkbox v-model="value">
      选中
    </a-checkbox>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import ACheckbox from './index';
const value = ref(false);
</script>
