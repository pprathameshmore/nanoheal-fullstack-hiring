const { GraphQLSchema } = require("graphql");
const ScanMutation = require("./security/mutation");
const ScanQuery = require("./security/query");

module.exports = new GraphQLSchema({
  query: ScanQuery,
  mutation: ScanMutation,
});
