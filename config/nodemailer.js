const nodemailer = require("nodemailer");

module.exports = nodemailer.createTransport({
  service: "SendinBlue",
  auth: {
    user: process.env.SENDINBLUE_SMTP_USER,
    pass: process.env.SENDINBLUE_SMTP_PASSWORD
  }
});
