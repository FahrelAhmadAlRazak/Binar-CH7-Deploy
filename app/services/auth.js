const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/user');
const ApplicationError = require('../../config/errors/ApplicationError')


const SALT = 10;


const encryptPassword = async (password) => {
    try {
        const hash = await bcrypt.hash(password, SALT);
        return hash;
    } catch (err) {
        throw new Error(err);
    }
}

const checkPassword = async (password, hash) => {
    try {
        const result = await bcrypt.compare(password, hash);
        return result
    } catch (err) {
        throw new Error(err);
    }
}

const JWT_SECRET_KEY = 'FSW1';

const createToken = (payload) => {
    return jwt.sign(payload, JWT_SECRET_KEY)
}


const verifiedToken = (token) => {
    return jwt.verify(token, JWT_SECRET_KEY)
}

const authorized = async (bearerToken) => {
    try {
        if (!bearerToken) {
            throw new ApplicationError("Unauthorized bearer token", 401);
        }
        const token = bearerToken.split("Bearer ")[1];

        const decoded = await verifiedToken(token);

        const { id } = decoded;

        const user = await userRepository.getUserByPk(id);

        if (!user) {
            throw new ApplicationError("Unauthorized user", 401);
        }

        return user;

    } catch (err) {
        throw new ApplicationError(`Failed to login: ${err.message}`, err.statusCode || 500);
    }
}

module.exports = {
    encryptPassword,
    createToken,
    verifiedToken,
    JWT_SECRET_KEY,
    checkPassword,
    authorized

};

