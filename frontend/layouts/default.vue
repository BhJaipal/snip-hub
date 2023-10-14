<style scoped>
@import url(./../eruda.css);
@tailwind base;
@tailwind utilities;
@tailwind components;
</style>
<script lang="ts" setup>
import eruda from "eruda";
let ok: string= "ok";
eruda.init();
</script>
<template>
  <h1 class="text-sky-500 text-3xl">Hello World</h1>
  {{ ok }}
  <slot></slot>
</template>

