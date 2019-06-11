const nodemailer = require('nodemailer');

const teste = async () => {
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

    const message = {
        from: 'Eleição Blockchain <blockchaineleicao@gmail.com>',
        to: 'amaury.tavares@ufrpe.br',
        subject: 'Título teste',
        text: 'Text teste',
        html: '<b>HTML teste</b>'
    };

    const info = await transporter.sendMail(message, (err, info) => {
        if (err) {
            console.log(err)
        } else {
            console.log('Email enviado ' + info.response )
        }
    });
};

teste();