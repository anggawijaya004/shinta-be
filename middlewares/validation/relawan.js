const joi = require("joi");
const { responseError } = require("../../utils/response");
const fs = require("fs");

const relawanRules = joi.object({
  nik: joi.string().required(),
  name: joi.string().required(),
  password: joi.string(),
  role: joi.string().required(),
  jenisKelamin: joi.string().allow("").allow(null),
  alamat: joi.string().allow("").allow(null),
  idTps: joi.string().allow("").allow(null),
  idKec: joi.string().required().allow(null).allow(''),
  idKel: joi.string().allow("").allow(null),
  phone: joi
    .string()
    // .pattern(/^08[1-9][0-9]{6,10}$/)
    .required()
    // .error(()=> {return { message:'Nomor Telepon Wajib Diisi dengan Format 08xxxxxxxxxx'}})
});

async function relawanValidation(req, res, next) {
  try {
    const result = await relawanRules.validateAsync(req.body, {
      stripUnknown: true,
    });
    next();
  } catch (e) {
    if (req.file && fs.existsSync(`./public/image/${req.file.filename}`)) {
      fs.unlinkSync(`./public/image/${req.file.filename}`);
    }
    responseError(res, {
      name: "ValidationError",
      code: 400,
      message: String(e),
    });
  }
}

module.exports = { relawanValidation };
