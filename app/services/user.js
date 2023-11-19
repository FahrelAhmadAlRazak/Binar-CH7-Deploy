const userRepository = require("../repositories/user");
const ApplicationError = require("../../config/errors/ApplicationError");
const authService = require('./auth')




async function createUserAdmin(body, isAdmin) {
    try {
        const { email, name, address, phoneNumber, password } = body;
        const hashedPassword = await authService.encryptPassword(password);
        const result = await userRepository.register({
           email,
           name,
           address,
           phoneNumber,
            encryptedPassword: hashedPassword,
            role: isAdmin ? 'ADMIN' : 'MEMBER'
        });
        return result;

    } catch (err) {
        throw new ApplicationError(`Failed to create a user: ${err.message}`, 500);
    }
}

async function createUser(payload, password, isAdmin) {
    try {
        const hashedPassword = await authService.encryptPassword(password);
        const result = await userRepository.register({
            ...payload,
            encryptedPassword: hashedPassword,
            role: isAdmin ? 'ADMIN' : 'MEMBER'
        });
        return result;

    } catch (err) {
        throw new ApplicationError(`Failed to create a user: ${err.message}`, 500);
    }
}

async function loginUser(body) {
    try {
        const { email, password } = body;
        if (!email || !password) {
            throw new ApplicationError("Please input your email or password", 401);
        }
        const user = await userRepository.getUserByEmail(email);
        if (!user) {
            throw new ApplicationError("User not found", 401);
        }

        const matchPassword = await authService.checkPassword(password, user.encryptedPassword);

        if(!matchPassword){
            throw new ApplicationError("Incorrect Password", 401);
        }

        const token = authService.createToken({id: user.id})
        const userWithToken = {...user.dataValues, token}
        return userWithToken;
    } catch (err) {
    
        throw new ApplicationError(`Failed to login: ${err.message}`, err.statusCode || 500);
    }
}



module.exports = {
    createUser,
    loginUser,
    createUserAdmin
}