<script setup lang="ts">
import { ref } from "vue";
const codeList= ref(null);

onMounted(() => {
    fetch("http://localhost:3300")
        .then(re)
})
</script>