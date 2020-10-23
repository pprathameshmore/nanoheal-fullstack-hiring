const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLEnumType,
  GraphQLNonNull,
} = require("graphql");

const SeverityEnumType = new GraphQLEnumType({
  name: "SeverityStateEnum",
  values: {
    HIGH: {
      value: "HIGH",
    },
    MEDIUM: {
      value: "MEDIUM",
    },
    LOW: {
      value: "LOW",
    },
  },
});

const FindingsType = new GraphQLObjectType({
  name: "Finding",
  description: "Enter Findings",
  fields: {
    id: { type: GraphQLString },
    type: { type: GraphQLString },
    ruleId: { type: GraphQLString },
    location: {
      name: "Location",
      description: "Enter location",
      type: new GraphQLObjectType({
        name: "Path",
        fields: {
          path: { description: "Enter path", type: GraphQLString },
          positions: {
            name: "Position",
            description: "Enter position",
            type: new GraphQLObjectType({
              name: "Begin",
              description: "Enter begin",
              fields: {
                begin: {
                  type: new GraphQLObjectType({
                    name: "Line",
                    description: "Enter line",
                    fields: {
                      line: { type: GraphQLInt },
                    },
                  }),
                },
              },
            }),
          },
        },
      }),
    },
    metadata: {
      type: new GraphQLObjectType({
        name: "Metadata",
        description: "Enter metadata",
        fields: {
          description: { type: new GraphQLNonNull(GraphQLString) },
          severity: { type: new GraphQLNonNull(SeverityEnumType) },
        },
      }),
    },
  },
});

const ScanType = new GraphQLObjectType({
  name: "Security",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    status: { type: new GraphQLNonNull(GraphQLString) },
    repositoryName: { type: new GraphQLNonNull(GraphQLString) },
    findings: { type: new GraphQLNonNull(new GraphQLList(FindingsType)) },
    queuedAt: { type: GraphQLString },
    scanningAt: { type: GraphQLString },
    finishingAt: { type: GraphQLString },
  }),
});

module.exports = ScanType;
