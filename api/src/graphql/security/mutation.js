const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInputObjectType,
  GraphQLList,
} = require("graphql");

const SecurityService = require("../../services/security");
const ScanType = require("./type");

const inputScanFinding = {
  type: new GraphQLList(
    new GraphQLInputObjectType({
      name: "InputFindings",
      description: "Enter findings",
      fields: {
        type: { type: GraphQLString },
        ruleId: { type: GraphQLString },
        location: {
          type: new GraphQLInputObjectType({
            name: "InputPath",
            description: "Enter path",
            fields: {
              path: { type: GraphQLString },
              positions: {
                name: "InputPosition",
                description: "Enter position",
                type: new GraphQLInputObjectType({
                  name: "InputBegin",
                  fields: {
                    begin: {
                      type: new GraphQLInputObjectType({
                        name: "InputLine",
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
          type: new GraphQLInputObjectType({
            name: "InputMetadata",
            description: "Enter metadata",
            fields: {
              description: { type: GraphQLString },
              severity: { type: GraphQLString },
            },
          }),
        },
      },
    })
  ),
};

const inputScanResult = {
  type: new GraphQLInputObjectType({
    name: "InputScanResult",
    description: "Enter a scan results",
    fields: {
      status: { type: GraphQLString },
      repositoryName: {
        description: "Enter a repository name",
        type: new GraphQLNonNull(GraphQLString),
      },
      findings: inputScanFinding,
      queuedAt: { type: GraphQLString },
      scanningAt: { type: GraphQLString },
      finishedAt: { type: GraphQLString },
    },
  }),
};

const ScanMutation = new GraphQLObjectType({
  name: "ScanMutation",
  description: "Create and update scan results",
  fields: {
    createScanResult: {
      description: "Create scan result",
      type: ScanType,
      args: {
        scanResult: inputScanResult,
      },
      resolve: async (parentValue, { scanResult }) => {
        const {
          success,
          data,
          error,
        } = await SecurityService.createScanResultReport(scanResult);
        return data;
      },
    },
    updateScanResult: {
      description: "Update scan result",
      type: ScanType,
      args: {
        id: { type: GraphQLString },
        scanResult: {
          type: new GraphQLInputObjectType({
            name: "UpdateScanResult",
            description: "Update scan result",
            fields: {
              status: { type: GraphQLString },
              repositoryName: {
                description: "Update repository name",
                type: new GraphQLNonNull(GraphQLString),
              },
              findings: {
                type: new GraphQLList(
                  new GraphQLInputObjectType({
                    name: "UpdateFindings",
                    description: "Update findings",
                    fields: {
                      type: { type: GraphQLString },
                      ruleId: { type: GraphQLString },
                      location: {
                        type: new GraphQLInputObjectType({
                          name: "UpdatePath",
                          description: "Update path",
                          fields: {
                            path: { type: GraphQLString },
                            positions: {
                              name: "UpdatePosition",
                              description: "Update position",
                              type: new GraphQLInputObjectType({
                                name: "UpdateBegin",
                                description: "Update begin",
                                fields: {
                                  begin: {
                                    type: new GraphQLInputObjectType({
                                      name: "UpdateLine",
                                      description: "Update line",
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
                        type: new GraphQLInputObjectType({
                          name: "UpdateMetadata",
                          description: "Update metadata",
                          fields: {
                            description: { type: GraphQLString },
                            severity: { type: GraphQLString },
                          },
                        }),
                      },
                    },
                  })
                ),
              },
              queuedAt: { type: GraphQLString },
              scanningAt: { type: GraphQLString },
              finishedAt: { type: GraphQLString },
            },
          }),
        },
      },
      resolve: async (parentValue, { id, scanResult }) => {
        const {
          success,
          data,
          error,
        } = await SecurityService.updateScanResultReport(id, scanResult);
        return data;
      },
    },
  },
});

module.exports = ScanMutation;
