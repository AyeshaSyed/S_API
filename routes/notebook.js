//ScholiumAPP/ScholiumAPI/routes/notebook.js
const express = require("express");
const {
  getNotebooks,
  createNotebook,
  updateNotebook,
  deleteNotebook,
} = require("./controllers/notebookController");
const authenticateToken = require("./middleware/auth");
const router = express.Router();

router.use(authenticateToken);

router.get("/", getNotebooks);
router.post("/", createNotebook);
router.put("/:notebookId", updateNotebook);
router.delete("/:notebookId", deleteNotebook);

module.exports = router;
