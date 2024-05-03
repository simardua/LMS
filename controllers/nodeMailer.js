const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'simardeepsinghdua@gmail.com',
        pass: 'pjiwxyargsviabsh'
    }
});

module.exports = transporter;