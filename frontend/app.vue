<template>
  <nuxt-layout>
    <nuxt-page></nuxt-page>
  </nuxt-layout>
</template>

<script lang="ts">
export default {
  head: {
    link: [
      // Material Icons
      {rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons'},
    ]
  }
}
</script>

<style scoped>
@import url(./eruda.css);
@tailwind base;
@tailwind utilities;
@tailwind components;
</style>