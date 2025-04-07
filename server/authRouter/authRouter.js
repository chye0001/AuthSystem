import { sendEmailOnSignIn, sendEmailOnSignUp } from "../emailService/emailService.js";
import { hashPassword, isValidPassword } from "../util/bcrypt.js";
import dotenv from 'dotenv';
import { Router } from "express";

const env = dotenv.config();
const router = Router();

let nextId = 2;
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

        res.send({ username: foundUser.username, email: email });
        
    } else {
        res.status(401).send({errorMessage: "Wrong credentials"});
    }
})



router.post("/api/v1/signup", async (req, res) => {
    const { username, email, password } = req.body;

    const hashedPassword = await hashPassword(password);
    const newUser = {
        id: nextId++,
        username: username,
        email: email,
        password: hashedPassword,
        registedIps: new Set()
    }

    const isUsernameTaken = users.find( (user) => user.username === username );
    console.log(isUsernameTaken);
    
    if(isUsernameTaken !== undefined) {
        res.status(400).send({ errorMessage: "Username taken find a new one" })
        return;
    }

    const isEmailTaken = users.find((user) => user.email === email );
    if(isEmailTaken !== undefined) {
        res.status(400).send({ errorMessage: "Email already in use" })
        return;
    }

    users.push(newUser);

    const newUserDTO = {
        username: newUser.username,
        email: newUser.email,
        registedIps: new Set()
    }
    await sendEmailOnSignUp(newUserDTO, req);
    req.session.isSignedIn = (req.session.isSignedIn) || true
    res.send({ data: newUserDTO });
})



export default router;