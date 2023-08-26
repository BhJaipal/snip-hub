<script setup lang="ts">
import { ref } from "vue";

defineProps<{
  msg: string;
}>();

interface pageModule {
  name: string;
  link: string;
  img: string;
}

let homeList = ref<pageModule[]>([
  {
    name: "Bootstrap",
    link: "getbootstrap.com",
    img: "./src/components/assets/bootstrap.png",
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
  { name: "Vue", link: "vuejs.org", img: "./src/components/assets/vue.png" },
  {
    name: "TypeScript",
    link: "typescriptlang.org",
    img: "./src/components/assets/ts-logo.png",
  },
  {
    name: "Bootstrap",
    link: "getbootstrap.com",
    img: "./src/components/assets/bootstrap.png",
  },
  { name: "Vite", link: "vitejs.dev", img: "./src/components/assets/vite.png" },
]);
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">Navbar</a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a class="nav-link" href="/"
            >Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/about">About<span class="sr-only">(current)</span></a>
        </li>
      </ul>
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
.read-the-docs {
  color: #888;
}
.item {
  height: 25px;
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
