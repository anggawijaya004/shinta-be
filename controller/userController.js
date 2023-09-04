const { User, Layanan, Appoinment, Admin } = require("../models");
const { responseSuccess, responseError } = require("../utils/response");
const { filter } = require("../helpers/pagination");
const db = require("../models");
const Op = db.Sequelize.Op;
const fs = require("fs");
const path = require("path");
const base = __dirname;
const { comparePassword } = require("../helpers/bcrypt");
const { server } = require("../utils/server");
const readXlsxFile = require("read-excel-file/node");
const { ExcelImportCreate } = require("../utils/import");

const importData = async (req, res, next) => {
  try {
    if (req.file === undefined) {
      return res.status(400).send("Silahkan upload file format excel");
    }
    let dir = path.join(base, "../");

    let file = dir + "/public/file/excel/" + req.file.filename;

    readXlsxFile(file).then((rows) => {
      const { users } = ExcelImportCreate(rows);
      User.bulkCreate(users, {
        updateOnDuplicate: [
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
          "password",
        ],
      })
        .then(() => {
          res.status(200).send({
            message: "Uploaded the file successfully: " + req.file.originalname,
          });
        })
        .catch((error) => {
          res.status(500).send({
            message: "Fail to import data into database!",
            error: error.message,
          });
        });
    });
  } catch (error) {
    responseError(res, error);
  }
};

const getUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const offset = limit * page;
    let { name, noKK, npm, prov, kab, kec, kel, rw, rt } = req.query;

    let filterValue = {
      prov,
      kab,
      kec,
      kel,
      rw,
      rt,
      noKK: noKK ? { [Op.like]: "%" + noKK + "%" } : null,
      npm: npm ? { [Op.like]: "%" + npm + "%" } : null,
      name: name ? { [Op.like]: "%" + name + "%" } : null,
    };
    let filtered = filter(filterValue);
    //hitung jumlah rows
    const totalRows = await User.count({
      where: {
        ...filtered,
      },
    });
    //hitung jumlah page
    const totalPage = Math.ceil(totalRows / limit);
    //ambil data user
    const result = await User.findAll({
      where: {
        ...filtered,
      },
      offset: offset,
      limit: limit,
      order: [["id", "DESC"]],
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
    const data = {
      result: result,
      page: page,
      limit: limit,
      totalRows: totalRows,
      totalPage: totalPage,
    };
    responseSuccess(res, data);
  } catch (err) {
    responseError(res, err);
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await User.findOne({
      where: { id },
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
      include: [
        {
          model: Appoinment,
          attributes: ["id", "date"],
          include: [
            { model: Layanan, attributes: ["name"] },
            { model: Admin, attributes: ["name"] },
          ],
        },
      ],
    });
    if (!data) {
      const err = {
        code: 404,
        name: "NotFoundError",
        message: "data not found, u must be confused ?",
      };
      responseError(res, err);
    } else {
      responseSuccess(res, data);
    }
  } catch (err) {
    responseError(res, err);
  }
};

const createUser = async (req, res) => {
  const {
    name,
    noKK,
    npm,
    tempatLahir,
    tglLahir,
    jenisKelamin,
    phone,
    prov,
    kab,
    kec,
    kel,
    rw,
    rt,
    alamat,
    statusPerkawinan,
    statusDisabilitas,
    username,
    password,
  } = req.body;

  // if (req.file) {
  //   const { filename: image } = req.file;
  //   fotoKTP = server + "/public/image/relawan/resize/" + req.file.filename;
  //   await sharp(req.file.path)
  //     .resize(700)
  //     .jpeg()
  //     .toFile(path.resolve(req.file.destination, "resize", image));
  // } else {
  //   fotoKTP = null;
  // }
  try {
    const data = await User.create({
      name,
      noKK,
      npm,
      tempatLahir,
      tglLahir,
      jenisKelamin,
      phone,
      prov,
      kab,
      kec,
      kel,
      rw,
      rt,
      alamat,
      statusPerkawinan,
      statusDisabilitas,
      username,
      password,
    });
    if (data) {
      responseSuccess(res, { msg: "success create user" });
    }
    // }
  } catch (err) {
    if (
      req.file &&
      fs.existsSync(`./public/image/relawan/${req.file.filename}`)
    ) {
      fs.unlinkSync(`./public/image/relawan/${req.file.filename}`);
    }
    responseError(res, err);
  }
};

const destroyUser = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await User.findOne({ where: { id } });
    if (!data) {
      const err = {
        code: 404,
        name: "NotFoundError",
        message: "data not found, u must be confused ?",
      };
      responseError(res, err);
    } else {
      const dataDestroy = await data.destroy();
      if (dataDestroy) {
        responseSuccess(res, {
          msg: "Your data has been successfully deleted",
        });
        // if (
        //   data.fotoKTP &&
        //   fs.existsSync(
        //     `./public/image/relawan/resize/${data.fotoKTP
        //       .split(`${server}/public/image/relawan/resize`)
        //       .join("")}`
        //   )
        // ) {
        //   fs.unlinkSync(
        //     `./public/image/relawan/resize/${data.fotoKTP
        //       .split(`${server}/public/image/relawan/resize`)
        //       .join("")}`
        //   );
        // }
      }
    }
  } catch (err) {
    return responseError(res, err);
  }
};

