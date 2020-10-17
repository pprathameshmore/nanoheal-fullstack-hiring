const Container = require("typedi").Container;
const { GeneralError } = require("../utils/errors");
const ResultDAO = require("./result");

class SecurityService {
  async createScanResultReport({
    status,
    repositoryName,
    findings,
    queuedAt,
    scanningAt,
    finishedAt,
  }) {
    try {
      const resultSaved = await ResultDAO.createResult({
        status,
        repositoryName,
        findings,
        queuedAt,
        scanningAt,
        finishedAt,
      });
      if (!resultSaved)
        return { success: false, data: null, error: "Not saved" };
      return { success: true, data: resultSaved, error: null };
    } catch (error) {
      return new GeneralError(error);
    }
  }

  async getScanResultReport(id) {
    try {
      const scanResult = await ResultDAO.getResult(id);
      if (!scanResult)
        return { success: false, data: null, error: "Scan result not found" };
      return { success: true, data: scanResult, error: null };
    } catch (error) {
      return new GeneralError(error);
    }
  }

  async getScanResultReports() {
    try {
      const scanReports = await ResultDAO.getResults();
      return { success: true, data: scanReports, error: null };
    } catch (error) {
      return new GeneralError(error);
    }
  }
  async updateScanResultReport(id, updateResult) {
    try {
      const updatedResult = await ResultDAO.updateResult(id, updateResult);
      if (updatedResult instanceof GeneralError) {
        return { success: false, data: null, error: updatedResult };
      }
      return { success: true, data: updatedResult, error: null };
    } catch (error) {
      return new GeneralError(error);
    }
  }

  async deleteScanResult(id) {
    try {
      const deletedResults = await ResultDAO.removeResult(id);
      if (deletedResults instanceof GeneralError) {
        return { success: false, data: null, error: deletedResults };
      }
      return { success: true, data: deletedResults, error: null };
    } catch (error) {
      return new GeneralError(error);
    }
  }
}

module.exports = Container.get(SecurityService);
