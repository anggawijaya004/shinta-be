"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      noKK: {
        type: Sequelize.STRING,
      },
      npm: {
        type: Sequelize.STRING,
      },
      tempatLahir: {
        type: Sequelize.STRING,
      },
      tglLahir: {
        type: Sequelize.STRING,
      },
      jenisKelamin: {
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.STRING,
      },
      prov: {
        type: Sequelize.STRING,
      },
      kab: {
        type: Sequelize.STRING,
      },
      kec: {
        type: Sequelize.STRING,
      },
      kel: {
        type: Sequelize.STRING,
      },
      rw: {
        type: Sequelize.STRING,
      },
      rt: {
        type: Sequelize.STRING,
      },
      alamat: {
        type: Sequelize.STRING,
      },
      statusPerkawinan: {
        type: Sequelize.STRING,
      },
      statusDisabilitas: {
        type: Sequelize.STRING,
      },
      username: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.TEXT,
      },
      photo: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
