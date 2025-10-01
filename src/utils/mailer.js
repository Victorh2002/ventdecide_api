const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.HOST_MAILER,
    port: process.env.PORT_MAILER,
    secure: true,
    auth: {
        user: process.env.MAILER_ADDRESS,
        pass: process.env.PASSWORD_MAILER,
    },
});

module.exports = transporter;