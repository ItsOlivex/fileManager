const express = require('express');
const crypto = require('crypto');
const validator = require('validator');
const Mailer = require('../config/email-config');
const dbConnection = require('../config/db-connect');
const Accounts_module = require('./accounts-module');
const { checkSession, checkPermission } = require('../middleware/user-auth');
const { generateRandomKey } = require('../middleware/verify-device');
const { appendFile } = require('fs');
const router = express.Router();
const mail = new Mailer();
const db = new dbConnection();
const am = new Accounts_module();

router.get('/getAccounts', checkSession, checkPermission, (req, res) => {
  db.getDb().query(db.queries.getAccounts, (err, accounts) => {
    if (err) throw err;
    if (accounts.length > 0) {
      res.send(db.Json(accounts));
    }
  });
});

router.post('/createAccount', checkSession, checkPermission, (req, res, next) => {
  const { email, name, surname } = req.body;
  const password = generateRandomKey(10);
  if (validator.isEmail(email)) {
    db.getDb().query(db.queries.selectUser, [email], (err, account) => {
      if (err) throw err;
      if (account.length === 0) {
        db.getDb().query(db.queries.newUser, [email, name, surname, crypto.createHash('md5').update(password).digest('hex')], (err, result) => {
          if (err) throw err;
          const credentials = `
                email: ${email}
                password: ${password}`;
          mail.sendMail(email, 'Your credentials', credentials);
          next();
        });
      }
    })
  }
}, am.getAccounts);

router.post('/removeAccount', checkSession, checkPermission, (req, res, next) => {
  const email = req.body.email;
  if (validator.isEmail(email)) {
    db.getDb().query(db.queries.selectUser, [email], (err, account) => {
      if (err) throw err;
      if (account.length > 0) {
        db.getDb().query(db.queries.removeUser, [email], (err, result) => {
          if (err) throw err;
          next();
        });
      }
    })
  }
}, am.getAccounts);

module.exports = router;