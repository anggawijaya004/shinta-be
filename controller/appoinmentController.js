const { Appoinment, Admin, User, Layanan } = require("../models");
const { responseError, responseSuccess } = require("../utils/response");

const getAppoinments = async (req, res) => {
  try {
    const data = await Appoinment.findAll({
      order: [["id", "DESC"]],
      include: [
        { model: Admin, attributes: ["name"] },
        { model: User, attributes: ["name"] },
        { model: Layanan, attributes: ["name"] },
      ],
      attributes: ["id", "date", "idAdmin", "idUser", "idLayanan"],
    });
    responseSuccess(res, data);
  } catch (err) {
    responseError(res, err);
  }
};

const createAppoinment = async (req, res) => {
  const { date, idAdmin, idUser, idLayanan } = req.body;
  try {
    const data = await Appoinment.create({
      date,
      idAdmin,
      idUser,
      idLayanan,
    });
    if (data) {
      responseSuccess(res, { msg: "success create user" });
    }
  } catch (err) {
    responseError(res, err);
  }
};

const destroyAppoinment = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Appoinment.findOne({ where: { id } });
    if (!data) {
      const err = {
        code: 404,
        name: "NotFoundError",
        message: "data not found, u must be confused ?",
      };
      responseError(res, err);
    } else {
      const dataDestroy = await Appoinment.destroy({ where: { id } });
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

const updateAppoinment = async (req, res, next) => {
  const { id } = req.params;
  const { date, idAdmin, idUser, idLayanan } = req.body;
  try {
    const dataFind = await Appoinment.findOne({
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
      const data = await Appoinment.update(
        {
          date,
          idAdmin,
          idUser,
          idLayanan,
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
  getAppoinments,
  createAppoinment,
  updateAppoinment,
  destroyAppoinment,
};
