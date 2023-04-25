const nodemailer = require("nodemailer");
const Mail = require("nodemailer/lib/mailer");

class Mailer {

  constructor() {
    this.transport = nodemailer.createTransport({
      service: "hotmail",
      auth: {
        user: "mirko.olivetti.f@outlook.it",
        pass: "Motocross2004"
      }
    })
  }

  sendMail(reciver, subject, text) {
    let detailsMail = {
      from: "mirko.olivetti.f@outlook.it",
      to: reciver,
      subject: subject,
      text: text
    }
    this.transport.sendMail(detailsMail, (err) => {if (err) throw err});
  }

}

module.exports = Mailer;