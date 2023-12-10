<script lang="ts" setup>
import { ref } from "vue";
import "./../app.css";
import { onMounted } from "vue";
import hljs from "highlight.js";
import "./vs-dark.css";
import { definePageMeta } from "#imports";

const LangList = ref<
  {
    id: string;
    langName: string;
    codeBoxes: { title: string; code: string }[];
  }[]
>([]);

definePageMeta({
  layout: "default",
});

onMounted(async () => {
  let data = await fetch("http://localhost:3300/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: "{langList{langName, codeBoxes {title, code}}}",
    }),
  });
  let res = await data.json();

  LangList.value = res.data.langList;
  setTimeout(() => {
    hljs.highlightAll();
  }, 100);
});
</script>
<template>
  <div id="home">
    <div v-if="!LangList.length">
      <div id="loading"></div>
    </div>
    <div v-else>
      <div v-for="(langBox, index) in LangList" :key="index">
        <h2 class="text-center">
          {{
            langBox.langName.charAt(0).toUpperCase() + langBox.langName.slice(1)
          }}
        </h2>
        <HomeHighlighter
          v-for="(codeBox, index2) in langBox.codeBoxes"
          :key="index2"
          v-bind:langName="langBox.langName"
          v-bind:snipTitle="codeBox.title"
          v-bind:snipCode="codeBox.code"
        />
      </div>
    </div>
  </div>
</template>
<style scoped>
button > i.material-icons {
  font-size: 30px !important;
  padding-top: 5px;
}

#loading {
  margin-top: 45vh;
  margin-left: 50vw;
  width: 48px;
  height: 48px;
  border: 5px solid #3498db;
  border-radius: 50%;
  border-bottom-color: transparent;
  box-sizing: border-box;
  animation: rotate 1s linear infinite;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
