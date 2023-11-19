


'use strict';
const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    static associate(models) {
      // Define associations here, if needed
      Car.belongsTo(models.User, {
        foreignKey: 'createdBy',
        as: 'created',
      });
      Car.belongsTo(models.User, {
        foreignKey: 'updatedBy',
        as: 'updated',
      });
      Car.belongsTo(models.User, {
        foreignKey: 'deletedBy',
        as: 'deleted',
      });
    }
  }

  Car.init({
    image: DataTypes.STRING,
    capacity: DataTypes.INTEGER,
    rentperday: DataTypes.INTEGER,
    description: DataTypes.STRING,
    availableAt: DataTypes.DATE,
    createdBy: DataTypes.UUID,
    updatedBy: DataTypes.UUID,
    deletedBy: DataTypes.UUID,
  }, {
    sequelize,
    modelName: 'Car',
    paranoid: true,
  });
  Car.beforeCreate((car) => (car.id = uuidv4()));

  // Add any other necessary configurations and associations here

  return Car;
};
