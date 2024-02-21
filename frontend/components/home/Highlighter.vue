<script setup lang="ts">
import { Icon } from "#components";
import { defineProps } from "vue";
import { UAlert } from "#components";

defineProps<{
	langName: string;
	snipTitle: string;
	snipCode: string;
}>();

const state = reactive({
	icon: "material-symbols:content-copy-outline-sharp",
	text: "copy",
	alert: false,
	copySuccess: false
});

function showAlert() {
	state.alert = state.alert ? false : true;
}

function copy(code: string) {
	navigator.clipboard
		.writeText(code)
		.then(function () {
			state.copySuccess = true;
		})
		.catch(() => {
			state.copySuccess = false;
		});
	showAlert();
	setTimeout(function () {
		showAlert();
		state.copySuccess = false;
	}, 3000);
	state.icon = "material-symbols:done";
	state.text = "copied";
}

function blur() {
	state.icon = "material-symbols:content-copy-outline-sharp";
	state.text = "copy";
}
</script>
<template>
	<div v-if="state.alert" class="absolute top-0 bottom-0 left-0 right-0 z-50">
		<template v-if="state.copySuccess">
			<UAlert
				color="green"
				title="success"
				description="Code copied to clipboard"
			/>
		</template>
		<template v-else>
			<UAlert
				color="red"
				title="Error"
				description="Could not copy code copied to clipboard"
			/>
		</template>
	</div>
	<div v-highlight class="highlighter">
		<div class="text-black">
			<div
				class="flex flex-row float-left mb-0 bg-gray-200 overflow-none circle-box"
			>
				<div class="mt-2 bg-red-500 rounded-full circle"></div>
				<div class="mt-2 bg-yellow-500 rounded-full circle"></div>
				<div class="mt-2 bg-green-500 rounded-full circle"></div>
				<h3 class="overflow-y-scroll text-center snip-title">
					{{ snipTitle }}
				</h3>
			</div>
			<button
				class="border-0 cursor-pointer copy-btn"
				@click="copy(snipCode)"
				@blur="blur"
			>
				<i class="float-left bg-grey-200 copy-icon">
					<Icon :name="state.icon" />
				</i>
				<p class="bg-gray-200 copy-text">{{ state.text }}</p>
			</button>
		</div>
		<pre>
      <code v-bind:class="langName">
{{ snipCode }}
      </code>
    </pre>
	</div>
