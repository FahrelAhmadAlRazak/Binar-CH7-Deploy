const { Sequelize } = require('sequelize');



// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('db_cars', 'postgres', '0110', {
  host: 'localhost',
  dialect: 'postgres'
});



const test = async()=>{

    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

test();

module.exports = sequelize;