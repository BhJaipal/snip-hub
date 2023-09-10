<script setup lang="ts">
  defineProps<{
  langName: string;
  snipTitle: string;
  snipCode: string;
}>();

function copy(code: string) {
  navigator.clipboard.writeText(code) 
    .then(() => {})
    .catch(() => window.alert("Couldn't copy"));
  document.getElementsByClassName("copy-text")[0].innerHTML= "copied";
  document.getElementsByClassName("copy-icon")[0].innerHTML= "done";
}
function copyBtnOut() {
  document.getElementsByClassName("copy-icon")[0].innerHTML= "content_copy";
  document.getElementsByClassName("copy-text")[0].innerHTML= "copy";
}
</script>
<template>
  <div v-highlighht>
    <div class="flex flex-row ml-10 h-6 overflow-none mb-0 bg-gray-800 w-[230px] float-left">
      <div class="bg-red-500 w-2 h-2 rounded-full ml-2 mr-0.5 mt-2"></div>
      <div class="bg-yellow-500 w-2 h-2 rounded-full mx-0.5 mt-2"></div>
      <div class="bg-green-500 w-2 h-2 rounded-full ml-0.5 mr-3 mt-2"></div>
      <div class="overflow-y-scroll h-6">{{ snipTitle }}</div>
    </div>
    <div>
      <button class="border-0 bg-grey-800 h-6 copy w-[72px]" @blur="copyBtnOut" @click="copy(snipCode)">
        <i class="material-icons bg-gray-800 copy-icon text-sm h-4 w-3 float-left">content_copy</i>
      <div class="copy-text bg-gray-800 pl-4">copy</div>
      </button>
    </div>
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
  @apply text-sm ml-10 mb-4 w-[300px] overflow-scroll mt-0
}
div> pre> code{
  @apply bg-slate-900 pl-5 mt-0
}
</style>
