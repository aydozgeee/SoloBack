const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.live.com',
    port: 465,
  secure: true, // Use SSL
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  }
});

module.exports = transporter;