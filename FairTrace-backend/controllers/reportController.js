const AuditSession = require("../models/AuditSession");

exports.getJson = async (req, res) => {
  const data = await AuditSession.findOne({
    sessionId: req.params.sessionId
  });
  res.download(data.reportPaths.json);
};

exports.getPdf = async (req, res) => {
  const data = await AuditSession.findOne({
    sessionId: req.params.sessionId
  });
  res.download(data.reportPaths.pdf);
};