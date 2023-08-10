const { Layanan } = require("../models");
const { responseError, responseSuccess } = require("../utils/response");

const getLayanans = async (req, res) => {
  try {
    const data = await Layanan.findAll({
      order: [["id", "DESC"]],
      attributes: ["id", "name"],
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
};
