<script lang="ts" setup>
import type { AccordionItem } from "@nuxt/ui/dist/runtime/types";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";

let search = ref("");
let query = `#graphql
{
	langList {
		langName
		codeBoxes {
			title
			code
		}
	}
}
`;
let useGQLFetch = useNuxtApp().$useGQLFetch as UseGQLFetch;
let iconFn = useNuxtApp().$icons as (lang: string) => string;
let langNamesPrint = useNuxtApp().$langNamesPrint as (lang: string) => string;

let empty = [{ langName: "", codeBoxes: [] }];
let error = ref<null | { message: string; status: number }>(null);
let LangList = ref<LangListType | null>([]);

useHead({
	title: "Snip Hub Home Page"
});
function goto() {
	navigateTo("/search/" + search.value);
}

onMounted(async function () {
	let search = document.querySelector<HTMLInputElement>("#search");
	if (search == null) return;
	search.addEventListener("keydown", function (event) {
		event.key == "Enter" && goto();
	});

	({ data: LangList.value, error: error.value } =
		await useGQLFetch<LangListType>("http://localhost:3300/", query));

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
					v-model="search"
					@change="(e) => e.preventDefault()"
					class="search"
				/>
				<button
					class="appearance-none h-min"
					@click="goto"
					id="search-btn"
				>
					<i class="material-icons search-icon">search</i>
				</button>
			</div>
		</div>
		<div v-if="(LangList == null || LangList.length == 0) && error == null">
			<div id="loading"></div>
		</div>
		<div v-else-if="error">
			<div class="my-5 text-5xl font-bold text-center text-red-500">
				{{ error.status }}
			</div>
			<div class="my-5 text-3xl text-center text-red-500">
				{{ error.message }}
			</div>
		</div>
		<div v-else>
			<div v-if="LangList == null"></div>
			<div
				v-else-if="
					JSON.stringify(LangList[0]) == JSON.stringify(empty[0])
				"
			>
				<div class="my-10 text-3xl text-center text-red-500">
					No data
				</div>
			</div>
			<div v-else>
				<UAccordion :items="LangList as unknown as AccordionItem[]">
					<template #default="{ item, open }">
						<UButton
							color="blue"
							variant="ghost"
							class="border-t border-gray-700 mx-[3%]"
							:ui="{
								rounded: 'rounded-none',
								padding: { sm: 'p-3' }
							}"
						>
							<Icon :name="iconFn(item.langName)" size="20" />
							<span class="truncate">
								{{ langNamesPrint(item.langName) }}
							</span>

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
							<UAccordion :items="langBox.codeBoxes">
								<template #default="{ item, index, open }">
									<UButton
										color="green"
										variant="ghost"
										class="border border-gray-700 mx-[3%]"
										:ui="{
											rounded: 'rounded-none',
											padding: { sm: 'p-3' }
										}"
									>
										<span class="truncate"
											>{{ index + 1 }}.
											{{ item.title }}</span
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
