<script setup lang="ts">
import { ref } from "vue";
import hljs from "highlight.js";
import "../vs-dark.css";
import { def } from "@vue/shared";

definePageMeta({
  layout: "default",
});

let inputTitle = ref("");
let langSelect = ref(null);
let preview = ref(null);
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
          },
        },
      },
    }),
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
  hljs.highlightAll();
}

hljs.highlightAll();

function update() {
  document.getElementById("preview")!.innerHTML = defaultSnip.value;
  hljs.highlightElement(document.getElementById("preview")!);
}
</script>

<template>
  <h1>Create Page</h1>

  Select a language
  <select
    name="lang-select"
    ref="langSelect"
    @change="selectValChange"
    class="bg-slate-800"
  >
    <option value="javascript" selected>javascript</option>
    <option value="php">PHP</option>
    <option value="python">Python</option>
    <option value="c">C</option>
    <option value="cpp">C++</option></select
  ><br />

  <input
    class="rounded-lg bg-slate-800 w-60 h-8 mt-5 mb-3 pl-2"
    placeholder="Enter title"
    v-model="inputTitle"
    required
  />

  <textarea
    id="code-input"
    v-model="defaultSnip"
    class="bg-slate-800 h-80 w-72 rounded-lg pl-2"
    placeholder="enter code here"
    autocapitalize="off"
    required
  ></textarea>
  <button
    type="button"
    class="bg-green-600 h-10 w-20 my-5 ml-5 rounded-lg"
    @click="update"
  >
    Highlight
  </button>

  <div class="text-black mt-2">
    <div
      class="flex flex-row ml-[34px] h-6 overflow-none mb-0 bg-gray-200 w-80 float-left"
    >
      <div class="bg-red-500 w-2 h-2 rounded-full ml-2 mr-0.5 mt-2"></div>
      <div class="bg-yellow-500 w-2 h-2 rounded-full mx-0.5 mt-2"></div>
      <div class="bg-green-500 w-2 h-2 rounded-full ml-0.5 mr-3 mt-2"></div>
      <div class="overflow-y-scroll h-6">{{ inputTitle }}</div>
    </div>
  </div>

  <pre
    id="pre-tag"
    class="javascript pl-1 h-36 w-80 bg-slate-800 mt-[52px] ml-[34px] text-left pt-0"
  ><code id="preview" class="text-sm h-36 overflow-y-scroll">{{ defaultSnip }}</code></pre>

  <button
    @click="sendDataBtn"
    id="send-data"
    class="w-20 mt-2 h-10 hover:bg-blue-800 bg-sky-700"
  >
    Submit
  </button>
</template>

<style scoped>
@media (min-width: 150px) {
  button > i.material-icons {
    font-size: 30px !important;
    padding-top: 5px;
  }
  code {
    margin-top: -20px;
  }
}
</style>
