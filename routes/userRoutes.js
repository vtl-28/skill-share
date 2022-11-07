const express = require('express');
const router = express.Router();
const { registerUser, authUser, getUser, getTalks } = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');

//sign up user
router.post('/', registerUser);
//log in user
router.post('/login', authUser);
//get user
router.get('/:id', protect, getUser);
//log out user
//list particular user talks
router.get('/talks/:id', protect, getTalks);

module.exports = router;