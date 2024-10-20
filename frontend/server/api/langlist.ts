let query = `{
	langList {
		langName
		codeBoxes {
			title
			code
		}
	}
}`;

export default defineEventHandler(async () => {
	let res = await fetch("https://localhost:3300/", {
		method: "POST",
		mode: "no-cors",
		headers: {
			"content-type": "application/json"
		},
		body: JSON.stringify({ query })
	});
	let out: {
		data: LangListType[] | null;
		error: null | { status: number; message: string };
	} = await res.json();
	if (out.error) {
		return { data: out.data, error: out.error };
	}

	return { data: out.data, error: out.error };
});
