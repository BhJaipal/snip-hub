import { defineNuxtPlugin } from "nuxt/app";
import { ref } from "vue";

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.provide("useCustomFetch", useCustomFetch);
});

export async function useCustomFetch(url: string, query: string) {
	let data = ref<{
		data: any;
		error?: object | null;
	}>({ data: [] });
	let error = ref(null);
	let res = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			query: query
		})
	});
	let out = await res.json();
	error.value =
		out.error == undefined || out.error == null ? null : out.error;
	data.value = out;
	return { data: data, error };
}
