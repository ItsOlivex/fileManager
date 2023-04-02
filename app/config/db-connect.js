const mysql = require('mysql2');

class dbConnection {

	queries = {
		selectFolders: `SELECT Folders.name, Folders.directory, Folders.id_folder FROM myfiles.Folders
		inner join FolderAccess on FolderAccess.id_folder = Folders.id_folder
		inner join Users on FolderAccess.id_user = Users.id_user
		WHERE Folders.directory = ? AND Users.id_user = ?;`,
		selectFolder: `SELECT Folders.name, Folders.directory FROM myfiles.Folders WHERE Folders.directory = ?;`,
		selectFiles: `SELECT Files.name, Files.directory, Files.id_file FROM myfiles.Files
		inner join Folders on Files.id_folder = Folders.id_folder
		inner join FolderAccess on FolderAccess.id_folder = Folders.id_folder
		inner join Users on FolderAccess.id_user = Users.id_user
		WHERE Files.directory = ? AND Users.id_user = ?;`,
	}

	constructor(next) {
		this.db = mysql.createConnection({
			host: "myfilesddns.ddns.net",
			user: "pc",
			password: "Motocross2004!",
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