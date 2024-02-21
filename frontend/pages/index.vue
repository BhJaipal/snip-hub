<script lang="ts" setup>
import "./../app.css";
import hljs from "highlight.js";
import "./vs-dark.css";
import { definePageMeta } from "#imports";

const state = reactive({ search: "" });

const LangList = ref<
	{
		id: string;
		langName: string;
		codeBoxes: { title: string; code: string }[];
	}[]
>([]);

function goto() {
	console.log(state.search);
	navigateTo("/search/" + state.search);
}

definePageMeta({
	layout: "default"
});

onMounted(async function () {
	document
		.getElementById("search")!
		.addEventListener("keydown", function (event) {
			event.preventDefault();
			event.key == "Enter" && goto();
		});
	let data = await fetch("http://localhost:3300/", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json"
		},
		body: JSON.stringify({
			query: "{langList{langName, codeBoxes {title, code}}}"
		})
	});
	let res = await data.json();

	LangList.value = res.data.langList;
	setTimeout(function () {
		hljs.highlightAll();
	}, 100);
});
</script>
<template>
	<div id="home">
		<div class="flex justify-center">
			<div class="flex flex-row search-box">
				<input
					type="text"
					id="search"
					placeholder="Search title"
					v-model="state.search"
					class="search"
				/>
				<button class="appearance-none h-min" @click="goto">
					<i class="material-icons search-icon">search</i>
				</button>
			</div>
		</div>
		<div v-if="!LangList.length">
			<div id="loading"></div>
		</div>
		<div v-else>
			<div v-for="(langBox, index) in LangList" :key="index">
				<h2 class="text-center">
					{{
						langBox.langName.charAt(0).toUpperCase() +
						langBox.langName.slice(1)
					}}
				</h2>
				<HomeHighlighter
					v-for="(codeBox, index2) in langBox.codeBoxes"
					:key="index2"
					v-bind:langName="langBox.langName"
					v-bind:snipTitle="codeBox.title"
					v-bind:snipCode="codeBox.code"
				/>
			</div>
		</div>
	</div>
</template>
<style scoped>
@import url("./../app.css");
.search-box {
	@apply my-10;
}

.search-box i.search-icon {
	@apply border-gray-500;
}

.search-box:hover .search-icon {
	@apply border-sky-500;
}

.search-box button {
	@apply h-10;
}

.search {
	@apply w-[100%] outline-none border-gray-500 border-2 h-10 rounded-bl-full rounded-tl-full pl-5;
}

.search:focus {
	@apply w-[120%] outline-none border-sky-500;
}

.search-icon {
	@apply text-white bg-gray-500 rounded-tr-full rounded-br-full pt-2.5 w-10 h-10;
}

.search:focus + button .search-icon {
	background-color: skyblue;
}

button > i.material-icons {
	font-size: 30px !important;
	padding-top: 5px;
}

#loading {
	margin-top: 45vh;
	margin-left: 50vw;
	width: 48px;
	height: 48px;
	border: 5px solid #3498db;
	border-radius: 50%;
	border-bottom-color: transparent;
	box-sizing: border-box;
	animation: rotate 1s linear infinite;
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
