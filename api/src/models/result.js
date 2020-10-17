const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");

const findingSchema = new mongoose.Schema({
  type: {
    type: String,
  },
  ruleId: {
    type: String,
  },
  location: {
    path: {
      type: String,
    },
    positions: {
      begin: {
        line: {
          type: Number,
        },
      },
    },
  },
  metadata: {
    description: { type: String },
    severity: { type: String, enum: ["HIGH", "MEDIUM", "LOW"], required: true },
  },
});

const resultSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ["Queued", "In_Progress", "Success", "Failure"],
    required: true,
  },
  repositoryName: {
    type: String,
    required: true,
  },
  findings: [findingSchema],
  queuedAt: {
    type: Date,
    required: true,
  },
  scanningAt: {
    type: Date,
    required: true,
  },
  finishedAt: {
    type: Date,
    required: true,
  },
});

resultSchema.plugin(timestamp);
module.exports = mongoose.model("Result", resultSchema);
