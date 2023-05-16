const dbConnection = require('../config/db-connect');
const db = new dbConnection();

class Accounts_module {
  constructor() {

  }

  getAccounts(req, res) {
    db.getDb().query(db.queries.getAccounts, (err, accounts) => {
      if (err) throw err;
      if (accounts.length > 0) {
        res.send(db.Json(accounts));
      }
    });
  }
}

module.exports = Accounts_module;