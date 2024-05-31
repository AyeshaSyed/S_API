// ScholiumAPP/ScholiumAPI/routes/notesRoutes.js
const express = require("express");
const router = express.Router();
const {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
} = require("../controllers/notesController");
const { authMiddleware } = require("../middleware/authMW");

router.get("/", authMiddleware, getNotes);
router.post("/", authMiddleware, createNote);
router.put("/:id", authMiddleware, updateNote);
router.delete("/:id", authMiddleware, deleteNote);

module.exports = router;
