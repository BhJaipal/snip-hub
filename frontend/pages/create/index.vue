<script lang="ts">
import highlightjsVue from "@highlightjs/vue-plugin";

export default {
	components: {
		highlightjs: highlightjsVue.component
	}
};
</script>
<script setup lang="ts">
import hljs from "highlight.js";
import "highlight.js/styles/vs2015.css";

let useGQLFetch = useNuxtApp().$useGQLFetch as UseGQLFetch;
let iconFn = useNuxtApp().$icons as (lang: string) => string;
let langLabels = ref<Record<string, string>>({});

// How to use them?
// In pages/ or components/ or layouts/
// Nuxt Custom plugin use
// Nitro server api use
useAsyncData(async () => {
	// $fetch<data-type>("/api/file-path");
	let data = await $fetch<Record<string, string>>("/api/langLabels");
	langLabels.value = data;
});
let pairedVales: Record<string, string> = {
	"{": "}",
	'"': '"',
	"'": "'",
	"(": ")",
	"[": "]",
	"<": ">",
	"`": "`"
};
definePageMeta({
	layout: "default"
});

useHead({
	title: "Create Page"
});
let eKeyDefault = new KeyboardEvent("keydown", { key: "" });
const state = reactive({ sent: false, success: false });

let inputTitle = ref("");
let langSelect = ref("typescript");
let defaultSnip = ref(`let name: string = "Jaipal";`);

let snipAccordian = ref([
	{
		icon: iconFn(langSelect.value),
		label: langSelect.value,
		defaultOpen: true
	}
]);
let snipAccordian2 = ref([
	{
		label: inputTitle.value,
		defaultOpen: true
	}
]);
watch(snipAccordian, () => {
	console.log(snipAccordian.value);
});
async function sendDataBtn() {
	let data = await useGQLFetch<{
		id: string;
		message: string;
	}>(
		"http://localhost:3300/",
		`#graphql
			mutation ($codeSnip: snipBox!){
				snipAdd(codeSnip: $codeSnip) {
					id, message
				}
			}`,
		{
			codeSnip: {
				langName: langSelect.value,
				codeBox: {
					title: inputTitle.value,
					code: defaultSnip.value
				}
			}
		}
	);
	console.log(data);

	if (!data.data) {
		state.sent = true;
		state.success = false;
		if (data.error) alert(data.error.status + " " + data.error.message);
	} else {
		alert("Data sent successfully");
		state.sent = true;
		state.success = true;
		console.log(data.data);
	}
}

function selectValChange() {
	update();
}

hljs.highlightAll();
function getCursorPosition(textareaElement: HTMLTextAreaElement | null) {
	if (textareaElement == null) {
		return -1;
	}
	if (textareaElement.tagName.toLowerCase() !== "textarea") {
		return -1; // Not a textarea
	}
	return textareaElement.selectionStart;
}

