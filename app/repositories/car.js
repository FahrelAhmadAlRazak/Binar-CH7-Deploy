const { Car, User } = require("../models");



async function getListCars() {
    try {
        const carList = await Car.findAll({
            include: [
                {
                    model: User,
                    as: 'created'
                },
                {
                    model:User,
                    as:'updated',
                },
                {
                    model:User,
                    as: 'deleted'
                }
            ]
        });

        return carList;
    } catch (error) {
      
        console.error('Gagal mengambil daftar mobil:', error);
        throw error; 
    }
}


function createNewCar(bodyWithoutId, userId) {
    const dataCar = Car.create({...bodyWithoutId, createdBy:userId});
    return dataCar;
}

async function findCarsByPk(id) {
    try {
        
        const dataFindByPk = await Car.findByPk(id, {
            
            include:
                [
                    {
                        model: User,
                        as: 'created',
                        attributes: { exclude: ['password'] }
    
                    },
                    {
                        model: User,
                        as: 'updated',
                        attributes: { exclude: ['password'] }
    
                    },
                    {
                        model: User,
                        as: 'deleted',
                        attributes: { exclude: ['password'] }
    
                    },
                ],
        });
        return dataFindByPk;
    } catch (error) {
        
         console.error('Gagal mengambil daftar mobil:', error);
         throw error; 
    }


}

function update(id, payload, userId) {
    const result = Car.update({...payload, updatedBy:userId} ,{ where: { id },returnig: true, paranoid:false });
    return result;
}

function updateDestroy(id, payload, userId) {
    const result = Car.update({...payload, updatedBy:null} ,{ where: { id },returnig: true, paranoid:false });
    return result;
}



function destroy(id) {
    const resultDelete = Car.destroy({ where: { id } });
    return resultDelete;
}

module.exports = {
    getListCars,
    createNewCar,
    findCarsByPk,
    update,
    destroy,
    updateDestroy
  
};