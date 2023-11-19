'use strict';

/** @type {import('sequelize-cli').Migration} */
const bcrypt = require('bcryptjs')
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('Users',[{
    name:'Fahrel Superadmin',
    email:'fahrel01@gmail.com',
    encryptedPassword: bcrypt.hashSync('fahrelsuper123', 10),
    phoneNumber:'0812222222',
    address:'Jl. Karimata',
    role:'SUPERADMIN',
    createdAt:new Date(),
    updatedAt:new Date()

   }])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
