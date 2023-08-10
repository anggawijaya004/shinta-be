"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Appoinment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Appoinment.belongsTo(models.Admin, { foreignKey: "idAdmin" });
      Appoinment.belongsTo(models.User, { foreignKey: "idUser" });
      Appoinment.belongsTo(models.Layanan, { foreignKey: "idLayanan" });
    }
  }
  Appoinment.init(
    {
      date: DataTypes.STRING,
      idAdmin: DataTypes.INTEGER,
      idUser: DataTypes.INTEGER,
      idLayanan: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Appoinment",
      tableName: "appoinments"
    }
  );
  return Appoinment;
};
