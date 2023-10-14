<script setup lang="ts">
defineProps<{
  langName: string;
  snipTitle: string;
  snipCode: string;
}>();

function copy(code: string) {
  navigator.clipboard.writeText(code)
    .then(() => { })
    .catch(() => window.alert("Couldn't copy"));
}

document.querySelectorAll("button.copy-btn").forEach(elem => {
  elem.addEventListener("focus", () => {
    elem.children[0].innerText = "done";
    elem.children[1].textContent = "copied";
  });
  elem.addEventListener("blur", () => {
    elem.children[0].innerText = "content_copy";
    elem.children[0].textContent = "copy";
  });
});
</script>
<template>
  <div v-highlight>
    <div class="text-black">
      <div class="flex flex-row ml-10 h-6 overflow-none mb-0 bg-gray-200 w-[245px] float-left">
        <div class="bg-red-500 w-2 h-2 rounded-full ml-2 mr-0.5 mt-2"></div>
        <div class="bg-yellow-500 w-2 h-2 rounded-full mx-0.5 mt-2"></div>
        <div class="bg-green-500 w-2 h-2 rounded-full ml-0.5 mr-3 mt-2"></div>
        <div class="overflow-y-scroll h-6">{{ snipTitle }}</div>
      </div>
      <button class="border-0 h-6 copy-btn w-[55px]" @click="copy(snipCode)">
        <i class="material-icons bg-grey-200 copy-icon text-sm h-4 w-3 float-left">content_copy</i>
        <div class="copy-text bg-gray-200 pl-[17px]">copy</div>
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
div {
  @apply text-left
}

div>pre {
  @apply text-sm ml-10 mb-4 pt-0 w-[300px] overflow-scroll mt-0
}

div>pre>code {
  @apply bg-slate-900 pl-5 mt-[-20px]
}
</style>
