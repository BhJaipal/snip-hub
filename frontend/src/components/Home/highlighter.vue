<script setup lang="ts">
  defineProps<{
  langName: string;
  snipTitle: string;
  snipCode: string;
}>();
</script>
<template>
  <div v-highlighht>
    <h4>{{ snipTitle }}</h4>
    <pre>
      <code v-bind:class="langName">
{{ snipCode }}
      </code>
    </pre>
  </div>
</template>
<style scoped>
div{
  @apply text-left
}
div> pre{
  @apply text-sm ml-10 mb-4 w-[300px] overflow-scroll
}
div> pre> code{
  @apply bg-slate-900 pl-5
}
h4{
  @apply text-lg text-center
}
</style>
