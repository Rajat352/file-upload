const express = require("express");
const router = express.Router();
const fileController = require("../controllers/fileController");

router.post("/save", fileController.saveFile);
router.get("/saved", fileController.getSavedFiles);

module.exports = router;