const updateUserPassword = async (req, res, next) => {
  let { id } = req.params;
  try {
    const dataFind = await User.findOne({
      where: { id },
    });
    if (
      req.logedUser.role != 1 ||
      req.logedUser.role != 2 ||
      req.logedUser.role != 3
    ) {
      id = req.logedUser.id;
    }
    const { newPassword, confirmPassword } = req.body;
    if (!dataFind) {
      const err = {
        code: 404,
        name: "NotFoundError",
        message: "data not found, u must be confused ?",
      };
      responseError(res, err);
    } else {
      if (newPassword == confirmPassword) {
        const password = newPassword;
        const data = await dataFind.update({
          password: password,
        });
        if (data) {
          responseSuccess(res, {
            msg:
              "Your data with id " +
              id +
              " has been successfully update password",
          });
        }
      } else {
        return res.status(404).json({
          code: 404,
          succes: false,
          message: "your password not match",
        });
      }
    }
  } catch (err) {
    return responseError(res, err);
  }
};

const updateUserPasswordbyUser = async (req, res, next) => {
  try {
    let id = req.logedUser.id;

    const { oldPassword, newPassword } = req.body;

    const dataFind = await User.findOne({
      where: { id },
    });
    if (comparePassword(oldPassword, dataFind.password)) {
      const password = newPassword;
      const data = await dataFind.update({
        password: password,
      });
      if (data) {
        responseSuccess(res, {
          msg: "Berhasil ganti password",
        });
      }
    } else {
      const err = {
        code: 401,
        name: "BadRequest",
        message: "Password invalid",
      };
      responseError(res, err);
    }
  } catch (err) {
    return responseError(res, err);
  }
};

const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const {
    name,
    noKK,
    npm,
    tempatLahir,
    tglLahir,
    jenisKelamin,
    phone,
    prov,
    kab,
    kec,
    kel,
    rw,
    rt,
    alamat,
    statusPerkawinan,
    statusDisabilitas,
    username,
  } = req.body;
  try {
    const dataFind = await User.findOne({
      where: { id },
    });
    if (!dataFind) {
      const err = {
        code: 404,
        name: "NotFoundError",
        message: "data not found, u must be confused ?",
      };
      responseError(res, err);
    } else {
      // let fotoKTP = dataFind.fotoKTP;
      // if (req.file) {
      //   const { filename: image } = req.file;
      //   fotoKTP = server + "/public/image/relawan/resize/" + req.file.filename;
      //   await sharp(req.file.path)
      //     .resize(700)
      //     .jpeg()
      //     .toFile(path.resolve(req.file.destination, "resize", image));
      // }
      const data = await User.update(
        {
          name,
          noKK,
          npm,
          tempatLahir,
          tglLahir,
          jenisKelamin,
          phone,
          prov,
          kab,
          kec,
          kel,
          rw,
          rt,
          alamat,
          statusPerkawinan,
          statusDisabilitas,
          username,
        },
        {
          where: { id },
        }
      );
      if (data) {
        // if (
        //   req.file &&
        //   fs.existsSync(
        //     `./public/image/relawan/resize/${dataFind.fotoKTP
        //       .split(`${server}/public/image/relawan/resize`)
        //       .join("")}`
        //   )
        // ) {
        //   fs.unlinkSync(
        //     `./public/image/relawan/resize/${dataFind.fotoKTP
        //       .split(`${server}/public/image/relawan/resize`)
        //       .join("")}`
        //   );
        // }
        responseSuccess(res, {
          msg: "Your data with id " + id + " has been successfully update",
        });
      }
    }
  } catch (err) {
    return responseError(res, err);
  }
};

const updatePhoto = async (req, res, next) => {
  const { id } = req.logedUser;

  try {
    const dataFind = await User.findOne({
      where: { id },
    });
    let photo = dataFind.photo;
    if (req.file) {
      const { filename: image } = req.file;
      photo = server + "/public/image/resize/" + req.file.filename;
      await sharp(req.file.path)
        .resize(700)
        .jpeg()
        .toFile(path.resolve(req.file.destination, "resize", image));
    }
    const data = await User.update(
      {
        photo,
      },
      {
        where: { id },
      }
    );
    if (data) {
      // if (
      //   req.file &&
      //   fs.existsSync(
      //     `./public/image/relawan/resize/${dataFind.fotoKTP
      //       .split(`${server}/public/image/relawan/resize`)
      //       .join("")}`
      //   )
      // ) {
      //   fs.unlinkSync(
      //     `./public/image/relawan/resize/${dataFind.fotoKTP
      //       .split(`${server}/public/image/relawan/resize`)
      //       .join("")}`
      //   );
      // }
      responseSuccess(res, {
        msg: "Foto profile berhasil diupdate",
      });
    }
  } catch (err) {
    return responseError(res, err);
  }
};

const updateStatusUser = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  if (!status) {
    const err = {
      code: 400,
      name: "BadRequest",
      message: "Status harus diisi!",
    };
    responseError(res, err);
  }
  try {
    const dataFind = await User.findOne({
      where: { id },
    });
    if (!dataFind) {
      const err = {
        code: 404,
        name: "NotFoundError",
        message: "data not found, u must be confused ?",
      };
      responseError(res, err);
    } else {
      const data = await User.update(
        {
          status,
        },
        { where: { id } }
      );
      if (data) {
        responseSuccess(res, {
          msg: "Your data with id " + id + " has been successfully update",
        });
      }
    }
  } catch (err) {
    return responseError(res, err);
  }
};

module.exports = {
  getUser,
  getUsers,
  createUser,
  destroyUser,
  updateUser,
  updateUserPassword,
  updateStatusUser,
  updateUserPasswordbyUser,
  updatePhoto,
  importData,
};
