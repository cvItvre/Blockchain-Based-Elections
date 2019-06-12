const nodemailer = require('nodemailer');
const ElectionController = require('./ElectionController')

const addressContract = ''

const sendMail = async (req, res) => {
    try {
        const { email } = JSON.parse(req.body);
        const testAccount = await nodemailer.createTestAccount();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            port: 465,
            secure: true,
            auth: {
                user: 'blockchaineleicao@gmail.com',
                pass: 'teste@123'
            }
        });

        const randomCode = generateCode()

        const message = {
            from: 'Eleição Blockchain <blockchaineleicao@gmail.com>',
            to: email,
            subject: 'Título teste',
            text: 'Code: ' + generateCode,
            html: '<b>Code:' + generateCode + '</b>'
        };

        const info = await transporter.sendMail(message, (err, info) => {
            if (err) {
                console.log(err)
            } else {
                console.log('Email enviado ' + info.response )
            }
        });

        res.send();
    } catch (e) {
        res.status(500).send();
    }


};

const validationEmail = async (req, res) => {
    try {
        const { email, domain } = JSON.parse(req.body);
        const domainEscaped = domain.replace('\.', '\\.');
        const regex = new RegExp('.+' + domainEscaped + '$', 'g');
        
        res.json(JSON.stringify({ result: email.match(regex) }))
    } catch (e) {
        res.status(500).send();
    }
};

const generateCode = () => {
    return Math.random().toString(36).slice(-10);
};

exports = {
    sendMail,
    validationEmail,
}