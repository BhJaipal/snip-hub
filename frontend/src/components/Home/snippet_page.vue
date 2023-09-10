<script setup lang="ts">
import { ref, onMounted } from "vue";
import hljs from "highlight.js";
import "./vs-dark.css"
import highlighter from "./highlighter.vue";

const codeList = ref([]);

onMounted(async () => {
    let res= await fetch("http://localhost:3300/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            query: "{langList{langName, id, codeBoxes {title, code}}}"
        })
    });
    let data= await res.json();
    codeList.value= data.data.langList;
    setTimeout(() => {
        hljs.highlightAll();
    }, 100);
});
</script>
<template>
    <div v-if="!(codeList.length)">
        <div id="loading"></div>
    </div>
    <div v-else>
        <div v-for="langBox in codeList">
            <h3 class="text-center">{{ langBox.langName.charAt(0).toUpperCase() + langBox.langName.slice(1) }}</h3>
            <highlighter v-for="codeBox in langBox.codeBoxes" 
                v-bind:langName="langBox.langName"
                v-bind:snipTitle="codeBox.title" 
                v-bind:snipCode="codeBox.code" />
        </div>
    </div>
</template>
<style scoped>
#loading {
    margin-top: 300px;
    margin-left: 160px;
    width: 48px;
    height: 48px;
    border: 5px solid #3498db;
    border-radius: 50%;
    border-bottom-color: transparent;
    box-sizing: border-box;
    animation: rotate 1s linear infinite
}

@keyframes rotate {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>
