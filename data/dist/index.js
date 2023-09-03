import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema.js";
import { languages } from "./data.js";
let resolvers = {
    Query: {
        languages() {
            return languages;
        }
    }
};
const server = new ApolloServer({
    typeDefs,
    resolvers
});
const { url } = await startStandaloneServer(server, {
    listen: { port: 3300 }
});
console.log("server started at http://localhost:3300");
