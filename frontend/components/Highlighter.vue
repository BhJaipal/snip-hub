<script setup lang="ts">
import { Icon } from "#components";
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
	<div class="flex flex-col">
		<div
			v-if="state.alert"
			class="absolute top-0 bottom-0 left-0 right-0 z-50"
		>
			<template v-if="state.copySuccess">
				<UAlert
					color="green"
					icon="i-heroicons-check-20-solid"
					title="Code copied to clipboard"
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
		<div v-highlight class="highlighter mx-[3%]">
			<div class="w-full text-black">
				<div class="grid grid-cols-2">
					<div
						class="flex flex-row w-full mb-0 bg-gray-200 overflow-none circle-box"
					>
						<div class="mt-2 bg-red-500 rounded-full circle"></div>
						<div
							class="mt-2 bg-yellow-500 rounded-full circle"
						></div>
						<div
							class="mt-2 bg-green-500 rounded-full circle"
						></div>
					</div>
					<div class="w-full bg-gray-200">
						<button
							class="border-0 cursor-pointer copy-btn float-right"
							@click="copy(snipCode)"
							@blur="blur"
						>
							<i class="float-left bg-grey-200 copy-icon">
								<Icon :name="state.icon" />
							</i>
							<p class="bg-gray-200 copy-text">
								{{ state.text }}
							</p>
						</button>
					</div>
				</div>
			</div>
			<pre>
<code v-bind:class="langName">
{{ snipCode }}
</code>
    </pre>
		</div>
	</div>
</template>
<style scoped>
@media (min-width: 150px) {
	.circle-box {
		@apply h-4;
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
	span {
		@apply text-base;
	}
	.snip-title {
		font-size: 10px;
		line-height: 12px;
		@apply h-6 overflow-auto;
	}
	.copy-btn {
		font: medium;
		@apply w-[20vw] h-4 pt-[-20px];
	}
	.copy-btn i {
		font-size: 10px;
		line-height: 12px;
		@apply w-3 h-4 text-xs;
	}
	.copy-btn p {
		font-size: 10px;
		line-height: 12px;
		@apply pl-[1vw] h-4 pb-[1vh];
	}
}
@media (min-width: 300px) {
	.circle-box {
		@apply h-8;
	}
	span {
		font-size: 10px;
		line-height: 12px;
	}
	.circle {
		@apply w-4 h-4 mt-1.5;
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
		font-size: 10px;
		line-height: 12px;
		@apply w-full overflow-scroll h-min;
	}

	.highlighter > pre > code {
		@apply bg-slate-900 mt-0 pt-0;
	}
	.snip-title {
		font-size: medium;
		@apply h-6 overflow-auto mt-0;
	}
	.copy-btn {
		@apply w-[20vw] h-8;
	}
	.copy-btn i {
		@apply w-3 h-8 text-sm;
	}
	.copy-btn p {
		@apply pl-[1vw] h-8 text-lg pb-[2vh];
	}
}
@media (min-width: 600px) {
	.circle-box {
		@apply h-8;
	}
	.circle {
		@apply w-4 h-4 mt-2;
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
		@apply h-8;
	}
	.circle {
		@apply w-4 h-4 mt-2;
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
		@apply h-10;
	}
	.circle {
		@apply w-[18px] h-5 mt-2.5;
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
		@apply h-12;
	}
	.circle {
		@apply w-6 h-6 mt-3;
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
