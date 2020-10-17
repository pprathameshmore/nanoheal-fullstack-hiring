const express = require("express");
const router = express.Router();

const securityRouter = require("./modules/security");

router.use("/v1/securities", securityRouter);

module.exports = router;
