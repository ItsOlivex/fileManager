const express = require('express'),
			session = require('express-session'),
			bodyParser = require('body-parser'),
			cookieParser = require('cookie-parser'),
			dbConnection = require('./app/config/db-connect'),
			uaParser = require('ua-parser-js'),
			jsw = require("jsonwebtoken"),
			useragent = require('express-useragent'),
			loginRouter = require('./app/routes/login'),
			fileManager = require('./app/file-manager/file-manager'),
			homeRouter = require('./app/routes/home'),
			accountsRouter = require('./app/accounts-manager/accounts-manager'),
			{ generateRandomKey } = require('./app/middleware/verify-device');

const app = express();
const port = process.env.PORT || 3000;
const JSW_SECRET = "super secret";
const db = new dbConnection();
db.getDb().connect(err => {
	if (err) throw err;
	console.log('connected');
	app.listen(port, () => {
		console.log(`Server started on port ${port}`);
	})
});

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
	secret: 'secret',
	saveUninitialized: false,
	resave: false,
	maxAge: 1000 * 60 * 60,
}));
app.use(loginRouter);
app.use(homeRouter);
app.use(fileManager);
app.use(accountsRouter);

app.get('/', (req, res) => {
	res.redirect('/login');
});

app.get('/add-device/:brand/:model/:token', (req, res) => {
	let { brand, model, token } = req.params;
	const userAgent = req.headers['user-agent'];
	const parsed = uaParser(userAgent);
	brand = parsed.device.vendor = null ? parsed.device.vendor : "Sconoscuto";
	model = parsed.device.model = null ? parsed.device.model : "Sconoscuto";
	if(!req.cookies.deviceId) {
		let secret = JSW_SECRET + model;
		try {
			const payload = jsw.verify(token, secret);
			const key = generateRandomKey(8);
			console.log(key);
			db.getDb().query(db.queries.addDevice, [brand, model, key], (err, result) => {
				if (err) throw err;
				res.cookie("deviceId", key, { maxAge: 365 * 24 * 60 * 60 * 1000, httpOnly: true }).send("added");
			});
		} catch (error) {
			console.log(error);
		}
	} else {
		res.send("Alredy virified");
	}
});