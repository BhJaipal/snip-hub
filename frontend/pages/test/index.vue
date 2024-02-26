<script lang="ts" setup>
import { Icon } from "#components";
import gql from "graphql-tag";
import UAccordian from "../../node_modules/@nuxt/ui/dist/runtime/components/elements/Accordion.vue";
import { ApolloClient, InMemoryCache } from "@apollo/client";
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

let query = gql`
	{
		langNames
	}
`;
let data = reactive({ data: { langNames: [] } });
let loading = ref(false);
let error = ref(null);
let apolloClient = new ApolloClient({
	uri: "http://localhost:3300/",
	cache: new InMemoryCache()
});
onMounted(async function () {
	({
		data: data.data,
		loading: loading.value,
		error: error.value
	} = await apolloClient.query({
		query: query
	}));
	console.log(data.data, loading.value);
});
</script>

<template>
	<Icon name="material-symbols:done" />
	<Icon name="material-symbols:content-copy-outline-sharp" />
	<Icon name="material-symbols:search-rounded" />

	<UAccordian :items="items" />
	<template v-if="loading">
		<div class="loading"></div>
	</template>
	<template v-else-if="error">
		{{ error }}
	</template>
	<template v-else>
		<h1>LangNames</h1>
		<ul>
			<li v-for="(lang, index) in data.data.langNames" :key="index">
				{{ lang }}
			</li>
		</ul>
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
