const mysql = require('mysql2');

class dbConnection {
	constructor(next) {
		this.db = mysql.createConnection({
			host: "myfiles.zapto.org",
			user: "rUser",
			password: "6cpbhh42ay5te",
			database: "myfiles"
		});
	}

	getDb() {
		return this.db;
	}
}

module.exports = dbConnection;