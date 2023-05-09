const fs = require('fs');
const dbConnection = require('../config/db-connect');
const db = new dbConnection();

class file_manager {

  constructor() {

  }

  selectFolders(req, dir, callback) {
    db.getDb().query(db.queries.selectFolders, [dir, req.session.id_user], (err, folders) => {
      if (err) throw err;
      if (callback) callback(db.Json(folders));
    });
  }

  selectFolder(req, dir, callback) {
    db.getDb().query(db.queries.selectFolders, [dir, req.session.id_user], (err, files) => {
      if (err) throw err;
      if (callback) callback(db.Json(files));
    });
  }

  selectFolderItems(req, dir, callback) {
    db.getDb().query(db.queries.selectFolders, [dir, req.session.id_user], (err, folders) => {
      if (err) throw err;
      db.getDb().query(db.queries.selectFiles, [dir, req.session.id_user], (err, files) => {
        if (err) throw err;
        files.forEach(file => {
          folders.push(file);
        });
        if (callback) callback(db.Json(folders));
      });
    });
  }

  createFolder(req) {
    
  }


  JsonDocument(documents) {
    let documentJson = [];
    documents.forEach(document => {
      if (document.id_folder) {
        documentJson.push({ path: document.directory, name: document.name, type: 'fa-solid fa-folder-open', folder: 1 });
      } else if (document.id_file) {
        documentJson.push({ path: document.directory, name: document.name, type: 'fa-regular fa-file' });
      }
    });
    return documentJson;
  }
}

module.exports.file_manager = file_manager;