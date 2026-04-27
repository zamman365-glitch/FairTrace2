const Queue = require("bull");
const AuditSession = require("../models/AuditSession");
const runPythonWorker = require("../workers/pythonWorker");

const auditQueue = new Queue("audit", {
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
  }
});

auditQueue.process(async job => {
  const { sessionId } = job.data;

  const session = await AuditSession.findOne({ sessionId });

  try {
    session.status = "processing";
    await session.save();

    const result = await runPythonWorker(session);

    session.stageMetrics = result.stageMetrics;
    session.verdict = result.verdict;
    session.reportPaths = result.reportPaths;
    session.status = "completed";
    session.completedAt = new Date();

    await session.save();

  } catch (err) {
    session.status = "failed";
    await session.save();
  }
});

module.exports = auditQueue;