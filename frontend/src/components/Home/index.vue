<script setup lang="ts">
import { ref } from 'vue'
import snip from "./snippet_page.vue";

let navigation = ref<{ name: string, href: string, active: boolean }[]>([
  { name: "Home", href: "/", active: true },
  { name: "About", href: "/about", active: false }
]);
function toggle() {
  if (document.getElementsByClassName("navbar-list")[0].classList.contains("h-0")) {
    // navbar-list to 110px 
    document.getElementsByClassName("navbar-list")[0].classList.replace("h-0", "h-{110px}");
    document.querySelectorAll("button.navbar-nav").forEach(node => {
      node.classList.replace("h-0", "h-[55px]");
      node.classList.replace("hidden", "block");
    });
    document.getElementsByTagName("nav")[0].classList.replace("h-20", "h-50");
  } else {
    document.getElementsByClassName("navbar-list")[0].classList.replace("h-{110px}", "h-0");
    document.querySelectorAll("button.navbar-nav").forEach(node => {
      node.classList.replace("h-[55px]", "h-0");
      node.classList.replace("block", "hidden");
    });
    document.getElementsByTagName("nav")[0].classList.replace("h-50", "h-20");
  }
}
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
  <snip />
</template>
<style scoped>
nav>div:nth-child(2)>button:nth-child(1) {
  @apply bg-indigo-950
}

button>i.material-icons {
  font-size: 30px !important;
  padding-top: 5px;
}</style>
