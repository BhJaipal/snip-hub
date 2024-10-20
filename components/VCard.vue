<script lang="ts" setup>
import { UCard } from "#components";
let props = defineProps<{
	color?: string;
	title?: string;
	prependIcon?: string;
	appendIcon?: string;
	prependAvatar?: string;
	subtitle?: string;
	text?: string;
	loading?: boolean;
	class?: string;
}>();
let ui = reactive({
	background:
		"bg-" + (props.color != undefined ? props.color : "indigo") + "-950",
	header: {
		background:
			"bg-" + (props.color != undefined ? props.color : "indigo") + "-950"
	},
	body: {
		background:
			"bg-" + (props.color != undefined ? props.color : "indigo") + "-950"
	},
	footer: {
		background:
			"bg-" + (props.color != undefined ? props.color : "indigo") + "-950"
	}
});
</script>
<template>
	<UCard :ui="ui">
		<template #header>
			<template v-if="loading">
				<UProgress animation="carousel" />
			</template>
			<div class="flex flex-row">
				<div v-if="prependAvatar" class="mr-3 pt-3">
					<NuxtImg :src="prependAvatar" class="rounded-full w-10" />
				</div>
				<div v-else-if="prependIcon" class="mr-3 pt-3">
					<Icon :name="prependIcon" size="25" />
				</div>
				<div class="text-left">
					<h4>{{ title }}</h4>
					<p class="text-slate-400">{{ subtitle }}</p>
				</div>
				<div v-if="appendIcon" class="ml-3 pt-3">
					<Icon :name="appendIcon" size="25" />
				</div>
			</div>
		</template>
		<template v-if="$slots.body || text">
			<div v-if="$slots.body">
				<slot name="body" />
			</div>
			<div v-else-if="text">
				{{ text }}
			</div>
		</template>
		<template #footer v-if="$slots.actions">
			<slot name="actions" />
		</template>
	</UCard>
</template>