const jsw = require("jsonwebtoken");
const uaParser = require('ua-parser-js');
const useragent = require('express-useragent');
const Mailer = require('../config/email-config');
const dbConnection = require('../config/db-connect');
const JSW_SECRET = "super secret";
const db = new dbConnection();
const mail = new Mailer();

let verify = (req, res, next) => {
    const deviceId = req.cookies.deviceId;
    const userAgent = req.headers['user-agent'];
    const parsed = uaParser(userAgent);
    let vendor = parsed.device.vendor = null ? parsed.device.vendor : "Sconoscuto";
    let model = parsed.device.model = null ? parsed.device.model : "Sconoscuto";
    if (deviceId) {
        db.getDb().query(db.queries.verifyDeviceKey, [deviceId], (err, device) => {
            if (err) throw err;
            next();
        });
    } else {
        const secret = JSW_SECRET + model;
        const payload = {
          brand: vendor,
          model: model
        }
        const token = jsw.sign(payload, secret, { expiresIn: "15m" });
        const link = `http://localhost:3000/add-device/${payload.brand}/${payload.model}/${token}`;
        mail.sendMail('mirko.olivetti.f@gmail.com', 'Verify device', link)
        res.send('Dispositivo non concesso');
    }
}

module.exports.verify = verify;