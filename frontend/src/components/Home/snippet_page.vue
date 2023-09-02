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
<template>
</template>