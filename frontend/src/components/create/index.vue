<script setup lang="ts">
import { ref } from "vue";
import hljs from "highlight.js";
import "./../Home/vs-dark.css";

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

async function sendData() {
  await fetch("http://localhost:3300/", {
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
      variable: {
        "codeSnip": {
          "langName": document.getElementById("lang-select").value,
          "codeBlock": {
            "title": document.getElementById("title").value,
            "code": document.getElementById("code-input").value
          }
        }
      }
    })
  });
}
document.getElementById("lang-select").addEventListener("change", function() {
  document.getElementById("pre-tag").className= document.getElementById("lang-select").value;
});

hljs.highlightAll();

function update() {
  let textArea= document.getElementById("code-input");
  document.getElementById("preview").textContent= textArea.innerText;
  hljs.highlightElement(document.getElementById("preview"));
}

let navigation= ref<{name: string, href: string, active: boolean}[]>([
  {name: "Home", href: "/", active: false},
  {name: "About", href: "/about", active: false},
  {name: "Create", href: "/create", active: true}
]);
</script>

<template>
    <nav class="bg-[#181818] inset-0 h-20 w-full border-b-2 border-white">
    <div class="bg-[#181818] font-bold h-18 pt-5 flex py-2 float-left text-2xl pl-2.5">Navbar
    </div>
    <div class="flex justify-end py-3 bg-[#181818]">
      <button
        class="w-[50px] bg-black text-white font-bold mr-5 flex-row flex-nowrap rounded-xl mr-5 border-2 h-[45px] mt-[5px]"
        @click="toggle">
        <i class="material-icons">menu</i></button>
    </div>
    <div class="flex navbar-list flex-col w-full h-0">
      <button v-for="item in navigation" v-bind:key="item.name"
        class="text-white font-bold rounded-xl h-0 bg-slate-900 hover:bg-indigo-950 cursor-pointor decoration-transparent navbar-nav hidden">
        <router-link class="underline-none" v-bind:active="item.active" v-bind:to="item.href">
          {{ item.name }}
        </router-link>
      </button>
    </div>
  </nav>
  <h1>Create Page</h1>

  <form v-on:submit.prevent="sendData">
    <select name="langSelect" id="lang-select" class="bg-slate-800">
      <option value="javascript">javascript</option>
      <option value="php">PHP</option>
      <option value="python">Python</option>
    </select><br />

    <input class="rounded-lg bg-slate-800 w-60 h-8 mt-5 mb-3 pl-2" placeholder="Enter title"/>

    <textarea onchange="update()"
      id="code-input" class="bg-slate-800 h-80 w-72 rounded-lg pl-2" placeholder="enter code here"></textarea>

    <pre id="pre-tag" class="javascript h-40 w-72 bg-slate-800 mt-3 ml-[50px]">
    <code id="preview"></code></pre>

    <button type="submit" class="w-10 h-5 bg-slate-800">
      Submit
    </button>
  </form>
</template>

<style scoped>
nav> div:nth-child(2)> button:nth-child(2){
  @apply bg-indigo-950
}
button>i.material-icons {
  font-size: 30px !important;
  padding-top: 5px;
}
</style>
