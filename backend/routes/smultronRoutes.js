const express = require('express');
const router = express.Router();
const smultronController = require('../controllers/smultronController');

//CRUD
router.post('/api/smultron', smultronController.createSmultron);
router.get('/api/smultron', smultronController.getSmultron);
router.put('/api/smultron/:id', smultronController.updateSmultron);
router.delete('/api/smultron/:id', smultronController.deleteSmultron);

module.exports = router;