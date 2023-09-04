const { Op } = require("sequelize");
const { filter } = require("../helpers/pagination");
const { Layanan } = require("../models");
const { responseError, responseSuccess } = require("../utils/response");

const getLayanans = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const offset = limit * page;
    let { cari } = req.query;

    let searchV = cari
      ? {
          [Op.or]: [{ name: { [Op.like]: "%" + cari + "%" } }],
        }
      : null;

    //hitung jumlah rows
    const totalRows = await Layanan.count({
      where: {
        ...searchV,
      },
    });
    //hitung jumlah page
    const totalPage = Math.ceil(totalRows / limit);
    //ambil data user
    const result = await Layanan.findAll({
      where: {
        ...searchV,
      },
      offset: offset,
      limit: limit,
      order: [["id", "DESC"]],
      attributes: ["id", "name"],
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

const getOptLayanans = async (req, res) => {
  try {
    const data = await Layanan.findAll({
      order: [["id", "DESC"]],
      attributes: ["id", ["name", "label"]],
    });
    responseSuccess(res, data);
  } catch (err) {
    responseError(res, err);
  }
};

const createLayanan = async (req, res) => {
  const { name } = req.body;
  try {
    const data = await Layanan.create({
      name,
    });
    if (data) {
      responseSuccess(res, { msg: "success create layanan" });
    }
  } catch (err) {
    responseError(res, err);
  }
};

const destroyLayanan = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Layanan.findOne({ where: { id } });
    if (!data) {
      const err = {
        code: 404,
        name: "NotFoundError",
        message: "data not found, u must be confused ?",
      };
      responseError(res, err);
    } else {
      const dataDestroy = await Layanan.destroy({ where: { id } });
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

const updateLayanan = async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const dataFind = await Layanan.findOne({
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
      const data = await Layanan.update(
        {
          name,
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
  getLayanans,
  createLayanan,
  updateLayanan,
  destroyLayanan,
  getOptLayanans,
};
