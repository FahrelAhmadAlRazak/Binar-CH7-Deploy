const authService = require('../services/auth');



const authorize = async (req, res, next) => {
    try {
        const bearerToken = req.headers.authorization;


        const user = await authService.authorized(bearerToken);
        req.user = user;
        next();

    } catch (err) {
        res.status(err.statusCode).json({
            status: "FAIL",
            message: err.message
        });
    }
}

const isSuperAdmin = (req, res, next) => {
    if (!req.user) {
        return res.status(403).json({
            status: "FAIL",
            message: "FORBIDDEN YOU ARE NOT AUTHENTICATED"
        });
    }

    const { role } = req.user;
    if (role !== 'SUPERADMIN') {
        res.status(403).json({
            status: "FAIL",
            message: "FORBIDDEN YOU ARE NOT SUPERADMIN"
        });
        return;
    } else {
        next();
    }
};


const isSuperOrAdmin = (req, res, next) => {

    const { role } = req.user;

    if (role !== 'SUPERADMIN' && role !== 'ADMIN') {
        res.status(403).json({
            status: "FAIL",
            message: "FORBIDDEN YOU ARE NOT SUPERADMIN OR ADMIN"
        });
        return
    }

    next();

}

module.exports = {
    authorize,
    isSuperAdmin,
    isSuperOrAdmin
}
