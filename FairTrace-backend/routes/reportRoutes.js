const router = require("express").Router();
const { getJson, getPdf } = require("../controllers/reportController");

router.get("/report/:sessionId/json", getJson);
router.get("/report/:sessionId/pdf", getPdf);

module.exports = router;