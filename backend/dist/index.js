import { typeDefs } from "./schema.js";
import chalk from "chalk";
import { readFileSync, writeFileSync } from "fs";
// with express 
// import express from "express";
// import { graphqlHTTP } from "express-graphql";

// apollo server
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
// import {  buildSchema, graphql } from "graphql";

let resolvers = {
    Query: {
        langList: ()=> {
            let read= readFileSync("dist/data.json", {
                encoding: "utf8",
                flag: "r"
            });
            let data= JSON.parse(read);
            return data.languages;
        },
        langFind: (_, args) => {
            let read= readFileSync("dist/data.json", {
                encoding: "utf8", flag: "r"
            });
            let data= JSON.parse(read);
            return data.languages.filter(
                langBox => (
                (langBox.langName === args.langName))
            )[0];
        }
    },
    Mutation: {
        snipAdd: (_, args) => {
            let read= readFileSync("dist/data.json", {
                encoding: "utf8",
                flags: "r"
            });
            let data= JSON.parse(read);
            let languages= data.languages;
            let find= false;
            let arg= args.codeSnip;
            for (let i in languages.length) {
                if (arg.langName=== languages[i].langName) {
                    languages[i].codeBoxes.push({
                        title: arg.codeBox.title,
                        code: arg.codeBox.code
                    });
                    find = true;
                    break;
                }
            }
            if (!find) {
                languages.push({
                    id: languages.length,
                    langName: arg.langName,
                    codeBoxes: [{
                        title: arg.codeBox.title,
                        code: arg.codeBox.code
                    }]
                });
            } else {}
            writeFileSync("dist/data.json", 
                JSON.stringify({
                "languages": languages
            }));
            return languages;
        }
    }
};
// with apollo

let server= new ApolloServer({
    typeDefs,
    resolvers
});

let { url }= await startStandaloneServer(server, {
    listen: { port: 3300 }
});

// with express 
/* let schema= buildSchema(typeDefs);

const app= express();
app.get("/",
    graphqlHTTP({
        schema,
        rootValue: resolvers,
        graphiql: true
    })
);

app.listen(3300);
*/
console.log("server started at "+ chalk.hex("#40A0F0").underline("http://localhost:3300/"));
