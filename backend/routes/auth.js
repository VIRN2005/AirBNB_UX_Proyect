const express = require('express');
const { registerUser, loginUser, logoutUser } = require('../controllers/userController.js');

const router = express.Router();

router.post('/createUser', registerUser);
router.post('/logIn', loginUser);
router.post('/logOut', logoutUser);

module.exports = router;
