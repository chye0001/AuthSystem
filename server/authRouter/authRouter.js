import { isValidPassword } from "../util/bcrypt.js";
import dotenv from 'dotenv';
import { Router } from "express";
import { sendMail } from "../emailService/emailService.js";

const env = dotenv.config();
const router = Router();

let users = [{
    id: 1,
    username: "test",
    email: "test@email.com",
    password: "$2a$12$rC1vHxUFxCchYTIsbrjRc.X1cSdxW/F3Xt4XUlmIPLhxw1oS3aWmq",
    registedIps: new Set()
}]



function isAlreadySignedIn(req, res, next) {
    if(req.session.isSignedIn) {
        next();
    } 

    return res.status(401).send({ errorMessage: "Authentication required" });
}

router.post("/api/v1/signin", async (req, res) => {
    const { username, password } = req.body;

    const foundUserIndex = users.findIndex( (user) => user.username === username );
    if (foundUserIndex === -1) {
        res.status(401).send({errorMessage: "Wrong credentials"});
    }
    
    const foundUser = users[foundUserIndex];
    if (await isValidPassword(password, foundUser.password)) {
        req.session.isSignedIn = (req.session.isSignedIn) || true
        
        await sendEmailOnSignIn(foundUser, req);

        res.send({ username: foundUser.username });
        
    } else {
        res.status(401).send({errorMessage: "Wrong credentials"});
    }
})

//send email on first sign in and when detected new ip
async function sendEmailOnSignIn(foundUser, req) {
    
    const registedIps = foundUser.registedIps;
    const newSignInIp = req.ip;
   
    if(registedIps.size === 0) {
        await sendMail(foundUser.email, "Welcome!", "welcome to our platform") // on very first sign in
        foundUser.registedIps.add(req.ip);

    } else if (!registedIps.has(newSignInIp)) {
        await sendMail(foundUser.email, "New sign in", `We have detected a new sign in coming from this ip: ${newSignInIp}`)
        foundUser.registedIps.add(req.ip);
    }
}



export default router;