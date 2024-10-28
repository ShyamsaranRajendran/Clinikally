const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const Email = process.env.EMAIL; // Ensure this matches the variable in .env
const pass = process.env.PASS; // Ensure this matches the variable in .env

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: Email,
        pass: pass,
    }
});

// Define the sendEmail function
async function sendEmail(to, subject, text, html) {
    // Setup email data
    const mailOptions = {
        from: Email, // Sender's email
        to: to, // Recipient's email address
        subject: subject, // Subject line
        text: text, // Plain text body
        html: html // HTML body
    };

    try {
        // Send mail with defined transport object
        const info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
        return 'Email sent successfully';
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Error sending email');
    }
}

module.exports = sendEmail;
