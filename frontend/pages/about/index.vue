<script setup lang="ts">
import { definePageMeta } from "#imports";
import tsLogo from "~/assets/ts-logo.png";
import vite from "~/assets/vite.png";
import vue from "~/assets/vue.png";

definePageMeta({
	layout: "default"
});

useHead({
	title: "About Page"
});
interface pageModule {
	name: string;
	link: string;
	img: string;
}

let homeList = ref<pageModule[]>([
	{
		name: "Highlight.js",
		link: "highlightjs.org",
		img: "https://highlightjs.org/icon.png"
	},
	{
		name: "Vue",
		link: "vuejs.org",
		img: vue
	},
	{
		name: "TypeScript",
		link: "typescriptlang.org",
		img: tsLogo
	},
	{
		name: "Vite",
		link: "vitejs.dev",
		img: vite
	},
	{
		name: "TailwindCSS",
		link: "tailwindcss.com",
		img: "https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
	},
	{
		name: "NuxtJS",
		link: "nuxt.com",
		img: "/favicon.ico"
	}
]);
let navigation = ref<{ name: string; href: string; active: boolean }[]>([
	{ name: "Home", href: "/", active: false },
	{ name: "About", href: "/about", active: true },
	{ name: "Create", href: "/create", active: false }
]);
</script>

<template>
	<div class="text-center">
		<h1>About Page</h1>

		<h2>Modules used for this project</h2>

		<ul>
			<li
				v-for="(module, index) in homeList"
				:key="index"
				class="flex justify-center my-2.5"
			>
				<ULink :href="module.link" target="_blank">
					<UCard :title="module.name">
						<template #header>
							<UButtonGroup>
								<NuxtImg :src="module.img" class="w-10" />
								<UBadge
									class="ml-10"
									color="yellow"
									variant="outline"
									size="lg"
									>Name: {{ module.name }}</UBadge
								>
							</UButtonGroup>
						</template>
					</UCard>
				</ULink>
			</li>
		</ul>
	</div>
</template>

