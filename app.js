const express = require('express'),
			passport = require('passport'),
			session = require('express-session'),
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
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(session({
	secret: 'secret',
	saveUninitialized: false,
	resave: false,
	maxAge: 1000 * 60 * 60,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(loginRouter);
app.use(homeRouter);
app.use(fileManager);

app.get('/', (req, res) => {
	res.redirect('/login');
});