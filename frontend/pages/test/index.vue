<script lang="ts" setup>
import { Icon } from "#components";
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
	},
	{
		label: "Installation",
		icon: "i-heroicons-arrow-down-tray",
		disabled: true,
		content:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique placerat feugiat ac, facilisis vitae arcu. Proin eget egestas augue. Praesent ut sem nec arcu pellentesque aliquet. Duis dapibus diam vel metus tempus vulputate."
	},
	{
		label: "Theming",
		icon: "i-heroicons-eye-dropper",
		content:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique placerat feugiat ac, facilisis vitae arcu. Proin eget egestas augue. Praesent ut sem nec arcu pellentesque aliquet. Duis dapibus diam vel metus tempus vulputate."
	},
	{
		label: "Layouts",
		icon: "i-heroicons-rectangle-group",
		content:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique placerat feugiat ac, facilisis vitae arcu. Proin eget egestas augue. Praesent ut sem nec arcu pellentesque aliquet. Duis dapibus diam vel metus tempus vulputate."
	},
	{
		label: "Components",
		icon: "i-heroicons-square-3-stack-3d",
		content:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique placerat feugiat ac, facilisis vitae arcu. Proin eget egestas augue. Praesent ut sem nec arcu pellentesque aliquet. Duis dapibus diam vel metus tempus vulputate."
	},
	{
		label: "Utilities",
		icon: "i-heroicons-wrench-screwdriver",
		content:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique placerat feugiat ac, facilisis vitae arcu. Proin eget egestas augue. Praesent ut sem nec arcu pellentesque aliquet. Duis dapibus diam vel metus tempus vulputate."
	}
];
</script>

<template>
	<Icon name="material-symbols:done" />
	<Icon name="material-symbols:content-copy-outline-sharp" />
	<Icon name="material-symbols:search-rounded" />

	<UAccordian items="items" />
</template>
