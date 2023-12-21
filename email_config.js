const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', 
    port: 465, 
    secure: true, // true for 465, false for other ports
    auth: {
        user: 'gchat5571@gmail.com', // Replace with your email
        pass: 'zfhe poev gzop lcad' // Replace with your password
    }
});

module.exports = transporter; 
