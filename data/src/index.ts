import { buildSchema } from "graphql";
import { typeDefs } from "./schema.js"
import express from "express";
import { graphqlHTTP } from "express-graphql";
import { languages } from "./data.js";

let resolvers = {
  Query: {
    langList: () => {
      return languages;
    },
    js: () => {
      for(let i in languages) {
        let r= languages[i];
        if (r.langName === "javascript") {
          return r;
        }
      }
    }
  }
};

const app = express();

app.use("/", graphqlHTTP({
  schema: buildSchema(typeDefs),
  rootValue: resolvers,
  graphiql: true
}));

app.listen(3300, () => {
  console.log("server started at http://localhost:3300");
});
