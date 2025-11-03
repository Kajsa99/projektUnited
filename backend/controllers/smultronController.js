const client = require('../db/client');

// CREATE
exports.createSmultron = async (req, res) => {
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
};

// READ
exports.getSmultron = async (req, res) => {
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
};

// UPDATE
exports.updateSmultron = async (req, res) => {
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
};

// DELETE
exports.deleteSmultron = async (req, res) => {
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
};