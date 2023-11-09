const nodemailer = require('nodemailer');

const sendEmail = async (req, res) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'saris20038@gmail.com',
            pass: 'qupumuttbzmvmlwn'
        }
    });

    let mailOptions = {
        from: 'saris20038@gmail.com',
        to: 'saris20038@gmail.com',
        subject: 'Nuevo problema en pagina Clinica-CES',
        text: JSON.stringify(req.body)
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send({ error: 'Error occurred while trying to send email' });
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send({ message: 'Email sent successfully' });
        }
    });
};

module.exports = {
    sendEmail
};
