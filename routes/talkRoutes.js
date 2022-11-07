const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const { createTalk, updateTalk, deleteTalk, getTalks, searchTalk} = require('../controllers/talkController');

//create talk
router.post('/', protect, createTalk);
//edit talk
router.put('/edit/:id', protect, updateTalk);
//delete talk
router.delete('/delete/:id', protect, deleteTalk);
//list all talks
router.get('/talks', protect, getTalks);
//search talk
router.get('/', protect, searchTalk)


//comment on talk
//like and unlike talk

module.exports = router;