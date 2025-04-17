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



async function sendEmailOnNewIpSignIn(foundUser, req) {
    
    const registedIps = foundUser.registedIps;
    const newSignInIp = req.ip;
   
    if(registedIps.size === 0) {
        await sendMail(foundUser.email, `Welcome ${foundUser.username}!`, "welcome to our platform")
        foundUser.registedIps.add(req.ip);

    } else if (!registedIps.has(newSignInIp)) {
        await sendMail(foundUser.email, "New sign in", `We have detected a new sign in coming from this ip: ${newSignInIp}`)
        foundUser.registedIps.add(req.ip);
    }
}


//TODO perhaps create a file that stores default email values for signIn & signUps?
async function sendEmailOnSignUp(newUser, req) {
    await sendMail(newUser.email, "New signup", `Thanks for signing up, ${newUser.username}!`);
    await sendEmailOnNewIpSignIn(newUser, req);
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
