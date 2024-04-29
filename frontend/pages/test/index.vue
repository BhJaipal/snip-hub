<script lang="ts" setup>
import useMyState from "../../composables/states";
import { useGQLFetch } from "~/plugins/gql-fetch";
import UAccordian from "../../node_modules/@nuxt/ui/dist/runtime/components/elements/Accordion.vue";
import type { GQLFetch } from "types";
const isSlideOverOpen = ref(false);
const items: Array<{
	label: string;
	icon: string;
	content: string;
	defaultOpen?: boolean;
	disabled?: boolean;
}> = [
	{
		label: "Getting Started",
		icon: "i-heroicons-information-circle",
		defaultOpen: true,
		content:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique placerat feugiat ac, facilisis vitae arcu. Proin eget egestas augue. Praesent ut sem nec arcu pellentesque aliquet. Duis dapibus diam vel metus tempus vulputate."
	}
];
let counter = useMyState();

let query = `
	{
		langNames
	}
`;

let data = ref<string[] | null>([]);
let loading = ref(false);
let error = ref<null | { message: string; status: number }>(null);

onMounted(async function () {
	({ data: data.value, error: error.value } = await useGQLFetch<string[]>(
		"http://localhost:3300/",
		query
	)) as GQLFetch<string[]>;
	console.log(data.value, loading.value);
});
</script>

<template>
	<div class="grid grid-cols-3 justify-items-center my-3">
		<Icon name="material-symbols:done" />
		<Icon name="material-symbols:content-copy-outline-sharp" />
		<Icon name="material-symbols:search-rounded" />
	</div>

	<div class="flex justify-center">
		<UAccordian :items="items" class="w-1/2" />
	</div>
	<div class="flex justify-center mb-5">
		<UBadge variant="outline">Counter: {{ counter }}</UBadge>
	</div>

	<template v-if="error == null && data?.length == 0">
		<div class="loading"></div>
	</template>
	<template v-else-if="error">
		{{ error }}
	</template>
	<template v-else>
		<div class="flex justify-center">
			<UButton label="Open" @click="isSlideOverOpen = true" />

			<USlideover v-model="isSlideOverOpen">
				<UCard
					class="flex flex-col flex-1"
					:ui="{
						body: { base: 'flex-1' },
						ring: '',
						divide: 'divide-y divide-gray-100 dark:divide-gray-800'
					}"
				>
					<template #header>
						<Placeholder class="h-8">
							<UButton
								label="Lang Names"
								class="w-full text-center"
							/>
						</Placeholder>
					</template>

					<Placeholder class="h-full">
						<ul>
							<li v-for="(lang, index) in data" :key="index">
								<UBadge
									size="lg"
									color="green"
									variant="outline"
									class="ml-1 w-full my-2"
								>
									{{ lang }}
								</UBadge>
							</li>
						</ul>
					</Placeholder>

					<template #footer>
						<Placeholder class="h-8" />
					</template>
				</UCard>
			</USlideover>
		</div>
	</template>
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
