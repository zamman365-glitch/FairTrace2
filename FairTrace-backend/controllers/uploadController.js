const { v4: uuidv4 } = require("uuid");
const AuditSession = require("../models/AuditSession");

exports.uploadFiles = async (req, res) => {
  console.log("FILES:", req.files);
  console.log("BODY:", req.body);

  try {
    const { targetColumn, protectedAttribute } = req.body;

    if (!req.files || !req.files.dataset || !req.files.model) {
      return res.json({ error: "Files missing" });
    }

    const sessionId = uuidv4();

    await AuditSession.create({
      sessionId,
      status: "queued",
      inputs: {
        datasetPath: req.files.dataset[0].path,
        modelPath: req.files.model[0].path,
        targetColumn,
        protectedAttribute
      }
    });

    res.json({
      success: true,
      sessionId
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};