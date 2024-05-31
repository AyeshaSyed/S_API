// ScholiumAPP/ScholiumAPI/controllers/authController.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

exports.register = async (req, res) => {
  console.log("Headers:", req.headers);
  console.log("Raw Body:", req.body);

  const { username, password } = req.body;

  console.log("Parsed Username:", username);
  console.log("Parsed Password:", password);

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [userId] = await db("users").insert({
      username,
      password: hashedPassword,
    });

    res.status(201).json({ userId });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      res.status(409).json({ error: "Username already exists" });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

exports.login = async (req, res) => {
  console.log("Headers:", req.headers);
  console.log("Raw Body:", req.body);

  const { username, password } = req.body;

  console.log("Parsed Username:", username);
  console.log("Parsed Password:", password);

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }

  try {
    const user = await db("users").where({ username }).first();

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.json({ token });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
