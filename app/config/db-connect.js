const mysql = require('mysql2');

class dbConnection {
	constructor(next) {
		this.db = mysql.createConnection({
			host: "localhost",
			user: "root",
			password: "motocross2004",
			database: "webapp"
		});
	}

	getDb() {
		return this.db;
	}
}

module.exports = dbConnection;