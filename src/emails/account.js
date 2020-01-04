const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) =>{
    sgMail.send({
        to: email,
        from: 'cod5000@gmail.com',
        subject: 'Welcome',
        text: `Welcome to the app, ${name}.`,
    })
}

const sendCancellationEmail = (email, name) =>{
    sgMail.send({
        to: email,
        from: 'cod5000@gmail.com',
        subject: 'Goodbye',
        text: `Sorry to see you go, ${name}. We hope you reconsider in the future`,
    })
}


module.exports = {
    sendWelcomeEmail,
    sendCancellationEmail
}