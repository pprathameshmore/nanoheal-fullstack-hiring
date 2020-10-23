const { GraphQLObjectType, GraphQLString, GraphQLList } = require("graphql");

const ScanType = require("./type");
const SecurityService = require("../../services/security");

const ScanQuery = new GraphQLObjectType({
  name: "ScanQuery",
  description: "Get Scan Results",
  fields: {
    getScanResults: {
      description: "Get all scan results",
      type: new GraphQLList(ScanType),
      resolve: async () => {
        const { data } = await SecurityService.getScanResultReports();
        return data;
      },
    },
    getScanResult: {
      description: "Get a scan result",
      type: ScanType,
      args: {
        scanResultId: {
          description: "Enter scan result ID",
          type: GraphQLString,
        },
      },
      resolve: async (parentValue, { scanResultId }) => {
        const { data } = await SecurityService.getScanResultReport(
          scanResultId
        );
        return data;
      },
    },
    deleteScanResult: {
      description: "Delete a scan result",
      type: ScanType,
      args: {
        scanResultId: {
          description: "Enter scan result ID",
          type: GraphQLString,
        },
      },
      resolve: async (parentValue, { scanResultId }) => {
        const { data } = await SecurityService.deleteScanResult(scanResultId);
        return data;
      },
    },
  },
});

module.exports = ScanQuery;
