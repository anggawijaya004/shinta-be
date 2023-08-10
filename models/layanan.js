"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Layanan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Layanan.hasMany(models.Admin, { foreignKey: "idLayanan" });
      Layanan.hasMany(models.Appoinment, { foreignKey: "idLayanan" });
    }
  }
  Layanan.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Layanan",
      tableName: "layanans",
    }
  );
  return Layanan;
};
