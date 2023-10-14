<script setup lang="ts">
import { ref } from "vue";
import hljs from "highlight.js";
import "../../components/home/vs-dark.css";

let inputTitle= ref("");
let langSelect = ref(null);
let preview = ref(null);
let defaultSnip = ref("\"Hello World\"");

function toggle() {
  if (document.getElementsByClassName("navbar-list")[0].classList.contains("h-0")) {
    document.getElementsByClassName("navbar-list")[0].classList.replace("h-0", "h-{165px}");
    document.querySelectorAll("button.navbar-nav").forEach(node => {
      node.classList.replace("h-0", "h-[55px]");
      node.classList.replace("hidden", "block");
    });
    document.getElementsByTagName("nav")[0].classList.replace("h-20", "h-50");
  } else {
    document.getElementsByClassName("navbar-list")[0].classList.replace("h-{165px}", "h-0");
    document.querySelectorAll("button.navbar-nav").forEach(node => {
      node.classList.replace("h-[55px]", "h-0");
      node.classList.replace("block", "hidden");
    });
    document.getElementsByTagName("nav")[0].classList.replace("h-50", "h-20");
  }
}

async function sendDataBtn() {
  let { data }= await useFetch("http://localhost:3300/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      query: `mutation ($codeSnip: snipBox!){
      snipAdd(codeSnip: $codeSnip) {
        langName, codeBoxes {title, code}
      }}`,
      variables: {
        codeSnip: {
          langName: langSelect.value.value,
          codeBox: {
            title: inputTitle.value,
            code: defaultSnip.value
          }
        }
      }
    })
  });
  if (data.errors) {
    alert(data.errors.title + " " + data.errors.message);
  } else {
    alert("Data sent successfully");
  }
  console.log(data.data);
}

function selectValChange() {
  document.getElementById("pre-tag").className = langSelect.value.value + " pl-1 h-40 w-80 bg-slate-800 mt-[52px] ml-[34px] text-left pt-0";
  hljs.highlightAll();
};

hljs.highlightAll();

function update() {
  hljs.highlightElement(preview.value);
}

let navigation = ref<{ name: string, href: string, active: boolean }[]>([
  { name: "Home", href: "/", active: false },
  { name: "About", href: "/about", active: false },
  { name: "Create", href: "/create", active: true }
]);
</script>

<template>
  <NuxtLayout name="default"><template>
  <nav class="bg-[#181818] inset-0 h-20 w-full border-b-2 border-white">
    <div class="bg-[#181818] font-bold h-18 pt-5 flex py-2 float-left text-2xl pl-2.5">Navbar
    </div>
    <div class="flex justify-end py-3 bg-[#181818]">
      <button
        class="w-[50px] bg-black text-white font-bold flex-row flex-nowrap rounded-xl mr-5 border-2 h-[45px] mt-[5px]"
        @click="toggle">
        <i class="material-icons">menu</i></button>
    </div>
    <div class="flex navbar-list flex-col w-full h-0">
      <button v-for="item in navigation" v-bind:key="item.name"
        class="text-white font-bold rounded-xl h-0 bg-slate-900 hover:bg-indigo-950 cursor-pointor decoration-transparent navbar-nav hidden">
        <NuxtLink class="underline-none" v-bind:active="item.active" v-bind:to="item.href">
          {{ item.name }}
        </NuxtLink>
      </button>
    </div>
  </nav>
  <h1>Create Page</h1>

    Select a language <select 
      name="lang-select" 
      ref="langSelect" 
      @change="selectValChange" class="bg-slate-800">
      <option value="javascript" selected>javascript</option>
      <option value="php">PHP</option>
      <option value="python">Python</option>
      <option value="c">C</option>
      <option value="cpp">C++</option>
    </select><br />

    <input class="rounded-lg bg-slate-800 w-60 h-8 mt-5 mb-3 pl-2" placeholder="Enter title" v-model="inputTitle" required />

    <textarea id="code-input" v-model="defaultSnip" class="bg-slate-800 h-80 w-72 rounded-lg pl-2"
      placeholder="enter code here" autocapitalize="off" required></textarea>
    <button type="button" class="bg-green-600 h-10 w-20 my-5 ml-5 rounded-lg"
      @click="update">Highlight</button>

    <div class="text-black mt-2">
      <div class="flex flex-row ml-[34px] h-6 overflow-none mb-0 bg-gray-200 w-80 float-left">
        <div class="bg-red-500 w-2 h-2 rounded-full ml-2 mr-0.5 mt-2"></div>
        <div class="bg-yellow-500 w-2 h-2 rounded-full mx-0.5 mt-2"></div>
        <div class="bg-green-500 w-2 h-2 rounded-full ml-0.5 mr-3 mt-2"></div>
        <div class="overflow-y-scroll h-6">{{ inputTitle }}
        </div>
      </div>
    </div>

    <pre id="pre-tag" class="javascript pl-1 h-36 w-80 bg-slate-800 mt-[52px] ml-[34px] text-left pt-0"><code ref="preview" class="text-sm h-36 overflow-y-scroll">{{ defaultSnip }}</code></pre>

    <button @click="sendDataBtn" id="send-data" class="w-20 mt-2 h-10 hover:bg-blue-800 bg-sky-700">
      Submit
    </button>
    </template>
  </NuxtLayout>
</template>

<style scoped>
nav>div:nth-child(2)>button:nth-child(2) {
  @apply bg-indigo-950
}

button>i.material-icons {
  font-size: 30px !important;
  padding-top: 5px;
}

code {
  margin-top: -20px;
}
</style>
