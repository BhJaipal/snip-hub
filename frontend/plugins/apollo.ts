import { ApolloClient, InMemoryCache } from "@apollo/client";

export default defineNuxtPlugin(() => {
	const apolloClient = new ApolloClient({
		uri: "https://rickandmortyapi.com/graphql",
		cache: new InMemoryCache()
	});
	return {
		provide: {
			apolloClient
		}
	};
});
