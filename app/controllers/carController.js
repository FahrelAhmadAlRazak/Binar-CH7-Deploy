
const carService = require("../services/car")


async function list(req, res) {
  try {
    const data = await carService.listCar();

    res.json({
      status : "OK",
      message : "Success",
      data
    });
  } catch (err) {
    res.status(err.statusCode).json({
      status : "FAIL",
      message : err.message
    });
  }
}

function detail(req, res) {
  
    res.json({
      status : "OK",
      message : "Success",
      data : req.car
    });
  
}

async function create(req, res) {
  try {
    
    const bodyWithoutId  = req.body;
    const {id: userId} = req.user;

   
    const data = await carService.createCar(bodyWithoutId, userId);
    res.json({
      status : "OK",
      message : "Success",
      data
    });
  } catch (err) {
    res.status(err.statusCode).json({
      status : "FAIL",
      message : err.message
    });
  }
}

async function destroy(req, res) {
  try{
    const id = req.params.id;
    const {id: userId} = req.user;
    data = await carService.deleteById(id, userId);
    res.json({
      status : "OK",
      message : "Success",
      data
    });
  }catch(err){
    res.status(err.statusCode).json({
      status : "FAIL",
      message : err.message
    });
  }
}

async function update(req, res) {
  try{
    const payload = req.body;
    const id = req.params.id;
    const {id: userId} = req.user;
    const data = await carService.updateCarById(id, payload, userId);
    res.json({
      status : "OK",
      message : "Success",
      data : data
    });
  }catch(err){
    res.status(err.statusCode).json({
      status : "FAIL",
      message : err.message
    });
  }
  
}

async function findAndSetById(req, res, next) {
  try {
    const  { id }  = req.params;
    // console.log(id);
    const car = await carService.getCarById(id);
    req.car = car;
    next();
  } catch (err) {
    res.status(err.statusCode || 500).json({
      status: 'FAIL',
      message: err.message,
    });
  }
}




module.exports = {
  list,
  detail,
  create,
  destroy,
  update,
  findAndSetById
};
