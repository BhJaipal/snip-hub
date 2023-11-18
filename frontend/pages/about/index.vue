<script setup lang="ts">
import { ref } from "vue";
import { definePageMeta } from "#imports";
definePageMeta({
  layout: "default",
});
interface pageModule {
  name: string;
  link: string;
  img: string;
}

let homeList = ref<pageModule[]>([
  { name: "Highlight.js", link: "highlightjs.org", img: "/" },
  {
    name: "Vue",
    link: "vuejs.org",
    img: "/vue.png",
  },
  {
    name: "TypeScript",
    link: "typescriptlang.org",
    img: "/ts-logo.png",
  },
  {
    name: "Vite",
    link: "vitejs.dev",
    img: "/vite.png",
  },
  {
    name: "tailwindcss",
    link: "tailwindcss.com",
    img: "https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600",
  },
  {
    name: "NuxtJS",
    link: "nuxt.com",
    img: "/favicon.ico",
  },
]);
let navigation = ref<{ name: string; href: string; active: boolean }[]>([
  { name: "Home", href: "/", active: false },
  { name: "About", href: "/about", active: true },
  { name: "Create", href: "/create", active: false },
]);
</script>

<template>
  <div class="text-center">
    <h1>About Page</h1>

    <h2>Modules used for this project</h2>

    <ul class="module-list">
      <li v-for="(module, index) in homeList" :key="index" class="item">
        <a v-bind:href="`https://${module.link}`" target="_blank">
          <div class="name">
            <h3>{{ module.name }}</h3>
          </div>
          <div class="img">
            <img class="logo" v-bind:src="module.img" />
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.item {
  height: auto;
  margin-left: 40vw;
  text-align: left;
}
.item > a > .name {
  height: 4vh;
  text-align: center;
  width: 1vw;
  float: left;
}
.img {
  width: auto;
  height: 4vh;
}
.item > a > .img > .logo {
  box-sizing: border-box;
  width: auto;
  height: 4vh;
}
.item > a > img[src="/"] {
  display: none;
}
ul.module-list {
  list-style-type: none;
}
.item > a {
  text-decoration: none;
  color: inherit;
}
</style>
