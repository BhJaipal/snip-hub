<script lang="ts" setup>
import { ref, onMounted } from "vue";
import "./../../app.css";
import hljs from "highlight.js";
import "./../vs-dark.css";
import { useGQLFetch } from "./../../server/api";

let route = useRoute();
let title = route.params.title;
if (title == "") navigateTo("/");

let dataList = ref<{ data: { titleFind: [] } | null }>({
	data: { titleFind: [] }
});
let error = ref<null | { message: string; status: number }>(null);

const titleFind = ref<
	{
		langName: string;
		codeBoxes: { title: string; code: string }[];
	}[]
>([]);
let empty = {
	langName: "",
	codeBoxes: []
};
onMounted(async function () {
	({ data: dataList, error } = await useGQLFetch<{ titleFind: [] }>(
		"http://localhost:3300/",
		`#graphql
			{
				titleFind(title: "${title}") {
					langName,
					codeBoxes {
						title, code
					}
				}
			}`
	));

	if (dataList.value.data == null) return;
	titleFind.value = dataList.value.data?.titleFind;
	console.log(dataList.value, error.value);
	setTimeout(function () {
		hljs.highlightAll();
	}, 100);
});
</script>

<template>
	<div v-if="error == null && titleFind.length == 0 && titleFind == null">
		<div id="loading"></div>
	</div>
	<div v-else-if="error">
		{{ error }}
	</div>
	<div class="flex flex-col justify-center my-10" v-else>
		<div class="flex justify-center">
			<div
				class="block p-5 border-4 border-b-0 border-l-0 shadow-lg border-sky-400 shadow-black rounded-xl"
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
		<div
			v-if="JSON.stringify(titleFind[0]) == JSON.stringify(empty)"
			class="my-10 text-3xl text-center text-red-500"
		>
			No Snippet found related to "{{ title }}"
		</div>
		<div v-else v-for="(langBox, index) in titleFind" :key="index">
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
