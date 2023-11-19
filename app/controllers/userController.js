const userService = require("../services/user")



async function createAdmin(req, res) {
    try {

        const body = req.body;
        const data = await userService.createUserAdmin(body, true);
        res.json({
            status: "OK",
            message: "Success",
            data
        });
    } catch (err) {
        res.status(err.statusCode).json({
            status: "FAIL",
            message: err.message
        });
    }
}


async function create(req, res) {
    try {

        const { password, ...payload } = req.body;
        const data = await userService.createUser(payload, password);
        res.json({
            status: "OK",
            message: "Success",
            data
        });
    } catch (err) {
        res.status(err.statusCode).json({
            status: "FAIL",
            message: err.message
        });
    }
}

async function login(req,res) {
    try {
        const body = req.body;
        const data = await userService.loginUser(body); 
        res.json({
            status: "OK",
            message: "Success",
            data
        });
    } catch (err) {
        res.status(err.statusCode).json({
            status: "FAIL",
            message: err.message
        });
    }
}


module.exports = {
    create,
    createAdmin,
    login
}