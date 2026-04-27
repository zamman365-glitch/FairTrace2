const router = require("express").Router();
const upload = require("../config/multer");
const { uploadFiles } = require("../controllers/uploadController");

router.post(
  "/upload",
  upload.fields([
    { name: "dataset", maxCount: 1 },
    { name: "model", maxCount: 1 }
  ]),
  uploadFiles
);

module.exports = router;