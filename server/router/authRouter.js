import { validateCredentials, validateUniqueCredentials, validatePasswordResetRequest, validateResetToken } from '../middleware/authRouterValidator.js'
import { sendEmailOnNewIpSignIn, sendEmailOnSignUp, sendEmailWithResetLink, sendEmailConfirmPasswordChanged } from '../emailService/emailService.js';
import { hashPassword } from '../util/bcrypt.js';
import { getUniqueRestToken, getResetLink } from '../util/resetPassword.js';
import { Router } from 'express';
import usersRepository from '../database/usersRepository.js';
const router = Router();



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
    const newUser = await usersRepository.createNewUser(username, email, hashedPassword);

    await sendEmailOnSignUp(newUser, req);
    req.session.isSignedIn = (req.session.isSignedIn) || true

    res.send({ data: { username: newUser.username, email: newUser.email } });
});



router.post("/api/auth/forgotpassword", validatePasswordResetRequest, async (req, res) => {
    const { email } = req.body;
    const userId = req.user.id;

    const resetToken = getUniqueRestToken();
    await usersRepository.createPasswordResetRequest(resetToken, userId);

    const resetLink = getResetLink(resetToken);
    await sendEmailWithResetLink(email, resetToken);

    res.send({ data: resetLink });
});


//Since the resettoken is personal it is attached to the user, the validation will set the user on the request.
router.put("/api/auth/resetpassword", validateResetToken, async (req, res) => {
    const { resetToken, newPassword } = req.body;
    const hashedPassword = await hashPassword(newPassword);
    const email = req.user.email;

    const userId = req.user.id;
    const isReset = await usersRepository.resetPassword(hashedPassword, userId, resetToken);

    if(!isReset) {
        return res.status(500).send({ errorMessage: "Something went wrong reseting password, please try again later and send new reset password request..."});
    }

    await sendEmailConfirmPasswordChanged(email);
    res.send({ data: { username: req.user.username, email: email } });
});



export default router;
