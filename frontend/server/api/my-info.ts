import { useGQLFetch } from "~/plugins/gql-fetch";

export default defineEventHandler(async () => {
	let { data } = await useGQLFetch<{ data: { viewer: any } }>(
		"https://api.github.com/graphql",
		`
{
	viewer {
		login
		name
		avatarUrl
		pinnedItems(first: 10) {
			totalCount
			nodes {
				...repo
			}
		}
		bio
	}
}
fragment repo on Repository {
	name
	description
}
    `,
		{},
		true
	);
	return data;
});
