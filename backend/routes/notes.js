const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { Pool } = require("pg");
require("dotenv").config();
//const authenticateToken = require("../middleware/authenticateToken");

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const authenticateToken = (req, res, next) => {
  const token =
    req.headers["authorization"] && req.headers["authorization"].split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

router.get("/datatags", authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM data_tags WHERE userid = $1",
      [req.user.id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).json({ error: err.message });
  }
});

router.post("/datatags", authenticateToken, async (req, res) => {
  const { title, entries } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO data_tags (userid, title, entries) VALUES ($1, $2, $3) RETURNING *",
      [req.user.id, title, entries]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
