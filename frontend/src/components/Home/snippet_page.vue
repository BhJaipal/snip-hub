<script setup lang="ts">
import { ref } from "vue";
import hljs from "highlight.js";
const codeList= ref(null);

onMounted(() => {
    fetch("http://localhost:3300")
        .then(res => {return res.json();})
        .then(data= codeList.value= data);
    setTimeout(() => {
        hljs.highlightAll();
    }, 1000);
}):
</script>
<template></template>
<style scoped>
#loading{
    margin-top: 330px;
    margin-left: 145px;
    width: 48px;
    height: 48px;
    border: 5px solid #3498db;
    border-radius: 50%;
                         border-bottom-color: transparent;
                             box-sizing: border-box;
                                animation: rotate 1s linear infinite
}

                                         @keyframes rotate {
                                           0% {transform: rotate(0deg);}
                                               100% {transform: rotate(360deg);}
    }
}
</style>
