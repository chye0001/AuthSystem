import { validateCredentials, validateUniqueCredentials, validatePasswordResetRequest, validateResetToken } from '../middleware/authRouterValidator.js'
import { sendEmailOnNewIpSignIn, sendEmailOnSignUp, sendEmailWithResetLink, sendEmailConfirmPasswordChanged } from '../emailService/emailService.js';
import { hashPassword } from '../util/bcrypt.js';
import { getUniqueRestToken, getResetLink } from '../util/resetPassword.js';
import { Router } from 'express';
const router = Router();

let nextId = 2;
export let users = [{
    id: 1,
    username: "test",
    email: "test@email.com",
    password: "$2a$12$rC1vHxUFxCchYTIsbrjRc.X1cSdxW/F3Xt4XUlmIPLhxw1oS3aWmq", //123
    registedIps: new Set()
}]



router.post("/api/auth/signin", validateCredentials, async (req, res) => {
    const user = req.user;

    req.session.isSignedIn = (req.session.isSignedIn) || true
    await sendEmailOnNewIpSignIn(user, req);
    res.send({ data: { username: user.username, email: user.email } });
});


router.post("/api/auth/signout", (req, res) => {
    req.session.destroy();
    res.send({});
});


router.post("/api/auth/signup", validateUniqueCredentials, async (req, res) => {
    const { username, email, password } = req.body;

    const hashedPassword = await hashPassword(password);
    const newUser = {
        id: nextId++,
        username: username,
        email: email,
        password: hashedPassword,
        registedIps: new Set()
    }

    users.push(newUser);
    await sendEmailOnSignUp(newUser, req);
    req.session.isSignedIn = (req.session.isSignedIn) || true

    res.send({ data: { username: newUser.username, email: newUser.email } });
});



router.post("/api/auth/forgotpassword", validatePasswordResetRequest, async (req, res) => {
    const { email } = req.body;
    const user = req.user;

    const ratelimitExperation = new Date(Date.now() + 1 * 60 * 1000) //1 minute
    user.ratelimitExperation = ratelimitExperation;

    const resetToken = getUniqueRestToken();
    const resetPasswordRequet = {
        resetToken: resetToken,
        expiration: new Date(Date.now() + 10 * 60 * 1000) //10 minutes from now
    }
    user.resetPasswordRequet = resetPasswordRequet;

    const resetLink = getResetLink(resetToken);
    await sendEmailWithResetLink(email, resetToken);

    res.send({ data: resetLink });
});



router.put("/api/auth/resetpassword", validateResetToken, async (req, res) => {
    const { newPassword } = req.body;
    let user = req.user;

    user = { ...user, password: await hashPassword(newPassword) };

    const email = user.email;
    const userIndex = users.findIndex((user) => user.email === email);
    if (userIndex !== -1) {
        users[userIndex] = user;
    }

    await sendEmailConfirmPasswordChanged(email);
    res.send({ data: { username: user.username, email: email } });
});



export default router;
