import { ref } from "vue";

type GQLFetch = Promise<{
	data: Record<string, any> | null;
	error: { status: number; message: string } | null;
}>;
export async function useGQLFetch<
	T extends Record<string, Record<string, any>> = Record<
		string,
		Record<string, any>
	>
>(url: string, query: string, variables: object | null = null): GQLFetch {
	let data = ref<Record<string, any> | null>(null);
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
	let out: { data: T } = await res.json();
	if (res.status >= 400 && !res.ok) {
		error.value = { status: res.status, message: res.statusText };
		data.value = null;
		return { data: null, error: error.value };
	}
	let key = Object.keys(out.data)[0];
	console.log(key, out.data[key]);
	data = ref(out.data[key]);
	return { data: data.value, error: null };
}
export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.provide("useGQLFetch", useGQLFetch);
});
