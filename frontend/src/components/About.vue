<script setup lang="ts">
import { ref } from "vue";

defineProps<{
  msg: string;
}>();

interface pageModule {
  name: string;
  link: string;
  img: string;
};

let base= "./src/components/assets/";

let homeList = ref<pageModule[]>([
  {
    name: "Bootstrap",
    link: "getbootstrap.com",
    img: base + "/bootstrap.png",
  },
  {
    name: "jQuery UI",
    link: "jqueryui.com",
    img: "https://jqueryui.com/resources/demos/checkboxradio/images/jquery-ui.png",
  },
  { name: "Highlight.js", link: "highlightjs.org", img: "no image" },
  { name: "SystemJS", link: "github.com/systemjs", img: "no image" },
]);
let aboutList = ref<pageModule[]>([
  {
    name: "Vue",
    link: "vuejs.org",
    img: base + "vue.png"
  },
  {
    name: "TypeScript",
    link: "typescriptlang.org",
    img: base+ "ts-logo.png",
  },
  {
    name: "Bootstrap",
    link: "getbootstrap.com",
    img: base + "bootstrap.png",
  },
  {
    name: "Vite",
    link: "vitejs.dev",
    img: base + "vite.png"
  },
]);
let navigation= ref<{name: string, href: string, active: boolean}[]
>([
  {name: "Home", href: "/", active: false},
  {name: "About", href: "/about", active: true}
])
</script>

<template>
    <nav class="bg-[#181818] inset-0 h-20 w-full border-b-2 border-white">
      <div class="bg-transparent font-bold h-full pt-5 flex py-2 float-left text-2xl pl-2.5">About Page
      </div>
      <div class="flex justify-end py-2">
        <button v-for="item in navigation"
          :key="item.name"
          class="text-white font-bold rounded-xl border-2 w-[60px] h-[55px] mt-[5px] bg-slate-900 mr-5 flex-row flex-nowrap hover:bg-indigo-950 cursor-pointor decoration-transparent">
          <router-link class="underline-none" v-bind:active="item.active" v-bind:to="item.href">
            {{ item.name }}</router-link>
          </button>
      </div>
    </nav>

  <h1>{{ msg }}</h1>

  <h3>This is made by Jaipal</h3>

  <h4>Modules used for home page</h4>

  <ul class="module-list">
    <li v-for="module in homeList" class="item">
      <a v-bind:href="`https://${module.link}`" target="_blank">
        <div class="name">{{ module.name }}</div>
        <img class="logo" v-bind:src="module.img"
      /></a>
    </li>
  </ul>

  <h4>Modules used for About page</h4>
  <ul class="module-list">
    <li v-for="module in aboutList" class="item">
      <a v-bind:href="`https://${module.link}`" target="_blank">
        <div class="name">{{ module.name }}</div>
        <img class="logo" v-bind:src="module.img" />
      </a>
    </li>
  </ul>
</template>

<style scoped>
nav> div:nth-child(2){
  @apply bg-indigo-950
}
.item {
  height: 25px;
  margin-left: 100px;
}
.item > a > .name {
  height: 24px;
  text-align: center;
  width: 100px !important;
  float: left;
}
.item > a > .logo {
  box-sizing: border-box;
  width: auto;
  height: 24px;
  background-size: cover;
}
.item > a > img[src$="strap.png"] {
  width: auto;
  height: 24px;
}
.item > a > img[src$="jquery-ui.png"] {
  background: rgb(178, 73, 38);
}
.item > a > img[src="no image"] {
  display: none;
}
ul.module-list {
  list-style-type: none;
}
.item> a {
  text-decoration: none;
  color: inherit;
}
</style>
