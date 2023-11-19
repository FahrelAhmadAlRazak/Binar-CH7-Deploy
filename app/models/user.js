

'use strict';
const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Define associations here, if needed
      User.hasMany(models.Car, {
        foreignKey: 'createdBy',
        as: 'created',
      });
      User.hasMany(models.Car, {
        foreignKey: 'updatedBy',
        as: 'updated',
      });
      User.hasMany(models.Car, {
        foreignKey: 'deletedBy',
        as: 'deleted',
      });
    }
  }

  User.init({
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    encryptedPassword: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING,
    role: {
      allowNull: false,
      type: DataTypes.ENUM('SUPERADMIN', 'ADMIN', 'MEMBER'),
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((user) => (user.id = uuidv4()));
  // Add any other necessary configurations and associations here

  return User;
};
