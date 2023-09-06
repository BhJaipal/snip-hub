export const typeDefs = `#graphql
type CodeBox{
  title: String!
  code: String!
}
type lang{
  id: ID!
  langName: String!
  codeBoxes: [CodeBox]!
}
type Query{
  langList: [lang!]
  langFind(langName: String!): lang!
}`;
