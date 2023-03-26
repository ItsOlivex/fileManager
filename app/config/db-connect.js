const mysql = require('mysql2');

class dbConnection {

	queries = {
		selectFolders: `SELECT Folders.name FROM myfiles.Folders
		inner join FolderAccess on FolderAccess.id_folder = Folders.id_folder
		inner join Users on FolderAccess.id_user = Users.id_user
		WHERE Users.id_user = ?`,
		selectFiles: `SELECT Folders.name FROM myfiles.Folders WHERE Folders.directory = "/upload/Mirko/general"; `,
	}

	constructor(next) {
		this.db = mysql.createConnection({
			host: "myfiles.zapto.org",
			user: "remote_user",
			password: "MotocrosS2004!",
			database: "myfiles"
		});
	}

	getDb() {
		return this.db;
	}

	Json(rawData) {
		return JSON.parse(JSON.stringify(rawData));
	}
}

module.exports = dbConnection;