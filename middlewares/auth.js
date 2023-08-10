const { User, Blacklist, Relawan } = require("../models");
const { verifyedToken } = require("../helpers/jwebtoken");
const { responseError } = require("../utils/response");
const apiKey = process.env.apikey;
const db = require("../models");
const { decode } = require("jsonwebtoken");
const Op = db.Sequelize.Op;

async function key(req, res, next) {
  try {
    if (!req.header("x-api-keyyy")) {
      // console.log(req.header)
      return res.status(500).send({
        msg: "anda tidak diizinkan p:D",
      });
    }
    if (req.header("x-api-keyyy") !== `${apiKey}`) {
      // console.log(req.header('x-api-keyyy'))
      return res.status(500).send({
        msg: "anda tidak diizinkan :D",
      });
    }
    // console.log(req.header('x-api-keyyy'))
    next();
  } catch (error) {
    return next(error);
  }
}

async function authentication(req, res, next) {
  try {
    if (req.headers.authorization) {
      let token = req.headers.authorization.split(" ")[1];
      let decodeToken = verifyedToken(token);
      req.logedUser = decodeToken;
      next();
    } else {
      responseError(res, {
        code: 401,
        message: "Token required",
      });
    }
  } catch (err) {
    console.log(err);
    responseError(res, err);
  }
}

async function authorizationAdmin(req, res, next) {
  try {
    let { id } = req.logedUser;
    const user = await User.findOne({
      where: {
        id: id,
        role: {
          [Op.or]: [1, 2],
        },
      },
    });
    if (user) {
      next();
    } else {
      responseError(res, {
        status: 400,
        message: "Akses Ditolak!",
      });
    }
  } catch (err) {
    next(err);
  }
}

async function authorizationSuperadmin(req, res, next) {
  try {
    let { id } = req.logedUser;
    const user = await User.findOne({ where: { id: id, role: 1 } });
    if (user) {
      next();
    } else {
      responseError(res, {
        status: 400,
        message: "Akses Ditolak!",
      });
    }
  } catch (err) {
    next(err);
  }
}

module.exports = {
  authentication,
  authorizationSuperadmin,
  authorizationAdmin,
  key,
};
