const express = require('express'),
			session = require('express-session'),
			bodyParser = require('body-parser'),
			cookieParser = require('cookie-parser'),
			dbConnection = require('./app/config/db-connect'),
			loginRouter = require('./app/routes/login'),
			fileManager = require('./app/file-manager/file-manager'),
			homeRouter = require('./app/routes/home');

const app = express();
const port = process.env.PORT || 3000;
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

app.get('/', (req, res) => {
	res.redirect('/login');
});