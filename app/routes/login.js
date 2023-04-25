const express = require('express');
const { authenticate } = require('../middleware/user-auth');
const { verify } = require('../middleware/verify-device');
const jsw = require("jsonwebtoken");
const uaParser = require('ua-parser-js');
const useragent = require('express-useragent');
const router = express.Router();
const JSW_SECRET = "super secret";

router.get('/login', (req, res) => {
	res.render('login', { error: '', email: '' });
});

router.post('/login', authenticate, (req, res) => {
	res.redirect('/home');
});

router.get('/add-device/:brand/:model/:token', (req, res) => {
	let { brand, model, token } = req.params;
	const userAgent = req.headers['user-agent'];
	const parsed = uaParser(userAgent);
	brand = parsed.device.vendor = null ? parsed.device.vendor : "Sconoscuto";
	model = parsed.device.model = null ? parsed.device.model : "Sconoscuto";
	console.log(brand, model, token);
	if(!req.cookies.deviceId) {
		const parsed = uaParser(req.headers['user-agent']);
		let secret = JSW_SECRET + model;
		try {
			/*const payload = app.getJSW().verify(token, secret);
			const key = utility.generateRandomKey(8);
			db.createQuery(db.queries.addDevice, (result) => { }, () => {
				res.cookie("deviceId", key, { maxAge: 365 * 24 * 60 * 60 * 1000, httpOnly: true }).send("added");
			}, [key, brand, model]);*/
		} catch (error) {
			res.send("Link not valid");
		}
	} else {
		res.send("Alredy virified");
	}
});

module.exports = router;