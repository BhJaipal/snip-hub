import { ref } from "vue";
import { defineNuxtPlugin } from "#app/nuxt";

export async function useGQLFetch<
	T extends Record<string, any> = Record<string, any>
>(
	url: string,
	query: string,
	variables: Record<string, any> = {},
	auth: boolean = false
): GQLFetch<T> {
	let data = ref<T | null>(null);
	let header: Record<string, string> = auth
		? {
				authorization: `Bearer ` + useRuntimeConfig().githubApiToken,
				"Content-Type": "application/json"
			}
		: { "Content-Type": "application/json" };
	let error = ref<{ status: number; message: string } | null>(null);
	let res = await fetch(url, {
		method: "POST",
		headers: header,
		body: JSON.stringify(
			JSON.stringify(variables) == "{}"
				? { query }
				: {
						query: query,
						variables: variables
					}
		)
	});
	let out: { data: { [k: string]: T } } = await res.json();
	if (res.status >= 400 && !res.ok) {
		error.value = { status: res.status, message: res.statusText };
		data.value = null;
		return { data: null, error: error.value };
	}
	data = ref(out.data[Object.keys(out.data)[0]]);
	return { data: data.value as T | null, error: null };
}
export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.provide("useGQLFetch", useGQLFetch);
});