</template>
<style scoped>
@media (min-width: 150px) {
	.circle-box {
		@apply ml-[5vw] h-4 w-[70vw];
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
	.highlighter {
		@apply text-left;
	}

	.highlighter > pre {
		@apply text-sm ml-[5vw] mb-4 pt-0 mt-[-10px] w-[90vw] overflow-scroll;
	}

	.highlighter > pre > code {
		@apply bg-slate-900 w-[90vw] pl-5 mt-[-20px];
	}
	.snip-title {
		@apply h-6 overflow-auto text-sm;
	}
	.copy-btn {
		font: medium;
		@apply w-[20vw] h-4 pt-[-20px];
	}
	.copy-btn i {
		@apply w-3 h-4 text-xs;
	}
	.copy-btn p {
		@apply pl-[1vw] h-4 pb-[1vh];
	}
}
@media (min-width: 300px) {
	.circle-box {
		@apply ml-[5vw] h-6 w-[70vw];
	}
	.circle {
		@apply w-3 h-3 mt-1.5;
	}
	.circle:first-child {
		@apply ml-2 mr-0.5;
	}
	.circle:nth-child(2) {
		@apply mx-0.5;
	}
	.circle:nth-child(3) {
		@apply ml-0.5 mr-3;
	}
	.highlighter {
		@apply text-left;
	}

	.highlighter > pre {
		@apply text-sm ml-[5vw] mb-4 pt-0 w-[90vw] overflow-scroll mt-0;
	}

	.highlighter > pre > code {
		@apply bg-slate-900 w-[90vw] pl-5 mt-[-20px];
	}
	.snip-title {
		font-size: medium;
		@apply h-6 overflow-auto mt-0;
	}
	.copy-btn {
		@apply w-[20vw] h-6;
	}
	.copy-btn i {
		@apply w-3 h-6 text-sm;
	}
	.copy-btn p {
		@apply pl-[1vw] h-6 text-lg pb-[2vh];
	}
}
@media (min-width: 600px) {
	.circle-box {
		@apply ml-[5vw] h-8 w-[80vw];
	}
	.circle {
		@apply w-4 h-4 mt-2;
	}
	.highlighter {
		@apply text-left;
	}

	.highlighter > pre {
		@apply text-lg mx-[5vw] mb-0 overflow-scroll w-[90vw];
	}

	.highlighter > pre > code {
		@apply bg-slate-900 mt-[-40px] w-[90vw];
	}
	.circle:first-child {
		@apply ml-4 mr-0.5;
	}
	.circle:nth-child(2) {
		@apply mx-0.5;
	}
	.circle:nth-child(3) {
		@apply ml-0.5 mr-3;
	}

	.snip-title {
		@apply h-12 overflow-auto text-2xl pt-1;
	}
	.copy-btn {
		@apply w-[10vw] h-8;
	}
	.copy-btn i {
		@apply h-8 text-lg;
	}
	.copy-btn p {
		@apply pl-[1vw] h-8;
	}
}
@media (min-width: 800px) {
	.circle-box {
		@apply ml-[5vw] h-8 w-[80vw];
	}
	.circle {
		@apply w-4 h-4 mt-2;
	}
	.highlighter {
		@apply text-left;
	}

	.highlighter > pre {
		@apply text-lg mx-[5vw] mb-0 overflow-scroll w-[90vw] h-auto;
	}

	.highlighter > pre > code {
		@apply bg-slate-900 mt-[-40px] w-[90vw];
	}
	.circle:first-child {
		@apply ml-4 mr-0.5;
	}
	.circle:nth-child(2) {
		@apply mx-0.5;
	}
	.circle:nth-child(3) {
		@apply ml-0.5 mr-3;
	}

	.snip-title {
		@apply h-12 overflow-hidden text-2xl pt-1;
	}
	.copy-btn {
		@apply w-[10vw] h-8 text-lg;
	}
	.copy-btn i {
		@apply h-8 text-lg;
	}
	.copy-btn p {
		@apply pl-[1vw] h-8;
	}
}
@media (min-width: 1100px) {
	.circle-box {
		@apply ml-20 h-10 w-[82vw];
	}
	.circle {
		@apply w-[18px] h-5 mt-2.5;
	}
	.highlighter {
		@apply text-left;
	}

	.highlighter > pre {
		@apply text-lg ml-20 mx-[2vw] mb-4 pt-0 w-[90vw] overflow-scroll mt-0;
	}

	.highlighter > pre > code {
		@apply bg-slate-900 pl-5 mt-[-30px] w-[90vw];
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

	.snip-title {
		@apply h-14 overflow-y-hidden text-2xl;
	}
	.copy-btn {
		@apply w-[8vw] h-10 text-xl;
	}
	.copy-btn i {
		@apply h-10 pt-2;
	}
	.copy-btn p {
		@apply pl-0 h-10 pt-2;
	}
}
@media (min-width: 1400px) {
	.circle-box {
		@apply ml-20 h-12 w-[84vw];
	}
	.circle {
		@apply w-6 h-6 mt-3;
	}
	.highlighter {
		@apply text-left;
	}

	.highlighter > pre {
		@apply text-lg ml-20 mx-[2vw] mb-4 pt-0 w-[90vw] overflow-scroll mt-0;
	}

	.highlighter > pre > code {
		@apply bg-slate-900 pl-5 mt-[-30px] w-[90vw];
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

	.snip-title {
		@apply h-14 overflow-y-hidden text-2xl;
	}
	.copy-btn {
		@apply w-[6vw] h-12;
	}
	.copy-btn i {
		@apply h-12 pt-2 text-2xl;
	}
	.copy-btn p {
		@apply pl-0 h-12 pt-2 text-2xl;
	}
}
</style>
