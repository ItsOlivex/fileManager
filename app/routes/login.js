const express = require('express');
const { authenticate } = require('../middleware/user-auth');
const router = express.Router();

router.get('/login', (req, res) => {
	res.render('login');
});

router.post('/login', authenticate, (req, res) => {
	res.redirect('/home');
});

module.exports = router;