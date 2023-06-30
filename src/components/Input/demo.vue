<template>
  <div class="main">
    <MInput style="width: 100px" placeholder="placeholder" />
    <MInput style="width: 300px" placeholder="disabled input" disabled />
    <MInput style="width: 300px" placeholder="large size" size="large" />
    <MInput style="width: 300px" placeholder="small size" size="small" />
    <div>
      <p>input: {{ inputValue }}</p>
      <MInput
        prepend="https://"
        v-model="inputValue"
      />
    </div>
    <MInput style="width: 300px" modelValue="11" append=".com" @onChange="onHandlerChange" @onKeydown="onHandlerKeydown" />
  </div>
</template>

<script lang="ts" setup>
  import MInput from './index'
  import { ref } from 'vue';
  const inputValue = ref('123');

  const onHandlerChange = (e: any) => {
    console.log('onChange', e);
  }

  const onHandlerKeydown = (e: any) => {
    console.log('onKeydown', e);
  }
</script>

<style lang="scss"></style>
