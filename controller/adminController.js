const { Admin, Layanan } = require("../models");
const { responseSuccess, responseError } = require("../utils/response");
const { filter } = require("../helpers/pagination");
const db = require("../models");
const Op = db.Sequelize.Op;

const getAdmins = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const name = req.query.cari || "";
    const offset = limit * page;
    let { idLayanan, role } = req.query;

    let filterValue = { idLayanan, role };
    let filtered = filter(filterValue);
    let searchV = name
      ? {
          [Op.or]: [
            {
              name: {
                [Op.like]: "%" + name + "%",
              },
              username: {
                [Op.like]: "%" + name + "%",
              },
            },
          ],
        }
      : null; //end ternary operator
    //hitung jumlah rows
    const totalRows = await Admin.count({
      where: {
        ...filtered,
        ...searchV,
      },
    });
    //hitung jumlah page
    const totalPage = Math.ceil(totalRows / limit);
    //ambil data user
    const result = await Admin.findAll({
      where: {
        ...filtered,
        ...searchV,
      },
      include: [{ model: Layanan, attributes: ["name"] }],
      offset: offset,
      limit: limit,
      order: [["id", "DESC"]],
      attributes: ["id", "username", "name", "phone", "idLayanan"],
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

const getOptAdmins = async (req, res) => {
  try {
    const data = await Admin.findAll({
      include: [{ model: Layanan, attributes: ["name", "id"] }],

      order: [["id", "DESC"]],
      attributes: ["id", "name", "idLayanan"],
    });

    responseSuccess(res, data);
  } catch (err) {
    responseError(res, err);
  }
};

const getAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Admin.findOne({
      where: { id },
      attributes: ["id", "username", "name", "phone", "idLayanan"],
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

const createAdmin = async (req, res) => {
  const { name, username, password, role, idLayanan, phone } = req.body;
  try {
    const data = await Admin.create({
      name,
      role,
      idLayanan,
      phone,
      username,
      password,
    });
    if (data) {
      responseSuccess(res, { msg: "success create user" });
    } else {
      responseError(res, { msg: "err" });
    }
  } catch (err) {
    responseError(res, err);
  }
};

const destroyAdmin = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Admin.findOne({ where: { id } });
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
          msg: "Your data has been deleted successfully",
        });
      }
    }
  } catch (err) {
    return responseError(res, err);
  }
};

const updateAdminPassword = async (req, res, next) => {
  const { id } = req.params;
  try {
    const dataFind = await Admin.findOne({
      where: { id },
    });
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

const updateAdmin = async (req, res, next) => {
  const { id } = req.params;
  const { name, role, idLayanan, phone, username } = req.body;
  try {
    const dataFind = await Admin.findOne({
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
      const data = await dataFind.update({
        name,
        role,
        idLayanan,
        phone,
        username,
      });
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
  getAdmins,
  createAdmin,
  getAdmin,
  destroyAdmin,
  updateAdminPassword,
  updateAdmin,
  getOptAdmins,
};
