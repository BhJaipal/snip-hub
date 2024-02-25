<script lang="ts" setup>
import { Icon } from "#components";
const { $apolloClient } = useNuxtApp();
import gql from "graphql-tag";
import UAccordian from "../../node_modules/@nuxt/ui/dist/runtime/components/elements/Accordion.vue";
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
let data = ref([]);
let loading = ref(false);
let error = ref({});
onMounted(async function () {
	({
		data: data.value,
		loading: loading.value,
		error: error.value
	} = await $apolloClient.query({
		query: query
	}));
	console.log(data.value, loading.value, error.value);
});
</script>

<template>
	<Icon name="material-symbols:done" />
	<Icon name="material-symbols:content-copy-outline-sharp" />
	<Icon name="material-symbols:search-rounded" />

	<UAccordian :items="items" />
</template>
