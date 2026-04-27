const AuditSession = require("../models/AuditSession");
const auditQueue = require("../queue/auditQueue");

exports.startAudit = async (req, res) => {
  await auditQueue.add(req.body);
  res.json({ message: "Audit Started" });
};

exports.getAudit = async (req, res) => {
  const data = await AuditSession.findOne({
    sessionId: req.params.sessionId
  });
  res.json(data);
};

exports.history = async (req, res) => {
  const data = await AuditSession.find().sort({ createdAt: -1 });
  res.json(data);
};