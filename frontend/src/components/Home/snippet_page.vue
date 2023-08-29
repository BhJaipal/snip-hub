<script setup lang="ts">
import { ref } from "vue";
import hljs from "highlight.js";
import hljsVuePlugin.component as highlight from "@highlightjs/vue-plugin";

const codeList= ref(null);

fetch("http://localhost:3300")
  .then(res => {return res.json();})
  .then(data=> {
  codeList.value= data;
  hljs.highlightAll();
  });
</script>
<template>
<div v-if="!codeList">
  <div id="loading"></div>
</div>
<div v-else>
  <div v-for="(langName, index) in Object.keys(codeList)" v-bind:class="langName" v-bind:key="index">
    <h3>{{ langName }}</h3>
    <div v-for="(codeBox, index) in codeList[langName]" v-bind:key="index">
      <h4>{{ codeBox.title }}</h4>
      <highlight v-bind:language="langName" 
        v-bind:code="codeBox.code" />
    </div>
  </div>
</div>
</template>
<style scoped>
#loading{
  margin-top: 330px;
  margin-left: 145px;
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
</style>

