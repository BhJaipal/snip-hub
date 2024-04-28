import { ref } from "vue";

type GQLFetch<T extends Record<string, any> = Record<string, any>> = Promise<{
	data: T | null;
	error: { status: number; message: string } | null;
}>;
export async function useGQLFetch<
	T extends Record<string, any> = Record<string, any>
>(
	url: string,
	query: string,
	variables: Record<string, any> | null = null
): GQLFetch<T> {
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
