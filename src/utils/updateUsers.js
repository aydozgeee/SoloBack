const { Client } = require('pg');
const { userUpdate} = require('../queries/userQueries');
const nodemailer = require('nodemailer');
const configOptions = require('../config/mailConfig');
const crypto = require('crypto');

async function updateUser(user) {
  const client = new Client(/* veritabanı bağlantı bilgileri */);
  await client.connect();

  try {
    const updateQuery = {
      text: userUpdate,
      values: [user.username, user.password, user.resetToken, user.id],
    };

    await client.query(updateQuery);
  } catch (error) {
    console.error('Error updating user:', error);
  } finally {
    await client.end();
  }
}


function generateResetToken() {
  return crypto.randomBytes(20).toString('hex');
}
const transporter = nodemailer.createTransport(configOptions);
const sendResetEmail = (email, resetToken) => {
    console.log("dcsdsdsd",process.env.EMAIL_USER)
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Password Reset',
        text: `Click the following link to reset your password: http://example.com/reset?token=${resetToken}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.error('Error sending email:', error);
        }
        console.log('Email sent:', info.response);
    });
};

module.exports = { sendResetEmail ,updateUser,generateResetToken};
