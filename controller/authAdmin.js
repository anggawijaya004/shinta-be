const { Admin, Layanan } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwebtoken");
const { responseError, responseSuccess } = require("../utils/response");

async function login(req, res, next) {
  try {
    let { username, password } = req.body;
    const user = await Admin.findOne({
      where: { username },
      include: [{ model: Layanan, attributes: ["name"] }],
    });
    if (!user) {
      responseError(res, {
        status: 400,
        message: `Username atau Password salah`,
      });
    }
    if (comparePassword(password, user.password)) {
      let profile = {
        id: user.id,
        role: user.role,
        name: user.name,
        layanan: user.Layanan,
        idLayanan: user.idLayanan,
        phone: user.phone,
      };
      let token = generateToken(profile);
      responseSuccess(res, { token, profile });
    } else {
      responseError(res, {
        status: 400,
        message: "Username atau Password salah!",
      });
    }
  } catch (error) {
    responseError(res, error);
  }
}

async function logout(req, res) {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      res.json({ message: "Logout sucessfully" }).status(200);
    } else {
      res.json({ message: "Token required" }).status(422);
    }
  } catch (error) {
    return responseError(res, error);
  }
}

async function userProfil(req, res) {
  try {
    const { id } = req.logedUser;
    const data = await Admin.findOne({
      where: { id },
      include: [{ model: Layanan, attributes: ["name"] }],
      attributes: ["id", "role", "name", "idLayanan", "phone"],
    });
    responseSuccess(res, data);
  } catch (err) {
    return responseError(res, err);
  }
}

module.exports = { login, userProfil };
