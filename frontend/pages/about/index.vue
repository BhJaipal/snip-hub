<script setup lang="ts">
import { ref } from "vue";
import {definePageMeta} from "#imports";
definePageMeta({
  layout: 'default'
})
interface pageModule {
  name: string;
  link: string;
  img: string;
};

let homeList = ref<pageModule[]>([
  { name: "Highlight.js", link: "highlightjs.org", img: "no image" },
  {
    name: "Vue 3",
    link: "vuejs.org",
    img: "/assets/vue.png"
  },
  {
    name: "TypeScript 5",
    link: "typescriptlang.org",
    img: "/assets/ts-logo.png",
  },
  {
    name: "Vite",
    link: "vitejs.dev",
    img: "/assets/vite.png"
  },
  {
    name: "tailwindcss",
    link: "tailwindcss.com",
    img: "https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
  },
  {
    name: "NuxtJS 3",
    link: "https://nuxt.com",
    img: "/favicon.ico"
  }
]);
let navigation= ref<{name: string, href: string, active: boolean}[]>([
  {name: "Home", href: "/", active: false},
  {name: "About", href: "/about", active: true},
  {name: "Create", href: "/create", active: false}
]);
</script>

<template>
  <h1>About Page</h1>

  <h4>Modules used for this project</h4>

  <ul class="module-list">
    <li v-for="module in homeList" class="item">
      <a v-bind:href="`https://${module.link}`" target="_blank">
        <div class="name">{{ module.name }}</div>
        <img class="logo" v-bind:src="module.img"
      /></a>
    </li>
  </ul>
</template>

<style scoped>
nav> div:nth-child(2)> button:nth-child(2){
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
button>i.material-icons {
  font-size: 30px !important;
  padding-top: 5px;
  }
</style>
