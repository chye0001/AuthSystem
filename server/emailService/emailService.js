import nodemailer from 'nodemailer';

const testAccount = await nodemailer.createTestAccount();

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
  auth: {
    user: testAccount.user,
    pass: testAccount.pass,
  },
});

async function sendMail(recipientEmail, subject, message) {

  const info = await transporter.sendMail({
    from: '"MailServer" <mailserver.email@example.com>',
    to: recipientEmail,
    subject: subject,
    text: message,
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

export {
    sendMail
}
