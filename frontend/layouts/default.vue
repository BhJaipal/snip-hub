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
@font-face {
	font-family: "Material Icons";
	font-style: normal;
	font-weight: 400;
	src: url(https://fonts.gstatic.com/s/materialicons/v141/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2)
		format("woff2");
}

.material-icons {
	font-family: "Material Icons";
	font-weight: normal;
	font-style: normal;
	font-size: 24px;
	line-height: 1;
	letter-spacing: normal;
	text-transform: none;
	display: inline-block;
	white-space: nowrap;
	word-wrap: normal;
	direction: ltr;
	-moz-font-feature-settings: "liga";
	font-feature-settings: "liga";
	-moz-osx-font-smoothing: grayscale;
}
</style>
