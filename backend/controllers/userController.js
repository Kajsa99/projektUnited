const { Client } = require('pg');
const client = new Client ({
    connectionString: process.env.PGURI,
});
client.connect();

// token
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';

//login user
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: "Missing credentials" });

  try {
    const result = await client.query(`SELECT * FROM users WHERE username=$1`, [username]);
    const user = result.rows[0];
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRY });
    res.json({ token, username: user.username, id: user.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// CREATE
exports.createUser = async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({ error: 'missing required fields' });
  }

  try {
    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await client.query(
      `INSERT INTO users (username, password, email) 
       VALUES ($1, $2, $3) 
       RETURNING *`,
      [username, hashedPassword, email]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('insertion error:', err);
    res.status(500).json({ error: 'internal Server Error' });
  }
};

// READ
exports.getUsers = async (req, res) => {
  try {
    const result = await client.query(`
        SELECT * FROM users
        ORDER BY id ASC
        `);
    res.json(result.rows);
  } catch (err) {
    console.error('fetching error:', err);
    res.status(500).json({ error: 'internal Server Error' });
  }
};

// READ by ID
exports.getUserById = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await client.query(`SELECT * FROM users WHERE id = $1`, [id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'user not found' });
      }
    res.json(result.rows[0]);
    } catch (err) {
        console.error('fetching error:', err);
        res.status(500).json({ error: 'internal Server Error' });
    }
};

// UPDATE
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({ error: 'missing required fields' });
  }

  try {
    const result = await client.query(
      `UPDATE users
       SET username = $1,
           password = $2,
           email = $3
       WHERE id = $4
       RETURNING *`,
      [username, password, email, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'user not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('update error:', err);
    res.status(500).json({ error: 'internal Server Error' });
  }
};

// DELETE
exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await client.query(
      'DELETE FROM users WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'user not found' });
    }

    res.json({ message: 'user deleted successfully', deletedUser: result.rows[0] });
  } catch (err) {
    console.error('deletion error:', err);
    res.status(500).json({ error: 'internal Server Error' });
  }
};