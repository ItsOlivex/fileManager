const dbConnection = require("../config/db-connect");
const crypto = require('crypto');
const validator = require('validator');
const db = new dbConnection();

let authenticate = (req, res, next) => {
	const email = req.body.email;
	const password = crypto.createHash('md5').update(req.body.password).digest('hex');
	if (validator.isEmail(email) && password.length >= 8) {
		db.getDb().query("SELECT * FROM Users WHERE email = ?", [email], (err, rawUser) => {
			if (err) throw err;
			if (rawUser.length > 0) {
				const user = db.Json(rawUser[0]);
				if (user.password === password) {
					req.session.id_user = user.id_user;
					req.session.name = user.name;
					req.session.email = user.email;
					req.session.permission = user.permission;
					req.session.darkMode = user.darkMode === 0 ? '' : 'dark';
					next();
				} else {
					res.render('login', { error: 'wrongPassword', email: user.email })
				}
			} else {
				res.render('login', { error: 'userNotFound', email: '' });
			}
		});	
	} else {
		res.render('/login', { error: 'credentialError', email: ''  });
	}
}

let checkSession = (req, res, next) => {
	if (req.session.email) {
		next();
	} else {
		res.redirect('/login');
	}
}

let logout = (req, res, next) =>  {
	req.session.destroy();
	next();
}

module.exports = {
	authenticate,
	checkSession,
	logout
}