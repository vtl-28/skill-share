const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const { createTalk } = require('../controllers/talkController');

//create talk
router.post('/', protect, createTalk);
//edit talk
//delete talk
//list particular user talks
//list all talks
//comment on talk
//like and unlike talk

module.exports = router;