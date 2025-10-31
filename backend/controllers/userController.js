const { Client } = require('pg');
const client = new Client ({
    connectionString: process.env.PGURI,
});
client.connect();

// CREATE
exports.createUser = async (req, res) => {
  const { username, email, personnummer } = req.body;

  if (!username || !email || !personnummer) {
    return res.status(400).json({ error: 'missing required fields' });
}

  try {
    const result = await client.query(
      `INSERT INTO users (username, email, personnummer) 
      VALUES ($1, $2, $3) 
      RETURNING *`,
      [username, email, personnummer]
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
  const { username, email, personnummer } = req.body;

  if (!username || !email || !personnummer) {
    return res.status(400).json({ error: 'missing required fields' });
  }

  try {
    const result = await client.query(
      `UPDATE users
       SET username = $1,
           email = $2,
           personnummer = $3
       WHERE id = $4
       RETURNING *`,
      [username, email, personnummer, id]
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