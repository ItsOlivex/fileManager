import { client } from "./client.js";

export class Accounts_module {

  constructor(scope, http, timeout) {
    this.cl = new client(http);
    this.scope = scope;
    this.http = http;
    this.timeout = timeout;
  }

  getAccounts() {
    this.cl.get('/getAccounts', (accounts) => {
      this.scope.accounts = accounts;
    });
  }

  newAccount() {
    const inputs = this.cl.getElements('.input.text-input input');
    this.cl.post('/createAccount', { email: inputs[0].value, name: inputs[1].value, surname: inputs[2].value }, (accounts) => {
      this.scope.accounts = accounts;
      inputs.forEach(input => {
        input.value = '';
      })
    })
  }

  removeAccount(index) {
    this.cl.blurActive('Confirm to remove this account');
    this.cl.getElement('.blur-buttons .confirm').onclick = () => {
      this.cl.post('/removeAccount', { email: this.scope.accounts[index].email }, (accounts) => {
        this.scope.accounts = accounts;
        this.cl.blurRemove();
      });
    }
  }

}