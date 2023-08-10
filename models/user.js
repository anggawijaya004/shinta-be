"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Appoinment, { foreignKey: "idUser" });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      noKK: DataTypes.STRING,
      npm: DataTypes.STRING,
      tempatLahir: DataTypes.STRING,
      tglLahir: DataTypes.STRING,
      jenisKelamin: DataTypes.STRING,
      phone: DataTypes.STRING,
      prov: DataTypes.STRING,
      kab: DataTypes.STRING,
      kec: DataTypes.STRING,
      kel: DataTypes.STRING,
      rw: DataTypes.STRING,
      rt: DataTypes.STRING,
      alamat: DataTypes.STRING,
      statusPerkawinan: DataTypes.STRING,
      statusDisabilitas: DataTypes.STRING,
      username: { type: DataTypes.STRING, allowNull: false, unique: true },
      password: DataTypes.TEXT,
      photo: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      hooks: {
        beforeCreate: (user) => {
          user.password = hashPassword(user.password);
        },
        beforeUpdate: (User) => {
          User.password = hashPassword(User.password);
        },
      },
    }
  );
  return User;
};
