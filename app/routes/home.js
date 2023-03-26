const express = require('express');
const { checkSession, logout } = require('../middleware/user-auth');
const router = express.Router();

router.get('/home', checkSession, (req, res) => {
    res.render('home', { name: "Mirko", email: req.session.email, permission: req.session.permission, darkMode: req.session.darkMode });
});

router.get('/logout', checkSession, logout, (req, res) => {
    res.redirect('/login');
});

module.exports = router;