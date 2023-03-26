const fs = require('fs');
const dbConnection = require('../config/db-connect');
const db = new dbConnection();

class file_manager {

  constructor() {

  }

  selectFolders(req, callback) {
    db.getDb().query(db.queries.selectFolders, [req.session.id_user], (err, folders) => {
      if (err) throw err;
      if (callback) callback(db.Json(folders));
    });
  }

  selectFile(req, callback) {
    db.getDb().query(db.queries.selectFiles, [req.session.id_user], (err, files) => {
      if (err) throw err;
      if (callback) callback(db.Json(files));
    });
  }


}

module.exports.file_manager = file_manager;