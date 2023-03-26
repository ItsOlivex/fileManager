const express = require('express');
const dbConnection = require('../config/db-connect');
const file_module = require('./file-module');
const { checkSession } = require('../middleware/user-auth');
const router = express.Router();
const fm = new file_module.file_manager();
const db = new dbConnection();

router.get('/folders', checkSession, (req, res) => {
  fm.selectFolders(req, (folders) => {
    res.send(folders);
  });
});

router.post('/getFolders', (req, res) => {
  fm.selectFile(req, (files) => {
    console.log(files);
  });
});

module.exports = router;