const express = require("express");
const security = express.Router();

const {
  createScanResult,
  getScanResult,
  getScanResults,
  updateScanResult,
  deleteScanResult,
} = require("../../controllers/security");

security.route("/scans/:id").get(getScanResult);
security.route("/scans").get(getScanResults);
security.route("/scans").post(createScanResult);
security.route("/scans/:id").patch(updateScanResult);
security.route("/scans/:id").delete(deleteScanResult);

module.exports = security;
