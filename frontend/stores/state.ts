// How to use stores in Nuxt
// First install pinia module and import defineStore
import { defineStore } from "pinia";
// How to create a store with this?

type Infos = {
	name: string;
	description: string;
	github: string;
	npm: string;
	website: string;
};
// Example:
export const useWebsiteStore = defineStore("websiteStore", {
	state: () => ({
		data: {
			name: "",
			description: "",
			website: "",
			npm: "",
			github: ""
		}
	}),
	actions: {
		async fetch() {
			const infos = await $fetch<Infos>(
				"https://api.nuxt.com/modules/pinia"
			);
			this.data.name = infos.name;
			this.data.description = infos.description;
			this.data.website = infos.website;
			this.data.github = infos.github;
			this.data.npm = infos.npm;
		}
	}
});
