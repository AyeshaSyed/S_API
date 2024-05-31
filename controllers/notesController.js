// ScholiumAPP/ScholiumAPI/controllers/notesController.js
const db = require("../config/db");

exports.getNotes = async (req, res) => {
  const userId = req.user.id;

  try {
    const notes = await db("notes").where({ user_id: userId });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createNote = async (req, res) => {
  const userId = req.user.id;
  const { notebook_id, title, content } = req.body;

  try {
    const [noteId] = await db("notes").insert({
      notebook_id,
      user_id: userId,
      title,
      content,
    });

    res.status(201).json({ noteId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateNote = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    await db("notes").where({ id, user_id: userId }).update({ title, content });

    res.status(200).json({ message: "Note updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteNote = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;

  try {
    await db("notes").where({ id, user_id: userId }).del();

    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
