<script setup lang="ts">
//import Icon from "nuxt-icon";
defineProps<{
  langName: string;
  snipTitle: string;
  snipCode: string;
}>();

function copy(code: string) {
  navigator.clipboard
    .writeText(code)
    .then(() => {})
    .catch(() => window.alert("Couldn't copy"));
}

document.querySelectorAll("button.copy-btn").forEach((elem) => {
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
      <div
        class="flex flex-row overflow-none mb-0 bg-gray-200 float-left circle-box"
      >
        <div class="bg-red-500 rounded-full mt-2 circle"></div>
        <div class="bg-yellow-500 rounded-full mt-2 circle"></div>
        <div class="bg-green-500 rounded-full mt-2 circle"></div>
        <h3 class="overflow-y-scroll text-center snip-title">
          {{ snipTitle }}
        </h3>
      </div>
      <button class="border-0 copy-btn" @click="copy(snipCode)">
        <i class="material-icons bg-grey-200 copy-icon float-left">
          content_copy
        </i>
        <div class="copy-text bg-gray-200">copy</div>
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
@media (min-width: 200px) {
  .circle-box {
    @apply ml-5 h-6 w-[245px];
  }
  .circle {
    @apply w-2 h-2 mt-2;
  }
  .circle:first-child {
    @apply ml-2 mr-0.5;
  }
  .circle:nth-child(2) {
    @apply mx-0.5;
  }
  .circle:nth-child(3) {
    @apply ml-0.5 mr-3;
  }
  div {
    @apply text-left;
  }

  div > pre {
    @apply text-sm ml-10 mb-4 pt-0 w-[300px] overflow-scroll mt-0;
  }

  div > pre > code {
    @apply bg-slate-900 pl-5 mt-[-20px];
  }
  .snip-title {
    @apply h-6;
  }
  .copy-btn {
    @apply w-[55px] h-6;
  }
  .copy-btn i {
    @apply w-3 h-4 text-sm;
  }
  .copy-btn div {
    @apply pl-[17px];
  }
}
@media (min-width: 550px) {
  .circle-box {
    @apply ml-5 h-8 w-[700px];
  }
  .circle {
    @apply w-4 h-4 mt-4;
  }
  div {
    @apply text-left;
  }

  div > pre {
    //width: 700px;
    @apply text-lg mx-5 mb-10 pt-0 overflow-scroll mt-0 w-[900px];
  }

  div > pre > code {
    @apply bg-slate-900 pl-5 mt-[-20px] w-[900px];
  }
  .circle:first-child {
    @apply ml-4 mr-0.5;
  }
  .circle:nth-child(2) {
    @apply mx-0.5;
  }
  .circle:nth-child(3) {
    @apply ml-0.5 mr-3;
  }

  .snip-title {
    @apply h-12 text-2xl pt-1.5;
  }
  .copy-btn {
    @apply w-[200px] h-10;
  }
  .copy-btn i {
    @apply w-6 h-8 text-lg;
  }
  .copy-btn div {
    @apply pl-[50px];
  }
}
@media (min-width: 1400px) {
  .circle-box {
    @apply ml-20 h-12 w-[1650px];
  }
  .circle {
    @apply w-6 h-6 mt-3;
  }
  div {
    @apply text-left;
  }

  div > pre {
    @apply text-lg ml-20 mb-4 pt-0 w-[1750px] overflow-scroll mt-0;
  }

  div > pre > code {
    @apply bg-slate-900 pl-5 mt-[-30px] w-[1750px];
  }
  .circle:first-child {
    @apply ml-2 mr-2;
  }
  .circle:nth-child(2) {
    @apply mx-2;
  }
  .circle:nth-child(3) {
    @apply ml-2 mr-12;
  }

  .snip-title {
    @apply h-14 text-2xl;
  }
  .copy-btn {
    @apply w-[100px] h-12 text-2xl;
  }
  .copy-btn i {
    @apply w-3 h-12 pt-2;
  }
  .copy-btn div {
    @apply pl-[25px] h-12 pt-2;
  }
}
</style>
