<template>
  <div class="main">
    <button @click="onChange">change</button>
    <!-- horizontal -->
    <m-menu
      :defaultIndex="defaultIndex"
      @onSelect="handleClick"
      >
      <m-menu-item>link1</m-menu-item>
      <m-menu-item disabled>link2</m-menu-item>
      <m-menu-item>link3</m-menu-item>
    </m-menu>
    <!-- vertical -->
    <m-menu
      mode="vertical"
      defaultIndex="0"
      @onSelect="handleClick"
    >
      <m-menu-item>link1</m-menu-item>
      <m-menu-item disabled>link2</m-menu-item>
      <m-menu-item>link3</m-menu-item>
    </m-menu>
    <!-- horizontal submenu -->
    <m-menu defaultIndex="0" @onSelect="handleClick">
      <m-menu-item>link1</m-menu-item>
      <m-menu-item disabled>link2</m-menu-item>
      <m-sub-menu title="下拉">
        <m-menu-item disabled>2323</m-menu-item>
        <m-menu-item>过去</m-menu-item>
        <m-menu-item>现在</m-menu-item>
      </m-sub-menu>
      <m-menu-item>link3</m-menu-item>
    </m-menu>
    <!-- vertical submenu -->
    <m-menu defaultIndex="0" mode="vertical" @onSelect="handleClick">
      <m-menu-item>link1</m-menu-item>
      <m-menu-item disabled>link2</m-menu-item>
      <m-sub-menu title="下拉">
        <m-menu-item disabled>2323</m-menu-item>
        <m-menu-item>过去</m-menu-item>
        <m-menu-item>现在</m-menu-item>
      </m-sub-menu>
      <m-menu-item>link3</m-menu-item>
    </m-menu>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue';
import MMenu from './index';
import MMenuItem from './menuItem';
import MSubMenu from './subMenu';

const defaultIndex = ref('0');

const handleClick = (index: string) => {
  console.log('$---', index);
};

const onChange = () => {
  defaultIndex.value = '2';
  console.log('$---', defaultIndex.value);
}
</script>
<style lang="scss"></style>
