import { defineNuxtPlugin } from "nuxt/app";
import { ref, UnwrapRef } from "vue";

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.provide("useCustomFetch", useGQLFetch);
});

export async function useGQLFetch<T>(
	url: string,
	query: string,
	variables: object | null = null
) {
	let data = ref<T | null>(null);
	let error = ref<{ status: number; message: string } | null>(null);
	let res = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(
			variables == null
				? { query }
				: {
						query: query,
						variables: variables
					}
		)
	});
	let out: { data: UnwrapRef<T> } = await res.json();
	if (res.status >= 400 && !res.ok) {
		error.value = { status: res.status, message: res.statusText };
		return { data: null, error };
	}
	error.value = null;
	data.value = out.data;
	return { data: out.data, error };
}
