<template>
  <m-button label="button" @click="onClick"></m-button>
  <m-button type='primary' label="button"></m-button>
  <m-button type="link" label="link button" href="http://www.baidu.com"></m-button>
  <m-button type='danger' label="button"></m-button>
  <m-button type='danger' size="large" label="button"></m-button>
</template>

<script setup lang="ts">
import MButton from './index'

const onClick = () => {
  console.log('$---click');
}
</script>

<style lang="scss" scoped>
</style>