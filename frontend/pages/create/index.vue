<script setup lang="ts">
import { ref } from "vue";
import hljs from "highlight.js";
import "../vs-dark.css";

definePageMeta({
  layout: "default",
});

let inputTitle = ref("");
let langSelect = ref("");
let defaultSnip = ref('"Hello World"');

async function sendDataBtn() {
  let res = await fetch("http://localhost:3300/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: `mutation ($codeSnip: snipBox!){
      snipAdd(codeSnip: $codeSnip) {
        langName, codeBoxes {title, code}
      }}`,
      variables: {
        codeSnip: {
          langName: langSelect.value,
          codeBox: {
            title: inputTitle.value,
            code: defaultSnip.value,
          }
        }
      }
    })
  });
  /**
   * @type { {error: Object} | {data: Object} }
   */
  let data = await res.json();
  if (data.errors) {
    alert(data.errors.title + " " + data.errors.message);
  } else {
    alert("Data sent successfully");
    console.log(data.data);
  }
}

function selectValChange() {
  document.getElementById("pre-tag")!.className =
    langSelect.value +
    " pl-1 h-40 w-80 bg-slate-800 mt-[52px] ml-[34px] text-left pt-0";
  update();
  hljs.highlightAll();
}

hljs.highlightAll();

function update() {
  document.getElementById("preview")!.innerHTML = defaultSnip.value;
  hljs.highlightAll();
}
</script>

<template>
  <h1>Create Page</h1>
  <p class="text-center">
    Select a language
    <select
      name="lang-select"
      v-model="langSelect"
      @change="selectValChange"
      class="bg-slate-800 text-white"
    >
      <option value="javascript" selected>javascript</option>
      <option value="php">PHP</option>
      <option value="python">Python</option>
      <option value="c">C</option>
      <option value="cpp">C++</option></select
    ><br />
  </p>

  <input
    class="rounded-lg bg-slate-800 code-title text-white"
    placeholder="Enter title"
    v-model="inputTitle"
    required
  />

  <textarea
    id="code-input"
    v-model="defaultSnip"
    class="bg-slate-800 rounded-lg"
    placeholder="enter code here"
    autocapitalize="off"
    v-on:change="update"
    required
  ></textarea>
  <div class="text-black mt-2">
    <div
      class="flex flex-row overflow-none mb-0 bg-gray-200 float-left circle-box"
    >
      <div class="bg-red-500 rounded-full mt-2 circle"></div>
      <div class="bg-yellow-500 rounded-full mt-2 circle"></div>
      <div class="bg-green-500 rounded-full mt-2 circle"></div>
      <div class="overflow-y-scroll snip-title">{{ inputTitle }}</div>
    </div>
  </div>

  <pre
    id="pre-tag"
    class="javascript bg-slate-800 mt-[52px] pt-0"
  ><code id="preview" class="text-sm h-36 overflow-y-scroll">{{ defaultSnip }}</code></pre>

  <button
    @click="sendDataBtn"
    id="send-data"
    class="hover:bg-blue-800 bg-sky-700"
  >
    Submit
  </button>
</template>

<style scoped>
@media (min-width: 150px) {
  h1{
    @apply text-center
  }
  code {
    margin-top: -20px;
  }
  pre{
    @apply pt-[5vh] mt-0 text-lg pl-1 h-36 w-[90vw] ml-[5vw] mr-[5vw] overflow-scroll;
  }
  .code-title{
    @apply ml-[5vw] w-[90vw] h-[5vh] my-[5vh] text-center
  }
  .circle-box{
    @apply w-[90vw] h-6 ml-[5vw]
  }
  #code-input{
    font-size: 15px;
    @apply ml-[5vw] w-[90vw] h-[40vh] pl-2 text-white
  }
  .circle {
    @apply w-2 h-2 mt-1;
  }
  .circle:first-child {
    @apply ml-2;
  }
  .circle:nth-child(2) {
    @apply mx-[2px];
  }
  .circle:nth-child(3) {
    @apply mr-3;
  }
  #send-data{
    @apply w-[25vw] my-2 ml-[40vw] h-7 text-white font-bold;
  }
}
@media (min-width: 300px) {
  h1{
    @apply text-center
  }
  code {
    margin-top: -20px;
  }
  pre{
    @apply pt-[5vh] mt-0 text-lg pl-1 h-36 w-[90vw] ml-[5vw] mr-[5vw] overflow-scroll;
  }
  .code-title{
    @apply ml-[5vw] w-[90vw] h-[5vh] my-[5vh] text-center
  }
  .circle-box{
    @apply w-[90vw] h-6 ml-[5vw]
  }
  #code-input{
    @apply ml-[5vw] w-[90vw] h-[40vh] pl-2 text-white text-sm
  }
  .circle {
    @apply w-2 h-2 mt-1;
  }
  .circle:first-child {
    @apply ml-2;
  }
  .circle:nth-child(2) {
    @apply mx-[2px];
  }
  .circle:nth-child(3) {
    @apply mr-3;
  }
  #send-data{
    @apply w-[20vw] my-3 ml-[40vw] h-10 text-white text-lg;
  }
}
@media (min-width: 600px) {
  h1{
    @apply text-center
  }
  code {
    margin-top: -20px;
  }
  pre{
    @apply pt-[5vh] mt-0 text-lg pl-1 h-36 w-[90vw] ml-[5vw] mr-[5vw] overflow-scroll;
  }
  .code-title{
    @apply ml-[5vw] w-[90vw] h-[5vh] my-[5vh] text-center text-lg
  }
  .circle-box{
    @apply w-[90vw] h-6 ml-[5vw]
  }
  #code-input{
    @apply ml-[5vw] w-[90vw] h-[40vh] pl-2 text-white
  }
  .circle {
    @apply w-2 h-2 mt-1 text-xl;
  }
  .circle:first-child {
    @apply ml-2;
  }
  .circle:nth-child(2) {
    @apply mx-[2px];
  }
  .circle:nth-child(3) {
    @apply mr-3;
  }
  #send-data{
    @apply w-[20vw] my-4 ml-[40vw] h-[12vh] text-xl font-bold;
  }
}
@media (min-width: 800px) {
  h1{
    @apply text-center
  }
  code {
    margin-top: -20px;
  }
  pre{
    @apply pt-[5vh] mt-0 text-lg pl-1 h-36 w-[90vw] ml-[5vw] mr-[5vw] overflow-scroll;
  }
  .code-title{
    @apply ml-[5vw] w-[90vw] h-[5vh] my-[5vh] text-center
  }
  .circle-box{
    @apply w-[90vw] h-6 ml-[5vw]
  }
  #code-input{
    @apply ml-[5vw] w-[90vw] h-[40vh] pl-2 text-white
  }
  .circle {
    @apply w-2 h-2 mt-1;
  }
  .circle:first-child {
    @apply ml-2;
  }
  .circle:nth-child(2) {
    @apply mx-[2px];
  }
  .circle:nth-child(3) {
    @apply mr-3;
  }
  #send-data{
    @apply w-[20vw] mt-2 ml-[40vw] h-10;
  }
}
@media (min-width: 1100px) {
  .circle-box{
    @apply w-[90vw] h-10 ml-[5vw]
  }
  .snip-title{
    @apply text-2xl font-bold pl-[35vw]
  }
  p{
    @apply mt-5 mb-0 text-xl
  }
  pre{
    @apply pt-[3vh] mt-0 text-xl pl-1 h-80 w-[90vw];
  }
  #send-data{
    @apply w-[5vw] mt-[1vh] h-[5vh] ml-[47.5vw] text-lg mb-5;
  }
  .circle {
    @apply w-5 h-5 mt-2.5;
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
}
@media (min-width: 1400px) {
  .circle-box{
    @apply w-[90vw] h-10 ml-[5vw]
  }
  #code-input{
    @apply ml-[5vw] w-[90vw] h-[40vh] pl-2 text-white text-xl
  }

  .snip-title{
    @apply text-2xl font-bold pl-[35vw]
  }
  p{
    @apply mt-5 mb-0 text-xl
  }
  pre{
    @apply pt-[3vh] mt-0 pl-1 h-80 w-[90vw] text-lg;
  }
  code{
    @apply h-80 w-[90vw] text-lg;
  }
  #send-data{
    @apply w-[5vw] mt-[1vh] h-[5vh] ml-[47.5vw] text-lg mb-5;
  }
  .circle {
    @apply w-6 h-6 mt-3;
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
}
</style>
