const nodemailer = require("nodemailer");
// process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const transporter = nodemailer.createTransport({
        pool: true,
        // host: '62.173.139.235',
        host: 'gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'soltenwork@gmail.com',
            pass: 'Zeba7699776997'
        }

    },
)

transporter.verify(function (error, success) {
    if (error) {
        console.log({
            error,
            message: "Ошибка"
        });
    } else {
        console.log("Nodemailer: Server is ready to take our messages");
    }
});

const mailer = message => {
    transporter.sendMail(message, (err, info) => {
        if (err) return console.log(err)
    })
}


module.exports = mailer;