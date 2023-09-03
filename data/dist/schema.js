export const typeDefs = `#graphql
type CodeBox{
  title: String!
  code: String!
}
type lang{
  langName: String!
  codeBoxes: [CodeBox]!
}
type Query{
  languages: [lang!]!
}
`;
