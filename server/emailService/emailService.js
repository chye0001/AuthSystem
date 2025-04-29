import nodemailer from 'nodemailer';
import usersRepository from '../database/usersRepository.js';

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



async function sendEmailOnNewIpSignIn(foundUser, req) {
    
    const registedIps = await usersRepository.getRegisteredIpsBy(foundUser.username);
    const ip = req.ip;

    if (!registedIps.includes(ip)) {
        await sendMail(foundUser.email, "New sign in", `We have detected a new sign in coming from this ip: ${ip}`)
        await usersRepository.registerNewIp(ip, foundUser.id);
    }
}


//TODO perhaps create a file that stores default email values for signIn & signUps?
async function sendEmailOnSignUp(newUser) {
    await sendMail(newUser.email, "New signup", `Welcome ${newUser.username}. Thanks for signing up, ${newUser.username}!`);
}



async function sendEmailWithResetLink(email, uniqueLink) {
  await sendMail(email, "Reset password", `Here is the link for reseting the password: ${uniqueLink}`);
}



async function sendEmailConfirmPasswordChanged(email) {
  await sendMail(email, "Password updated", "Your password has been updated!");
}


export {
    sendEmailOnNewIpSignIn,
    sendEmailOnSignUp,
    sendEmailWithResetLink,
    sendEmailConfirmPasswordChanged
}
