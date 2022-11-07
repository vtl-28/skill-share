const express = require('express');
const router = express.Router();
const { registerUser, authUser, getUser, getTalks, updateUser } = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');

//sign up user
router.post('/', registerUser);
//log in user
router.post('/login', authUser);
//get user
router.get('/:id', protect, getUser);
//list particular user talks
router.get('/talks/:id', protect, getTalks);
//edit user profile
router.put('/edit/:id', protect, updateUser);

module.exports = router;