<template>
	<div>
		<Navbar />
		<slot />
	</div>
</template>

<script setup lang="ts">
import "./../app.css";
</script>

<style scoped>
button > i.material-icons {
	font-size: 30px !important;
	padding-top: 5px;
}
</style>

<style>
@import url("../app.css");
</style>
