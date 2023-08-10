"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Admin.belongsTo(models.Layanan, { foreignKey: "idLayanan" });
      Admin.hasMany(models.Appoinment, { foreignKey: "idAdmin" });
    }
  }
  Admin.init(
    {
      name: DataTypes.STRING,
      role: DataTypes.INTEGER,
      idLayanan: DataTypes.INTEGER,
      phone: DataTypes.STRING,
      username: { type: DataTypes.STRING, allowNull: false, unique: true },
      password: DataTypes.TEXT,
      photo: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Admin",
      tableName: "admins",
      hooks: {
        beforeCreate: (Admin) => {
          Admin.password = hashPassword(Admin.password);
        },
        beforeUpdate: (Admin) => {
          Admin.password = hashPassword(Admin.password);
        },
      },
    }
  );
  return Admin;
};
