import bcrypt from 'bcryptjs';

const saltRounds = 12;

async function hashPassword(password) {
    return await bcrypt.hash(password, saltRounds);
}

async function isValidPassword(enteredPassword, storedHashedPassword) {
    return await bcrypt.compare(enteredPassword, storedHashedPassword);
}

export {
    hashPassword,
    isValidPassword
}