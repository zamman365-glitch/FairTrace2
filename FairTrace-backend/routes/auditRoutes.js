const router = require("express").Router();
const { startAudit, getAudit, history } = require("../controllers/auditController");

router.post("/audit/start", startAudit);
router.get("/audit/:sessionId", getAudit);
router.get("/audit/history", history);

module.exports = router;