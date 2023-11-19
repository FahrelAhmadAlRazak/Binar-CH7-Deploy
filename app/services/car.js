const carRepository = require('../repositories/car')
const ApplicationError = require('../../config/errors/ApplicationError')


async function listCar() {
    try {
      const cars = await carRepository.getListCars();
      return cars;
    } catch (err) {
      throw new ApplicationError(`Failed to get list of cars: ${err.message}`,500);
    }
  }

async function createCar(bodyWithoutId, userId) {
  try {
       
    const result = await carRepository.createNewCar(bodyWithoutId, userId);
    return result;
  } catch (err) {
    throw new ApplicationError(`Failed to create a car: ${err.message}`,500);
  }
}


async function getCarById (id) {
  try {
    const car = await carRepository.findCarsByPk(id);
    if(!car){
      throw new ApplicationError("Car not found",404);
    }
    return car;
  } catch (err) {
    throw new ApplicationError(`Failed to get car by id: ${err.message}`, err.statusCode || 500);
  }
}

async function updateCarById (id, payload, userId) {
  try {
    const car = await carRepository.update(id, payload, userId);
    return car;
  } catch (err) {
    throw new ApplicationError(`Failed to update a car: ${err.message}`,500);
  }

}

function deleteById (id, userId) {
  try {
    return Promise.all([carRepository.destroy(id),carRepository.updateDestroy(id, {deletedBy:userId, updatedBy: null }, userId)])
    
  } catch (err) {
    throw new ApplicationError(`Failed to delete a car: ${err.message}`,500);
  }
}



module.exports = {
    listCar,
    createCar,
    getCarById,
    updateCarById,
    deleteById
};