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
}
export {};
