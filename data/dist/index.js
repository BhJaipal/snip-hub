import { typeDefs } from "./schema.js";
import { languages } from "./data.js";

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import chalk from "chalk";

let resolvers = {
    Query: {
        langList: () => languages,
        langFind: (_, args) => {
            return languages.filter(
                langBox => (
                (langBox.id === args.id))
            );
        }
    }
};
let server= new ApolloServer({
    typeDefs,
    resolvers
});

let { url }= await startStandaloneServer(server, {
    listen: { port: 3300 }
});
console.log("server started at "+ chalk.hex("#40A0F0").underline(url));
