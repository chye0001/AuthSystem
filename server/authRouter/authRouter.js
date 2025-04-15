import { sendEmailOnSignIn, sendEmailOnSignUp, sendEmailWithResetLink, sendEmailConfirmPasswordChanged } from '../emailService/emailService.js';
import { hashPassword, isValidPassword } from '../util/bcrypt.js';
import { getUniqueRestPasswordId, getResetLink } from '../util/resetPassword.js';
import dotenv from 'dotenv';
import { Router } from 'express';

const env = dotenv.config();
const router = Router();

let nextId = 2;
let users = [{
    id: 1,
    username: "test",
    email: "test@email.com",
    password: "$2a$12$rC1vHxUFxCchYTIsbrjRc.X1cSdxW/F3Xt4XUlmIPLhxw1oS3aWmq", //123
    registedIps: new Set()
}]



function isAlreadySignedIn(req, res, next) {
    if(req.session.isSignedIn) {
        next();
    } 

    return res.status(401).send({ errorMessage: "Authentication required" });
}

router.post("/api/auth/signin", async (req, res) => {
    const { username, password } = req.body;
    
    const foundUser = findUserBy("username", username);
    
    if (foundUser === undefined) {
        res.status(401).send({errorMessage: "Wrong credentials"});
    }
    
    if (await isValidPassword(password, foundUser.password)) {
        req.session.isSignedIn = (req.session.isSignedIn) || true
        
        await sendEmailOnSignIn(foundUser, req);

        res.send({ username: foundUser.username, email: foundUser.email });
        
    } else {
        res.status(401).send({errorMessage: "Wrong credentials"});
    }
})

//TODO add signout endooint?



router.post("/api/auth/signup", async (req, res) => {
    const { username, email, password } = req.body;

    const hashedPassword = await hashPassword(password);
    const newUser = {
        id: nextId++,
        username: username,
        email: email,
        password: hashedPassword,
        registedIps: new Set()
    }

    const isUsernameTaken = findUserBy("username", username);
    if(isUsernameTaken !== undefined) {
        res.status(400).send({ errorMessage: "Username taken find a new one" })
        return;
    }

    const isEmailTaken = findUserBy("email", email);
    if(isEmailTaken !== undefined) {
        res.status(400).send({ errorMessage: "Email already in use" })
        return;
    }

    users.push(newUser);
    await sendEmailOnSignUp(newUser, req);
    req.session.isSignedIn = (req.session.isSignedIn) || true

    const newUserDTO = {
        username: newUser.username,
        email: newUser.email
    }
    res.send({ data: newUserDTO });
})



router.post("/api/auth/forgotpassword", async (req, res) => {
    const { email } = req.body;

    const foundUser = findUserBy("email", email)
    if ( foundUser === undefined ) {
        res.status(404).send({ errorMessage: "Invalid email" });
        return;
    }

    const uniqueRestPasswordId = getUniqueRestPasswordId();
    const resetPasswordRequet = {
        resetPasswordId: uniqueRestPasswordId,
        expiration: new Date(Date.now() + 20 * 60 * 1000) //20 minutes from now
    }
    foundUser.resetPasswordRequet = resetPasswordRequet;

    //TODO ensure in the frontend it routes to a page containing a form for reseting password
    // explore if you can use wildcards eks. /resetpassword/* then send the email to the backend and the unique id.
    const uniqueRestPasswordLink = getResetLink(uniqueRestPasswordId);
    await sendEmailWithResetLink(email, uniqueRestPasswordId);

    res.send({ data: uniqueRestPasswordLink });
})

router.put("/api/auth/resetpassword", async (req, res) => {
    const { email, resetPasswordId, newPassword } = req.body;

    let foundUser = findUserBy("email", email);
    if (foundUser === undefined) {
        res.status(404).send({ errorMessage: "Invalid email" });
    }

    const resetPasswordRequet = foundUser.resetPasswordRequet || undefined; // ensure application does not crash?
    if ( resetPasswordRequet === undefined || resetPasswordRequet.resetPasswordId !== resetPasswordId) {
        res.status(400).send({ errorMessage: "No resetpassword request found" });
        return;
    }

    const currentTime = new Date();
    if(resetPasswordRequet.expiration < currentTime) {
        res.status(400).send({ errorMessage: "The password reset request has expired" })
        return;
    }

    if ( resetPasswordRequet.resetPasswordId === resetPasswordId && resetPasswordRequet.expiration > currentTime) {
        foundUser = {...foundUser, password: await hashPassword(newPassword)};

        const userIndex = users.findIndex(user => user.email === email);
        if (userIndex !== -1) {
            users[userIndex] = foundUser;
        }
    }

    await sendEmailConfirmPasswordChanged(email);
    res.send({ data: {username: foundUser.username, email: foundUser.email}});
})



function findUserBy(field, value) {
    return users.find((user) => user[field] === value);
}



export default router;