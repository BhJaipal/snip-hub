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
<style scoped>
#loading{
        margin-top: 330px;
        margin-left: 145px;
              width: 48px;
                 height: 48px;
                  border: 5px solid #3498db;
                      16 ┊ border-radius: 50%;
                         17 ┊ border-bottom-color: transparent;
                            18 ┊ box-sizing: border-box;
                               19 ┊ animation: rotate 1s linear infinite
                                  20 }
                                     21
                                        22 @keyframes rotate {
                                           23 ┊ 0% {transform: rotate(0deg);}
                                              24 ┊ 100% {transform: rotate(360deg);}
                                                  }
}
</style>