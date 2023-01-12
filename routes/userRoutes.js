const express = require('express');
const router = express.Router();
const { registerUser, authUser, getUser, getTalks, updateUser, searchTalk } = require('../controllers/userController');
const { authorizeUser } = require('../middlewares/authMiddleware')

//sign up user
router.post('/user/signup', registerUser);
//log in user
router.post('/login', authUser);
//get user
router.get('/:id', getUser);
//list particular user talks
router.get('/talks/:id',authorizeUser, getTalks);
//edit user profile
router.put('/edit/:id',updateUser);
//search talk
//router.get('/', authorizeUser, searchTalk)

module.exports = router;