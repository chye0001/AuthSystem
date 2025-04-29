import { isValidPassword } from '../util/bcrypt.js';
import usersRepository from '../database/usersRepository.js';

async function validateCredentials(req, res, next) {
    const { username, password } = req.body;
    
    if(!username || !password) {
        return res.status(403).send({errorMessage: "Username and password must be included"});
    }
    
    const foundUser = await usersRepository.getUserBy("username", username);
    if (foundUser === null) {
        return res.status(401).send({errorMessage: "Wrong credentials"});
    }

    const isCorrectPassword = await isValidPassword(password, foundUser.password);
    if(!isCorrectPassword) {
       return res.status(401).send({errorMessage: "Wrong credentials"});
    }

    req.user = foundUser;
    next();
}



async function validateUniqueCredentials(req, res, next) {
    const { username, email, password } = req.body;

    if(!username || !email || !password) {
        return res.status(403).send({ errorMessage: "username, email and password must be included"})
    }

    const isUsernameTaken = await usersRepository.getUserBy("username", username);
    if(isUsernameTaken !== null) {
        return res.status(400).send({ errorMessage: "Username taken find a new one" });
    }

    const isEmailTaken = await usersRepository.getUserBy("email", email);
    if(isEmailTaken !== null) {
        return res.status(400).send({ errorMessage: "Email already in use" });
    }

    next();
}



async function validatePasswordResetRequest(req, res, next) {
    const { email } = req.body;
    
    if(!email) {
        return res.status(403).send({ errorMessage: "email must be included in the request"})
    }

    const foundUser = await usersRepository.getUserBy("email", email)
    if ( foundUser === null ) {
        return res.status(404).send({ errorMessage: "No user found with that email" });
    }

    req.user = foundUser;
    next();
}


async function validateResetToken(req, res, next) {
    const { resetToken, newPassword } = req.body;
    
    if(!resetToken) {
        return res.status(403).send({ errorMessage: "Reset token not included in request"});
    }

    if(!newPassword) {
        return res.status(403).send({ errorMessage: "You must send a new password in the request"});
    }

    let foundUser = await usersRepository.getUserByResetToken(resetToken);
    if (foundUser === null) {
        return res.status(404).send({ errorMessage: "Invalid reset token" });
    }

    const currentTime = new Date();
    if(foundUser.resetToken.expiration_date < currentTime) {
        return res.status(400).send({ errorMessage: "The password reset token has expired, send a new reset password request" })
    }

    req.user = foundUser;
    next();
}



export {
    validateCredentials,
    validateUniqueCredentials,
    validatePasswordResetRequest,
    validateResetToken
}
