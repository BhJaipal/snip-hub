<script setup lang="ts">
import hljs from "highlight.js";
import "../vs-dark.css";

definePageMeta({
	layout: "default"
});

useHead({
	title: "Create Page"
});

const state = reactive({ sent: false, success: false });

let langNames = ref<Array<string>>([]);
onMounted(async () => {
	let res = await fetch("http://localhost:3300", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json"
		},
		body: JSON.stringify({
			query: `query { langNames }`
		})
	});
	let data = await res.json();
	langNames.value = data.data.langNames;
});

let inputTitle = ref("");
let langSelect = ref("");
let defaultSnip = ref('"Hello World"');

async function sendDataBtn() {
	let res = await fetch("http://localhost:3300/", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json"
		},
		body: JSON.stringify({
			query: `#graphql
			mutation ($codeSnip: snipBox!){
				snipAdd(codeSnip: $codeSnip) {
					id, message
				}
			}`,
			variables: {
				codeSnip: {
					langName: langSelect.value,
					codeBox: {
						title: inputTitle.value,
						code: defaultSnip.value
					}
				}
			}
		})
	});
	/**
	 * @type { {errors: Object} | {data: Object} }
	 */
	let data = await res.json();
	if (!data.data) {
		state.sent = true;
		state.success = false;
		alert(data.errors.title + " " + data.errors.message);
	} else {
		alert("Data sent successfully");
		state.sent = true;
		state.success = true;
		console.log(data.data);
	}
}

function selectValChange() {
	document.getElementById("pre-tag")!.className =
		langSelect.value + " bg-slate-800 mt-[52px] pt-0";
	update();
	hljs.highlightAll();
}

hljs.highlightAll();

function update() {
	document.getElementById("preview")!.innerText = defaultSnip.value;
	document
		.getElementById("pre-tag")!
		.classList.remove("language-" + langSelect.value);
	document.getElementById("pre-tag")!.className =
		langSelect.value + " bg-slate-800 mt-[52px] pt-0";
	hljs.highlightAll();
}
</script>

<template>
	<template v-if="state.sent">
		<template v-if="state.success">
			<UAlert color="green" title="Data sent successfully" />
		</template>
		<template v-else>
			<UAlert color="red" title="Error, Check console" />
		</template>
	</template>
	<h1>Create Page</h1>
	<form @submit.prevent="sendDataBtn">
		<div class="flex flex-row h-6 text-center select-container flex-nowrap">
			<div class="">Select a language</div>
			<div class="w-20">
				<select
					data-title="Select a language"
					name="lang-select"
					v-model="langSelect"
					@change="selectValChange"
					required
					class="text-white bg-slate-800"
				>
					<template
						v-for="(langname, index) in langNames"
						:key="index"
					>
						<option :value="langname">
							{{ langname }}
						</option>
					</template>
				</select>
				<br />
			</div>
		</div>

		<input
			class="text-white rounded-lg bg-slate-800 code-title"
			placeholder="Enter title"
			v-model="inputTitle"
			required
		/>

		<textarea
			id="code-input"
			v-model="defaultSnip"
			class="rounded-lg bg-slate-800"
			placeholder="enter code here"
			autocapitalize="off"
			v-on:keydown="update"
			required
		></textarea>
		<div class="mt-2 text-black">
			<div
				class="flex flex-row float-left mb-0 bg-gray-200 overflow-none circle-box"
			>
				<div class="mt-2 bg-red-500 rounded-full circle"></div>
				<div class="mt-2 bg-yellow-500 rounded-full circle"></div>
				<div class="mt-2 bg-green-500 rounded-full circle"></div>
				<div class="overflow-y-scroll snip-title">{{ inputTitle }}</div>
			</div>
		</div>

		<pre
			id="pre-tag"
			class="javascript bg-slate-800 mt-[52px] pt-0"
		><code id="preview" class="overflow-y-scroll">{{ defaultSnip }}</code></pre>

		<button
			type="submit"
			id="send-data"
			class="hover:bg-blue-800 bg-sky-700"
		>
			Submit
		</button>
	</form>
</template>

