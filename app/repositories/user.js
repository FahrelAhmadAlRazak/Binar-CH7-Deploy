

const {User} = require('../models')


function register(payload) {
    const dataUser = User.create(payload);
    return dataUser;
}


function getUserByEmail(email){
    const user = User.findOne({where:{email}});
    return user
}

function getUserByPk(id){
    const user = User.findByPk(id)
    return user;
}

module.exports={
    register,
    getUserByEmail,
    getUserByPk
}