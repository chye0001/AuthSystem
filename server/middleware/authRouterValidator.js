import { isValidPassword } from '../util/bcrypt.js';
import { users } from '../router/authRouter.js';

async function validateCredentials(req, res, next) {
    const { username, password } = req.body;
    
    if(!username || !password) {
        return res.status(403).send({errorMessage: "Username and password must be included"});
    }

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



function findUserBy(field, value) {
    return users.find((user) => user[field] === value);
}



export {
    validateCredentials,
    validateUniqueCredentials,
    validatePasswordResetRequest,
    validateResetToken
}
