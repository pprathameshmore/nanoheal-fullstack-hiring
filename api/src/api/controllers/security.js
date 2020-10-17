const { isValidObjectId } = require("mongoose");
const SecurityService = require("../../services/security");
const { GeneralError } = require("../../utils/errors");
const { isDefObject, response, isDefVar } = require("../../utils/utils");

const getScanResult = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id))
      return res.status(400).json(response(400, "ID is not valid", null));
    const { success, data, error } = await SecurityService.getScanResultReport(
      id
    );
    if (!success) return res.status(404).json(response(404, error, null));
    return res.status(200).json(response(200, "Scan result", data));
  } catch (error) {
    return new GeneralError(error);
  }
};

const getScanResults = async (req, res, next) => {
  try {
    const {
      success,
      data,
      error,
    } = await SecurityService.getScanResultReports();
    return res.status(200).json(response(200, "All scan results", data));
  } catch (error) {
    return new GeneralError(error);
  }
};

const createScanResult = async (req, res, next) => {
  try {
    const {
      status,
      repositoryName,
      findings,
      queuedAt,
      scanningAt,
      finishedAt,
    } = req.body;

    if (!isDefObject(req.body))
      return res.status(400).json(response(400, "Fields required", null));

    if (
      !isDefVar(status) ||
      !isDefVar(repositoryName) ||
      !isDefVar(findings) ||
      !isDefVar(queuedAt) ||
      !isDefVar(scanningAt) ||
      !isDefVar(finishedAt)
    ) {
      return res
        .status(400)
        .json(response(400, "Missing Fields required", null));
    }

    const {
      success,
      data,
      error,
    } = await SecurityService.createScanResultReport(req.body);

    if (!success) return res.status(400).json(response(400, error, null));

    return res.status(201).json(response(201, "Scan result created", data));
  } catch (error) {
    return new GeneralError(error);
  }
};

const updateScanResult = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id))
      return res.status(400).json(response(400, "ID is not valid", null));
    if (!isDefObject(req.body))
      return res.status(400).json(response(400, "Fields required", null));
    const {
      success,
      data,
      error,
    } = await SecurityService.updateScanResultReport(id, req.body);
    if (!success) return res.status(400).json(response(400, error, null));
    return res.status(200).json(response(200, "Scan result updated", data));
  } catch (error) {
    return new GeneralError(error);
  }
};

const deleteScanResult = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id))
      return res.status(400).json(response(400, "ID is not valid", null));
    const { success, data, error } = await SecurityService.deleteScanResult(id);
    if (!success) return res.status(400).json(response(400, error, null));
    return res.status(200).json(response(200, "Scan result deleted", data));
  } catch (error) {
    return new GeneralError(error);
  }
};

module.exports = {
  getScanResult,
  getScanResults,
  createScanResult,
  updateScanResult,
  deleteScanResult,
};
