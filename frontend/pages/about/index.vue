<script setup lang="ts">
import { ref } from "vue";

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
    img: "/vue.png"
  },
  {
    name: "TypeScript 5",
    link: "typescriptlang.org",
    img: "/ts-logo.png",
  },
  {
    name: "Vite",
    link: "vitejs.dev",
    img: "/vite.png"
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
  </NuxtLayout>
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
