<script setup lang="ts">
import highlightjs from "~/assets/highlightjs.png";
import vue from "~/assets/vue.png";
import nitro from "~/assets/nitro.svg";
import tsLogo from "~/assets/ts-logo.png";
import tailwind from "~/assets/tailwind.svg";
import nuxt from "/favicon.ico";

let logos = [highlightjs, vue, tsLogo, tailwind, nuxt, nitro];

let myInfo = ref<MyInfoFromGit | null>(null);

let homeList = ref<PageModule[]>([]);
useAsyncData(async () => {
	let data = await $fetch<Omit<PageModule, "img">[]>("/api/about");

	data.forEach((module, index) => {
		homeList.value.push({ ...module, img: logos[index] });
	});
	let data2 = await $fetch<
		Record<string, Record<string, Record<string, any>>>
	>("/api/my-info");
	myInfo.value = (data2 as unknown as MyInfoFromGit) ?? null;
	console.log(data2);
});

useHead({
	title: "About Page"
});
</script>

<template>
	<div class="text-center">
		<page-header
			title="About Page"
			description="Modules used for this project"
		/>

		<ul class="grid grid-cols-2 justify-items-center">
			<li
				v-for="(module, index) in homeList"
				:key="index"
				class="my-2.5 max-w-[50%] flex justify-center"
			>
				<UCard :title="module.name">
					<template #header>
						<UButtonGroup>
							<img :src="module.img" class="w-10 mr-5" />
							<UBadge
								class="ml-10"
								color="yellow"
								variant="outline"
								size="lg"
								>Name: {{ module.name }}</UBadge
							>
						</UButtonGroup>
					</template>
					<p class="text-left text-sm text-slate-400 break-words">
						<span class="text-green-500 font-bold"> Title: </span>
						{{ module.title }} <br />
						<span class="text-green-500 font-bold">
							Description:
						</span>
						{{ module.description ?? "" }}<br />
						<span class="text-sky-500 font-bold"> Website:</span>
						<UButton
							variant="link"
							:to="'https://' + module.link"
							target="_blank"
							color="blue"
							>{{ module.link }}</UButton
						>
					</p>
				</UCard>
			</li>
		</ul>
		<hr class="border-gray-700" />
		<page-header description="About Me" />
		<div
			class="flex justify-center mt-5 flex-col justify-items-center items-center"
		>
			<template v-if="myInfo != null">
				<v-card
					:title="myInfo.name"
					:subtitle="myInfo.login"
					:prepend-avatar="myInfo.avatarUrl"
					:text="myInfo.bio"
				>
				</v-card>
				<br />
				<div class="my-5 grid grid-cols-2 gap-10">
					<div v-for="(repo, i) in myInfo.pinnedItems.nodes" :key="i">
						<v-card :title="repo.name" :text="repo.description" />
					</div>
				</div>
			</template>
		</div>
	</div>
</template>

