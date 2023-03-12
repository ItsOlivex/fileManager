const dbConnection = require("../config/db-connect");
const validator = require('validator');
const db = new dbConnection();

let authenticate = (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;
	if (validator.isEmail(email) && password.length >= 8) {
		db.getDb().query("SELECT * FROM users WHERE email = ? AND password = ?", [email, password], (err, rawUser) => {
			if (err) throw err;
			if (rawUser.length > 0) {
				const user = JSON.parse(JSON.stringify(rawUser[0]));
				req.session.email = user.email;
				req.session.permission = user.permission;
				next();
			} else {
				res.send("User not found");
			}
		});	
	} else {
		res.send("Credentials error")
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