const express = require('express');
const { authenticate } = require('../middleware/user-auth');
const { verify } = require('../middleware/verify-device');
const router = express.Router();

router.get('/login', verify, (req, res) => {
	res.render('login', { error: '', email: '' });
});

router.post('/login', authenticate, (req, res) => {
	res.redirect('/home');
});

module.exports = router;