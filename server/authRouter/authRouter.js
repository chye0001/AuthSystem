import { sendEmailOnNewIpSignIn, sendEmailOnSignUp, sendEmailWithResetLink, sendEmailConfirmPasswordChanged } from '../emailService/emailService.js';
import { hashPassword, isValidPassword } from '../util/bcrypt.js';
import { getUniqueRestPasswordId as getUniqueRestToken, getResetLink } from '../util/resetPassword.js';
import { Router } from 'express';
const router = Router();

let nextId = 2;
let users = [{
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
    res.send({ data: {username: user.username, email: user.email} });
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

    res.send({ data: {username: newUser.username, email: newUser.email} });
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
    
    user = {...user, password: await hashPassword(newPassword)};
    
    const email = user.email;
    const userIndex = users.findIndex((user) => user.email === email);
    if (userIndex !== -1) {
        users[userIndex] = user;
    }

    await sendEmailConfirmPasswordChanged(email);
    res.send({ data: {username: user.username, email: email}});
});



function findUserBy(field, value) {
    return users.find((user) => user[field] === value);
}



async function validateCredentials(req, res, next) {
    const { username, password } = req.body;
    
    const foundUser = findUserBy("username", username);
    if (foundUser === undefined) {
        return res.status(401).send({errorMessage: "Wrong credentials"});
    }

    const isCorrectPassword = await isValidPassword(password, foundUser.password);
    if(!isCorrectPassword) {
       return res.status(401).send({errorMessage: "Wrong credentials"});
    }

    req.user = foundUser;
    next();
}



function validateUniqueCredentials(req, res, next) {
    const { username, email } = req.body;

    const isUsernameTaken = findUserBy("username", username);
    if(isUsernameTaken !== undefined) {
        return res.status(400).send({ errorMessage: "Username taken find a new one" });
    }

    const isEmailTaken = findUserBy("email", email);
    if(isEmailTaken !== undefined) {
        return res.status(400).send({ errorMessage: "Email already in use" });
    }

    next();
}



function validatePasswordResetRequest(req, res, next) {
    const { email } = req.body;
    
    const foundUser = findUserBy("email", email)
    if ( foundUser === undefined ) {
        return res.status(404).send({ errorMessage: "No user found with that email" });
    }

    const currentTime = new Date();
    if (foundUser.ratelimitExperation > currentTime) {
        const seconds = Math.floor((foundUser.ratelimitExperation - currentTime) / 1000);
        return res.status(400).send({ errorMessage: `Wait ${seconds} seconds before requesting new reset link` })
    }

    req.user = foundUser;
    next();
}



function validateResetToken(req, res, next) {
    const { resetToken } = req.body;

    let foundUser = users.find((user) => user.resetPasswordRequet.resetToken === resetToken);
    if (foundUser === undefined) {
        return res.status(404).send({ errorMessage: "Invalid reset token" });
    }

    const currentTime = new Date();
    if(foundUser.resetPasswordRequet.expiration < currentTime) {
        return res.status(400).send({ errorMessage: "The request has expired" })
    }

    req.user = foundUser;
    next();
}



// function isAlreadySignedIn(req, res, next) {
//     if(req.session.isSignedIn) {
//         next();
//     } 

//     return res.status(401).send({ errorMessage: "Authentication required" });
// }



export default router;
