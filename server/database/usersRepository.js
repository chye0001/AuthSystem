import { prisma } from "../prisma/prismaClient.js";

async function getUserBy(key, value) {
    try {
        return await prisma.users.findUnique({
            where: { [key]: value }
        });

    } catch (error) {
        console.error(error);
    }
}

async function createNewUser(username, email, hashedPassword) {
    try {
        return await prisma.users.create({
            data: {
                username: username,
                email: email,
                password: hashedPassword
            }
        })
    } catch (error) {
        console.error(error);
    }
}



async function getUserByResetToken(token) {
    try {
        const retrivedResetToken = await prisma.password_reset_tokens.findUnique({
            where: { "token": token },
            include: {
                users: true,
            },
        });

        if (!retrivedResetToken) {
            return null;
        }

        const user = retrivedResetToken.users;
        user.resetToken = retrivedResetToken;
        return user;

    } catch (error) {
        console.error(error);
    }
}

async function createPasswordResetRequest(resetToken, userId) {
    try {
        await prisma.password_reset_tokens.create({
            data: {
                token: resetToken,
                users: {
                    connect: {
                        id: userId
                    }
                }
            }
        })

    } catch (error) {
        console.error(error);
    }
}

async function resetPassword(newPassword, userId, resetToken) {
    
    try {
        //invalidate the reset token first. This makes sense because before reaching this point we have validated the token.
        //also the token most be invalidated so it cant be used again, also I have invalidated instead of deleting it keeping track of what has happened.
        //maybe it does not matter if it is deleted or not since a record is not needed since profesionally we should have a log that logs every db interaction?
        const isDestroyed = await destroyResetToken(resetToken)
        if(!isDestroyed) {
            return false;
        }

        const updatedUser = await prisma.users.update({
            where: {
                id: userId
            },
            data: {
                password: newPassword
            }
        })

        if (!updatedUser) {
            return false;
        }

        return true;

    } catch (error) {
        console.error(error);
    }
}

async function destroyResetToken(resetToken) {
    try {
        const isDestroyed = await prisma.password_reset_tokens.delete({
            where: {
                token: resetToken
            }
        })

        if (!isDestroyed) {
            return false;
        }

        return true;

    } catch (error) {
        console.error(error);
    }
}


async function getRegisteredIpsBy(username) {
    try {
        const user = await prisma.users.findUnique({
            where: { username: username },
            include: { ips: true }
        });

        if (!user) {
            return [];
        }

        return user.ips;
    } catch (error) {
        console.error(error);
    }
}

async function registerNewIp(newlyRegisteredIp, userId) {
    try {
        await prisma.ips.create({
            data: {
                ip: newlyRegisteredIp,
                users: {
                    connect: {
                        id: userId
                    }
                }
            }
        });

    } catch (error) {
        console.error(error);
    }
}


export default { getUserBy, getUserByResetToken, createPasswordResetRequest, resetPassword, getRegisteredIpsBy, registerNewIp, createNewUser }
