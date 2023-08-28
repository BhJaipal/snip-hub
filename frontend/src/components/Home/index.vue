<script setup lang="ts">
import { ref } from 'vue'

let navigation= ref<{name: string, href: string, active: boolean}[]>([
  {name: "Home", href: "/", active: true},
  {name: "About", href: "/about", active: false}
])
</script>
<template>
  <nav class="bg-[#181818] inset-0 h-20 w-full border-b-2 border-white">
    <div class="bg-transparent font-bold h-full pt-5 flex py-2 float-left text-2xl pl-2.5">Home Page
    </div>
    <div class="flex justify-end py-2">
      <button v-for="item in navigation" v-bind:key="item.name" class="text-white font-bold rounded-xl border-2 w-[60px] h-[55px] mt-[5px] bg-slate-900 mr-5 flex-row flex-nowrap hover:bg-indigo-950 cursor-pointor decoration-transparent">
        <router-link class="underline-none" v-bind:active="item.active" v-bind:to="item.href">
          {{ item.name }}
        </router-link>
      </button>
    </div>
  </nav>
</template>
<style scoped>
nav> div> button:nth-child(1){
  @apply bg-indigo-950
}
</style>
