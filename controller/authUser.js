const { User, Appoinment, Layanan, Admin } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwebtoken");
const { responseError, responseSuccess } = require("../utils/response");

const login = async (req, res, next) => {
  try {
    let { username, password } = req.body;
    const user = await User.findOne({
      where: { username },
      include: [
        {
          model: Appoinment,
          attributes: ["date"],
          include: [
            { model: Layanan, attributes: ["name"] },
            { model: Admin, attributes: ["name"] },
          ],
        },
      ],
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
        name: user.name,
        noKK: user.noKK,
        npm: user.npm,
        tempatLahir: user.tempatLahir,
        tglLahir: user.tglLahir,
      };
      let token = generateToken(profile);
      responseSuccess(res, {
        token,
        profile: {
          id: user.id,
          name: user.name,
          noKK: user.noKK,
          npm: user.npm,
          tempatLahir: user.tempatLahir,
          tglLahir: user.tglLahir,
          jenisKelamin: user.jenisKelamin,
          phone: user.phone,
          prov: user.prov,
          kab: user.kab,
          kec: user.kab,
          kel: user.kel,
          rw: user.rw,
          rt: user.rt,
          alamat: user.alamat,
          statusPerkawinan: user.statusPerkawinan,
          statusDisabilitas: user.statusDisabilitas,
          username: user.username,
          appoinment: user.Appoinment,
        },
      });
    } else {
      responseError(res, {
        status: 400,
        message: "Username atau Password salah!",
      });
    }
  } catch (error) {
    responseError(res, error);
  }
};

const logout = async (req, res) => {
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
};

const userProfil = async (req, res) => {
  try {
    const { id } = req.logedUser;
    const data = await User.findOne({
      where: { id },
      include: [
        {
          model: Appoinment,
          attributes: ["date"],
          include: [
            { model: Layanan, attributes: ["name"] },
            { model: Admin, attributes: ["name"] },
          ],
        },
      ],
      attributes: [
        "id",
        "name",
        "noKK",
        "npm",
        "tempatLahir",
        "tglLahir",
        "jenisKelamin",
        "phone",
        "prov",
        "kab",
        "kec",
        "kel",
        "rw",
        "rt",
        "alamat",
        "statusPerkawinan",
        "statusDisabilitas",
        "username",
      ],
    });
    responseSuccess(res, data);
  } catch (err) {
    return responseError(res, err);
  }
};

module.exports = { login, userProfil };
