const express = require('express');
const router = express.Router();
const { registerUser, authUser, getUser, getTalks, updateUser, getAttendedTalks } = require('../controllers/userController');
const { authorizeUser } = require('../middlewares/authMiddleware')

//sign up user
router.post('/signup', registerUser);
//log in user
router.post('/login', authUser);
//get user
router.get('/:id', getUser);
//list particular user talks
router.get('/talks/:id',authorizeUser, getTalks);
//edit user profile
router.put('/edit/:id', authorizeUser, updateUser);

router.get('/bookedTalks/:id', authorizeUser, getAttendedTalks);


module.exports = router;