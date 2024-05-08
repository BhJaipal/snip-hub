declare global {
	type GQLFetch<T extends Record<string, any> = Record<string, any>> =
		Promise<{
			data: T | null;
			error: { status: number; message: string } | null;
		}>;
	interface PageModule {
		name: string;
		link: string;
		img: string;
		description: string;
		title: string;
	}
	type LangListType = Array<{
		langName: string;
		codeBoxes: { title: string; code: string }[];
	}>;
	type ArrayOrRecord = Record<string, any> | Array<any>;
	type UseGQLFetch = <T extends ArrayOrRecord = ArrayOrRecord>(
		url: string,
		query: string,
		variables: Record<string, any> = {},
		auth: boolean = false
	) => GQLFetch<T>;
}
export {};
