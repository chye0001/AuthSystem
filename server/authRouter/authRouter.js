import { isValidPassword } from "../util/bcrypt.js";
import dotenv from 'dotenv';
import { Router } from "express";

const env = dotenv.config();
const router = Router();

let users = [{
    id: 1,
    username: "test",
    password: "$2a$12$rC1vHxUFxCchYTIsbrjRc.X1cSdxW/F3Xt4XUlmIPLhxw1oS3aWmq"
}]

function isAlreadySignedIn(req, res, next) {
    if(req.session.isSignedIn) {
        next();
    } 

    return res.status(401).send({ errorMessage: "Authentication required" });
}

router.post("/api/v1/signin", isAlreadySignedIn, async (req, res) => {
    const credentials = req.body;

    const foundUserIndex = users.findIndex( (user) => user.username === credentials.username );
    if (foundUserIndex === -1) {
        res.status(401).send({errorMessage: "Wrong credentials"});
    }
    res.redirect()
    const foundUser = users[foundUserIndex];
    if (await isValidPassword(credentials.password, foundUser.password)) {
        req.session.isSignedIn = (req.session.isSignedIn) || true
        //TODO send email
        res.send({ username: foundUser.username });
        
    } else {
        res.status(401).send({errorMessage: "Wrong credentials"});
    }
})



export default router;