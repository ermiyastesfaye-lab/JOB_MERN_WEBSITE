const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const {
  getApplication,
  getApplicationById,
  createApplication,
  updatedApplication,
  deleteApplication,
} = require("../controller/application.controller");

router.get("/", getApplication);

router.get("/:id", getApplicationById);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix + path.basename(file.originalname, ext) + ext);
  },
});

const upload = multer({ storage: storage });

router.post("/", upload.single("applicantResume"), createApplication);

router.put("/:id", upload.single("applicantResume"), updatedApplication);

router.delete("/:id", deleteApplication);

module.exports = router;
