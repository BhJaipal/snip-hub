import { defineNuxtPlugin } from "nuxt/app";
import { ref } from "vue";

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.provide("useCustomFetch", useCustomFetch);
});

export async function useCustomFetch(url: string, query: string) {
	let data = ref<{
		data: any;
		error?: object | null;
	}>({ data: {} });
	let error = ref<{ status: number; message: string } | null>(null);
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
	if (res.status >= 400 && !res.ok) {
		error.value = { status: res.status, message: out.message };
		return { data: data, error };
	}
	error.value = null;
	data.value = out;
	return { data: data, error };
}
