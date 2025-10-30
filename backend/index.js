const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const { Client } = require('pg');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const client = new Client({
  connectionString: process.env.PGURI,
});

client.connect();

// CREATE
app.post('/api/smultron', async (req, res) => {
  const { title, description, location, image_url, user_id } = req.body;

  if (!title || !image_url || !user_id) {
    return res.status(400).json({ error: 'missing required fields' });
}

  try {
    const result = await client.query(
      `INSERT INTO smultron (title, description, location, image_url, user_id) 
      VALUES ($1, $2, $3, $4, $5) 
      RETURNING *, (SELECT username FROM users WHERE id = $5) AS username`,
      [title, description, location, image_url, user_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Insertion error:', err);
    res.status(500).json({ error: 'internal Server Error' });
  }
});

// READ
app.get('/api/smultron', async (req, res) => {
  try {
    const result = await client.query(`
        SELECT s.id, s.title, s.description, s.location, s.image_url, s.created_at, u.username 
        FROM smultron s
        JOIN users u ON s.user_id = u.id
        ORDER BY s.created_at DESC
        `);
    res.json(result.rows);
  } catch (err) {
    console.error('Fetching error:', err);
    res.status(500).json({ error: 'internal Server Error' });
  }
});

// UPDATE
app.put('/api/smultron/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, location, image_url, user_id } = req.body;

  if (!title || !image_url || !user_id) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const result = await client.query(
      `UPDATE smultron
       SET title = $1,
           description = $2,
           location = $3,
           image_url = $4,
           user_id = $5
       WHERE id = $6
       RETURNING *`,
      [title, description || null, location || null, image_url, user_id, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE
app.delete('/api/smultron/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await client.query(
      'DELETE FROM smultron WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json({ message: 'Post deleted successfully', deletedPost: result.rows[0] });
  } catch (err) {
    console.error('Deletion error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.use(express.static(path.join(__dirname, 'dist')));

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
