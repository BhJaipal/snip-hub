<script setup lang="ts">
import { ref } from "vue";
import hljs from "highlight.js"
import "./vs-dark.css";
import highlight from "./highlighter.vue";
const codeList= ref(null);

fetch("http://localhost:3300/languages")
  .then(res => {return res.json();})
  .then(data=> {
  codeList.value= data;
  setTimeout(() => {
    hljs.highlightAll();
  }, 1000);
  });
</script>
<template>
<div v-if="!codeList">
  <div id="loading"></div>
</div>
<div v-else>
  <div v-for="langBox in codeList" v-bind:class="langBox.langName" v-bind:key="langBox.id">
    <h3>{{ langBox.langName.charAt(0).toUpperCase() + langBox.langName.slice(1) }}</h3>
    <highlight v-for="(codeBox, index) in codeList[langName]"
    v-bind:key="index"
    v-bind:langName="langName"
    v-bind:snipTitle="codeBox.title"
    v-bind:snipCode="codeBox.code"/>
  </div>
</div>
</template>
<style scoped>
#loading{
  margin-top: 280px;
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
  0% {transform: rotate(0deg);}
  100% {transform: rotate(360deg);}
}
h3{
  @apply text-xl font-bold
}
</style>

