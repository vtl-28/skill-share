const express = require('express');
const router = express.Router();
const { registerUser, authUser, getUser } = require('../controllers/userController')

//sign up user
router.post('/', registerUser);
//log in user
router.post('/login', authUser);
//get user
router.get('/:id', getUser)
//log out user

module.exports = router;