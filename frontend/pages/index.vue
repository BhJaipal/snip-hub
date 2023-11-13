<script lang="ts" setup>
import { ref } from 'vue';
import "./../app.css";
import { onMounted } from "vue";
import hljs from "highlight.js";
import "./vs-dark.css"
import {definePageMeta} from "#imports";

const LangList = ref<{
  id: string,
  langName: string,
  codeBoxes: {title: string, code: string}[]
}[]>([]);

definePageMeta({
  layout: "default"
})

onMounted(async () => {
  let { data }= await useFetch("http://localhost:3300/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      query: "{langList{langName, id, codeBoxes {title, code}}}"
    })
  });
  LangList.value= data.data.langList;
  setTimeout(() => {
    hljs.highlightAll();
  }, 100);
});

</script>
<template>
  <div id="home">

    <div v-if="!(LangList.length)">
      <div id="loading"></div>
    </div>
  <div v-else>
    <div v-for="langBox in LangList">
      <h3 class="text-center">{{ langBox.langName.charAt(0).toUpperCase() + langBox.langName.slice(1) }}</h3>
        <HomeHighlighter v-for="codeBox in langBox.codeBoxes"
                       v-bind:langName="langBox.langName"
                       v-bind:snipTitle="codeBox.title"
                       v-bind:snipCode="codeBox.code" />
      </div>
    </div>
  </div>
</template>
<style scoped>
nav>div:nth-child(2)>button:nth-child(1) {
  @apply bg-indigo-950;
}

button>i.material-icons {
  font-size: 30px !important;
  padding-top: 5px;
}
#loading {
  margin-top: 300px;
  margin-left: 160px;
  width: 48px;
  height: 48px;
  border: 5px solid #3498db;
  border-radius: 50%;
  border-bottom-color: transparent;
  box-sizing: border-box;
  animation: rotate 1s linear infinite
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
