const express = require('express');
const dbConnection = require('../config/db-connect');
const file_module = require('./file-module');
const { checkSession } = require('../middleware/user-auth');
const router = express.Router();
const fm = new file_module.file_manager();
const db = new dbConnection();

router.get('/folders', checkSession, (req, res) => {
  fm.selectFolders(req, "/upload/" + req.session.name, (folders) => {
    res.send(fm.JsonDocument(folders));
  });
});

router.post('/getFolders', checkSession, (req, res) => {
  let dir = req.body.path + '/' + req.body.fileName;
  fm.selectFolder(req, dir, (files) => {
    res.send(fm.JsonDocument(files));
  });
});

router.post('/getFolderItems', checkSession, (req, res) => {
  let dir = req.body.path + '/' + req.body.fileName;
  fm.selectFolderItems(req, dir, (folders) => {
    res.send(fm.JsonDocument(folders));
  })
});

module.exports = router;