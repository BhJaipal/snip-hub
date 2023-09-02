import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const server= new ApolloServer({
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 3300 }
});

console.log("server started at http://localhost:3300");

