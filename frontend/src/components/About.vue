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
let navigation= ref<
  {name: string, href: string}[]
>([
  {name: "Home", href: "/"},
  {name: "About", href: "/about"}
])
</script>

<template>
<div class="bg-black">
  <header class="absolute inset-x-0 top-0 z-50">
    <nav class="flex item-center justify-between p-3 lg:px-4" aria-label="Global">
      <div class="flex lg:flex-1">
        <a href="#" class="-m-1.5 p-1.5">
          <span class="sr-only">Navbar</span>
        </a>
      </div>
      <div class="hidden lg:flex lg:gap-x-12">
        <router-link v-for="item in navigation" :key="item.name" v-bind:to="item.href" class="text-sm font-semibold leading-6 text-gray-900">{{ item.name }}</router-link>
      </div>
      <div class="hidden lg:flex lg:flex-1 lg:justify-end">
        <a href="#" class="text-sm font-semibold leading-6 text-gray-900">Log in <span aria-hidden="true">&rarr;</span></a>
      </div>
    </nav>
  </header>
</div>

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
.read-the-docs {
  color: #888;
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
