const mongoose = require("mongoose");

const stage = {
  dpd: Number,
  eod: Number,
  fpr: Number,
  di: Number
};

const AuditSessionSchema = new mongoose.Schema({
  sessionId: { type: String, unique: true },
  status: {
    type: String,
    enum: ["queued", "processing", "completed", "failed"],
    default: "queued"
  },

  inputs: {
    datasetPath: String,
    modelPath: String,
    targetColumn: String,
    protectedAttribute: String
  },

  stageMetrics: {
    dataCollection: stage,
    preprocessing: stage,
    modelTraining: stage,
    outputLayer: stage
  },

  verdict: {
    primaryBiasStage: String,
    confidenceScore: Number,
    amplificationFactor: Number,
    amplificationChain: [String],
    remediationSuggestions: [String]
  },

  reportPaths: {
    json: String,
    pdf: String
  },

  createdAt: { type: Date, default: Date.now },
  completedAt: Date
});

module.exports = mongoose.model("AuditSession", AuditSessionSchema);