function update(e = eKeyDefault) {
	let codeInput = document.querySelector<HTMLTextAreaElement>("#code-input");

	if (codeInput == null) return;
	if (e.key == "Tab") {
		e.preventDefault();
		let curPosition = getCursorPosition(codeInput);
		defaultSnip.value =
			defaultSnip.value.slice(0, curPosition) +
			"\t" +
			defaultSnip.value.slice(curPosition);
		if (codeInput.value == null) return;
	} else if (Object.keys(pairedVales).includes(e.key)) {
		e.preventDefault();
		let curPosition = getCursorPosition(codeInput);
		defaultSnip.value =
			defaultSnip.value.slice(0, curPosition) +
			e.key +
			pairedVales[e.key] +
			defaultSnip.value.slice(curPosition);
		if (codeInput.value == null) return;
	}
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
		<div class="flex justify-center my-5">
			<UButton @click="navigateTo('/')">Navigate to home</UButton>
		</div>
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
						v-for="(label, langname, index) in langLabels"
						:key="index"
					>
						<option
							:value="langname"
							:selected="langname == 'typescript'"
						>
							{{ label }}
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
		<div class="mt-5 text-black">
			<UAccordion :items="snipAccordian" size="xl">
				<template #default>
					<UButton color="emerald">
						<Icon :name="icons(langSelect)" />
						{{ langLabels[langSelect] }}
					</UButton>
				</template>
				<template #item>
					<UAccordion :items="snipAccordian2" size="xl">
						<template #default>
							<UButton
								:label="
									inputTitle == '' ? 'Untitled' : inputTitle
								"
								color="green"
								class="mx-[2.5%]"
							/>
						</template>
						<template #item>
							<div v-highlight class="highlighter px-[5%]">
								<div class="w-full text-black">
									<div
										class="flex flex-row w-full mb-0 bg-gray-200 overflow-none circle-box"
									>
										<div
											class="mt-2 bg-red-500 rounded-full circle"
										></div>
										<div
											class="mt-2 bg-yellow-500 rounded-full circle"
										></div>
										<div
											class="mt-2 bg-green-500 rounded-full circle"
										></div>
									</div>
								</div>
								<highlightjs
									:code="defaultSnip"
									:language="langSelect"
								/>
							</div>
						</template>
					</UAccordion>
				</template>
			</UAccordion>
		</div>
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
	.highlighter {
		@apply text-left flex flex-col justify-items-center;
	}

	.highlighter > pre {
		@apply w-full overflow-scroll text-xs pt-0 h-min;
	}

	.highlighter > pre > code {
		font-size: 10px;
		line-height: 12px;
		@apply bg-slate-800 text-xs pt-0 mt-0 h-full pb-2 pl-2;
	}
	.code-title {
		@apply ml-[5vw] w-[90vw] h-[5vh] my-[5vh] text-center;
	}
	.circle-box {
		@apply w-[90vw] h-4;
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
	.highlighter {
		@apply text-left;
	}

	.highlighter > pre {
		font-size: 10px;
		line-height: 12px;
		@apply w-full overflow-scroll h-min;
	}

	.highlighter > pre > code {
		@apply bg-slate-900 mt-0 pt-0;
	}
	.code-title {
		@apply ml-[5vw] w-[90vw] h-[5vh] my-[5vh] text-center;
	}
	.circle-box {
		@apply w-[90vw] h-6;
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
	.highlighter {
		@apply text-left;
	}

	.highlighter > pre {
		@apply text-lg overflow-scroll w-full pt-0 h-min;
	}

	.highlighter > pre > code {
		@apply bg-slate-900 pt-0 mt-0;
	}
	.code-title {
		@apply ml-[5vw] w-[90vw] h-[5vh] my-[5vh] text-center text-lg;
	}
	.circle-box {
		@apply w-[90vw] h-6;
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
	.highlighter {
		@apply text-left;
	}

	.highlighter > pre {
		@apply text-lg overflow-scroll w-full h-min pt-0;
	}

	.highlighter > pre > code {
		@apply bg-slate-900 mt-0 pt-0;
	}
	.code-title {
		@apply ml-[5vw] w-[90vw] h-[5vh] my-[5vh] text-center;
	}
	.circle-box {
		@apply w-[90vw] h-6;
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
		@apply w-[90vw] h-10;
	}
	p {
		@apply mt-5 mb-0 text-xl;
	}
	.highlighter {
		@apply text-left;
	}

	.highlighter > pre {
		@apply text-lg overflow-scroll pt-0 h-min;
	}

	.highlighter > pre > code {
		@apply bg-slate-900 mt-0 pt-0;
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
		@apply w-[90vw] h-10;
	}
	#code-input {
		@apply ml-[5vw] w-[90vw] h-[40vh] pl-2 text-white text-base;
	}
	p {
		@apply mt-5 mb-0 text-xl ml-[40vw] mr-0;
	}
	.highlighter {
		@apply text-left;
	}

	.highlighter > pre {
		@apply text-lg w-full overflow-scroll pt-0 h-min;
	}

	.highlighter > pre > code {
		@apply bg-slate-800 text-base mt-0 pt-0 h-full;
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
