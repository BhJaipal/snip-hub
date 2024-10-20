<script lang="ts" setup>
import { ref, onMounted } from "vue";
import "./../../app.css";
import hljs from "highlight.js";
import "highlight.js/styles/vs2015.css";
import type { AccordionItem } from "@nuxt/ui/dist/runtime/types";

let langNamesPrint = useNuxtApp().$langNamesPrint as (lang: string) => string;
let useGQLFetch = useNuxtApp().$useGQLFetch as UseGQLFetch;

let route = useRoute();
let title: string = route.params.title;
if (title.trim() == "") navigateTo("/");

let error = ref<null | { message: string; status: number }>(null);

const titleFind = ref<
	| {
			langName: string;
			codeBoxes: { title: string; code: string }[];
	  }[]
	| null
>([]);
let empty = {
	langName: "",
	codeBoxes: []
};
const nuxtApp = useNuxtApp();

let langListItems = computed<AccordionItem[]>(() => {
	let out: AccordionItem[] = [];
	if (titleFind.value == null) return [];
	for (let langName of titleFind.value) {
		out.push({
			label: langName.langName,
			content: langName.codeBoxes as unknown as string
		});
	}
	return out;
});

onMounted(async function () {
	let res = await fetch("http://localhost:3300/title-find/" + title);
	let out: {
		error: null | { message: string; status: number };
		titleFind: LangListType;
	} = await res.json();

	if (out.error) {
		error.value = out.error;
		return;
	} else {
		titleFind.value = out.titleFind;
	}

	setTimeout(function () {
		hljs.highlightAll();
	}, 100);
});
</script>

<template>
	<div v-if="error == null && titleFind?.length == 0 && titleFind == null">
		<div id="loading"></div>
	</div>
	<div v-else-if="error && titleFind == null">
		{{ error }}
	</div>
	<div class="flex flex-col justify-center my-10" v-else-if="titleFind">
		<div class="flex justify-center">
			<div
				class="block p-5 border-4 border-b-0 border-l-0 shadow-lg border-sky-400 shadow-black rounded-xl mb-10"
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
		<div v-else>
			<UAccordion :items="langListItems">
				<template #default="{ item, index, open }">
					<UButton
						color="blue"
						variant="ghost"
						class="mx-[3%] border-t border-gray-700"
						:ui="{
							rounded: 'rounded-none',
							padding: { sm: 'p-3' }
						}"
					>
						<span class="truncate"
							>{{ index + 1 }}.
							{{ langNamesPrint(item.label) }}</span
						>

						<template #trailing>
							<UIcon
								name="i-heroicons-chevron-right-20-solid"
								class="w-5 h-5 ms-auto transform transition-transform duration-200"
								:class="[open && 'rotate-90']"
							/>
						</template>
					</UButton>
				</template>
				<template #item="{ item: langBox }">
					<div class="mx-[3%]">
						<UAccordion :items="langBox.content">
							<template #default="{ item, index, open }">
								<UButton
									color="green"
									variant="ghost"
									class="border-t border-gray-700 mx-[3%]"
									:ui="{
										rounded: 'rounded-none',
										padding: { sm: 'p-3' }
									}"
								>
									<span class="truncate"
										>{{ index + 1 }}. {{ item.title }}</span
									>

									<template #trailing>
										<UIcon
											name="i-heroicons-chevron-right-20-solid"
											class="w-5 h-5 ms-auto transform transition-transform duration-200"
											:class="[open && 'rotate-90']"
										/>
									</template>
								</UButton>
							</template>
							<template #item="{ item }">
								<Highlighter
									:langName="langBox.langName"
									:snipTitle="item.title"
									:snipCode="item.code"
								/>
							</template>
						</UAccordion>
					</div>
				</template>
			</UAccordion>
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
