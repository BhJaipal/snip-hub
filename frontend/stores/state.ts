import { defineStore } from "pinia";

type Infos = {
	name: string;
	description: string;
	github: string;
	npm: string;
	website: string;
};

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
