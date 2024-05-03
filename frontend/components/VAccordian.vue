
<script lang="ts" setup>
import { defineProps } from "vue";
import { AccordionItem } from "@nuxt/ui/dist/runtime/types";
let props = defineProps<{
	items: AccordionItem[];
	defaultOpen: boolean;
	openIcon: string;
	closeIcon: string;
	multiple: boolean;
	class: string;
}>();
let sizeRegex = /text-(sm|md|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)/;
let ui = reactive({
	wrapper: props.class,
	item: {
		size: "",
		color: "",
		padding: ""
	}
});
computed(() => {
	let size = props.class.match(sizeRegex);
	if (size != null) {
		size.forEach((s) => {
			ui.item.size += s;
			ui.item.size.trim();
		});
	}
});
</script>
<template>
	<UAccordion
		:items="items"
		:default-open="defaultOpen"
		:open-icon="openIcon"
		:close-icon="closeIcon"
		:multiple="multiple"
		:ui="ui"
		:class="props.class"
	/>
</template>