const express = require('express');
const router = express.Router();
const { createTalk, updateTalk, deleteTalk, getTalks, searchTalk, getTalk, like, unlike, comment, attendTalk} = require('../controllers/talkController');
const { authorizeUser } = require('../middlewares/authMiddleware');

//list all talks
router.get('/list', authorizeUser, getTalks);
//create talk
router.post('/addTalk', authorizeUser, createTalk);
//edit talk
router.put('/edit/:id', authorizeUser, updateTalk);
//delete talk
router.delete('/delete/:id', deleteTalk);
//search talk
router.get('/searchTalk', authorizeUser, searchTalk)
//get individual talk
router.get('/:id', authorizeUser, getTalk)

router.put('/like', authorizeUser, like);

router.put('/unlike', authorizeUser, unlike);

router.put('/comment/:id', authorizeUser, comment);

router.put('/attend', authorizeUser, attendTalk);



//comment on talk
//like and unlike talk

module.exports = router;