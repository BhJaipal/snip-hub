export type GQLFetch<T extends Record<string, any> = Record<string, any>> =
	Promise<{
		data: T | null;
		error: { status: number; message: string } | null;
	}>;