<style scoped>
@media (min-width: 150px) {
	h1 {
		@apply text-center;
	}
	code {
		margin-top: -20px;
	}
	pre {
		@apply pt-[5vh] mt-0 text-lg pl-1 h-36 w-[90vw] ml-[5vw] mr-[5vw] overflow-scroll;
	}
	.code-title {
		@apply ml-[5vw] w-[90vw] h-[5vh] my-[5vh] text-center;
	}
	.circle-box {
		@apply w-[90vw] h-4 ml-[5vw];
	}
	#code-input {
		font-size: 15px;
		@apply ml-[5vw] w-[90vw] h-[40vh] pl-2 text-white;
	}
	.circle {
		@apply w-2 h-2 mt-1;
	}
	.circle:first-child {
		@apply ml-2;
	}
	.circle:nth-child(2) {
		@apply mx-[2px];
	}
	.circle:nth-child(3) {
		@apply mr-3;
	}
	#send-data {
		@apply w-[28vw] my-2 ml-[36vw] h-7 text-white font-bold;
	}
	.select-container {
		@apply mt-2.5;
	}
	.select-container div:first-child {
		@apply mr-1 ml-[15vw];
	}
}
@media (min-width: 300px) {
	h1 {
		@apply text-center;
	}
	code {
		margin-top: -20px;
	}
	pre {
		@apply pt-[5vh] mt-0 text-lg pl-1 h-36 w-[90vw] ml-[5vw] mr-[5vw] overflow-scroll;
	}
	.code-title {
		@apply ml-[5vw] w-[90vw] h-[5vh] my-[5vh] text-center;
	}
	.circle-box {
		@apply w-[90vw] h-6 ml-[5vw];
	}
	#code-input {
		@apply ml-[5vw] w-[90vw] h-[40vh] pl-2 text-white text-sm;
	}
	.circle {
		@apply w-3 h-3 mt-1.5;
	}
	.circle:first-child {
		@apply ml-2;
	}
	.circle:nth-child(2) {
		@apply mx-[2px];
	}
	.circle:nth-child(3) {
		@apply mr-3;
	}
	#send-data {
		@apply w-[24vw] my-3 ml-[38vw] h-10 text-white text-lg;
	}
	.select-container {
		@apply mt-3;
	}
	.select-container div:first-child {
		@apply mr-1 ml-[25vw];
	}
}
@media (min-width: 600px) {
	h1 {
		@apply text-center;
	}
	code {
		margin-top: -20px;
	}
	pre {
		@apply pt-[5vh] mt-0 text-lg pl-1 h-36 w-[90vw] ml-[5vw] mr-[5vw] overflow-scroll;
	}
	.code-title {
		@apply ml-[5vw] w-[90vw] h-[5vh] my-[5vh] text-center text-lg;
	}
	.circle-box {
		@apply w-[90vw] h-6 ml-[5vw];
	}
	#code-input {
		@apply ml-[5vw] w-[90vw] h-[40vh] pl-2 text-white;
	}
	.circle {
		@apply w-3 h-3 mt-1.5 text-xl;
	}
	.circle:first-child {
		@apply ml-2;
	}
	.circle:nth-child(2) {
		@apply mx-[2px];
	}
	.circle:nth-child(3) {
		@apply mr-3;
	}
	#send-data {
		@apply w-[20vw] mt-4 mb-6 ml-[40vw] h-[10vh] text-xl font-bold;
	}
	.select-container {
		@apply mt-4;
	}
	.select-container div:first-child {
		@apply mr-1 ml-[30vw];
	}
}
@media (min-width: 800px) {
	h1 {
		@apply text-center;
	}
	code {
		margin-top: -20px;
	}
	pre {
		@apply pt-[5vh] mt-0 text-lg pl-1 h-36 w-[90vw] ml-[5vw] mr-[5vw] overflow-scroll;
	}
	.code-title {
		@apply ml-[5vw] w-[90vw] h-[5vh] my-[5vh] text-center;
	}
	.circle-box {
		@apply w-[90vw] h-6 ml-[5vw];
	}
	#code-input {
		@apply ml-[5vw] w-[90vw] h-[40vh] pl-2 text-white;
	}
	.circle {
		@apply w-3 h-3 mt-1.5;
	}
	.circle:first-child {
		@apply ml-2;
	}
	.circle:nth-child(2) {
		@apply mx-[2px];
	}
	.circle:nth-child(3) {
		@apply mr-3;
	}
	#send-data {
		@apply w-[16vw] mt-2 ml-[42vw] h-10;
	}
	.select-container {
		@apply mt-4;
	}
	.select-container div:first-child {
		@apply mr-1 ml-[35vw];
	}
}
@media (min-width: 1100px) {
	.circle-box {
		@apply w-[90vw] h-10 ml-[5vw];
	}
	.snip-title {
		@apply text-2xl font-bold pl-[25vw];
	}
	p {
		@apply mt-5 mb-0 text-xl;
	}
	pre {
		@apply pt-[5vh] mt-0 text-lg pl-1 h-80 w-[90vw];
	}
	code {
		@apply text-lg;
	}
	span {
		@apply text-lg;
	}
	#send-data {
		@apply w-[10vw] mt-[1vh] h-[8vh] ml-[47.5vw] text-lg mb-5;
	}
	.circle {
		@apply w-5 h-5 mt-2.5;
	}
	.circle:first-child {
		@apply ml-2 mr-2;
	}
	.circle:nth-child(2) {
		@apply mx-2;
	}
	.circle:nth-child(3) {
		@apply ml-2 mr-12;
	}
	.select-container {
		@apply mt-5;
	}
	.select-container div:first-child {
		@apply mr-1 ml-[40vw];
	}
}
@media (min-width: 1400px) {
	* {
		@apply text-base;
	}
	.circle-box {
		@apply w-[90vw] h-10 ml-[5vw];
	}
	#code-input {
		@apply ml-[5vw] w-[90vw] h-[40vh] pl-2 text-white text-base;
	}
	.snip-title {
		@apply text-2xl font-bold pl-[35vw];
	}
	p {
		@apply mt-5 mb-0 text-xl ml-[40vw] mr-0;
	}
	pre {
		@apply pt-[3vh] mt-0 pl-1 h-80 w-[90vw] text-base;
	}
	code {
		@apply h-80 w-[90vw] text-base;
	}
	span {
		@apply text-base;
	}
	#send-data {
		@apply w-[6vw] mt-[3vh] h-[8vh] ml-[47vw] text-lg mb-5;
	}
	.circle {
		@apply w-6 h-6 mt-2.5;
	}
	.circle:first-child {
		@apply ml-2 mr-2;
	}
	.circle:nth-child(2) {
		@apply mx-2;
	}
	.circle:nth-child(3) {
		@apply ml-2 mr-12;
	}
	.select-container {
		@apply mt-5;
	}
	.select-container div:first-child {
		@apply mr-1 ml-[40vw];
	}
	h1 {
		@apply text-6xl font-bold;
	}
}
</style>
