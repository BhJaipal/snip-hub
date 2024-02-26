<script lang="ts" setup>
import { ref, onMounted } from "vue";
import "./../../app.css";
import hljs from "highlight.js";
import "./../vs-dark.css";

let route = useRoute();
let title = route.params.title;
if (title == "") navigateTo("/");

const titleFind = ref<
	{
		langName: string;
		codeBoxes: { title: string; code: string }[];
	}[]
>([]);

onMounted(async function () {
	let data = await fetch("http://localhost:3300/", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json"
		},
		body: JSON.stringify({
			query: `#graphql
			{
				titleFind(title: "${title}") {
					langName,
					codeBoxes {
						title, code
					}
				}
			}`
		})
	});
	let res = await data.json();

	titleFind.value = res.data.titleFind;
	setTimeout(function () {
		hljs.highlightAll();
	}, 100);
});
</script>

<template>
	<div v-if="!titleFind.length">
		<div id="loading"></div>
	</div>
	<div v-else>
		<div class="flex justify-center my-10">
			<div
				class="p-5 border-4 border-b-0 border-l-0 shadow-lg border-sky-400 shadow-black rounded-xl"
			>
				<button @click="() => navigateTo('/')" id="go-back">
					<h4 class="font-bold text-center text-sky-600">
						<i class="text-2xl font-bold material-icons"
							>arrow_back_ios_new</i
						>
						Go to Home Page
					</h4>
				</button>
			</div>
		</div>
		<div v-for="(langBox, index) in titleFind" :key="index">
			<h2 class="text-center">
				{{
					langBox.langName.charAt(0).toUpperCase() +
					langBox.langName.slice(1)
				}}
			</h2>
			<Highlighter
				v-for="(codeBox, index2) in langBox.codeBoxes"
				:key="index2"
				v-bind:langName="langBox.langName"
				v-bind:snipTitle="codeBox.title"
				v-bind:snipCode="codeBox.code"
			/>
		</div>
	</div>
</template>
<style scoped>
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
