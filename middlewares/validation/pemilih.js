const joi = require("joi");
const { responseError } = require("../../utils/response");
const fs = require("fs");

const pemilihRules = joi.object({
  nik: joi.string().required(),
  namaLengkap: joi.string().required(),
  tanggalLahir: joi.string().required(),
  jenisKelamin: joi.string().required(),
  alamat: joi.string().allow("").allow(null),
  idTps: joi.string().allow("").allow(null),
  idKecamatan: joi.string().required(),
  idKelurahan: joi.string().required(),
  noWa: joi.string()
  // .pattern(/^08[1-9][0-9]{6,10}$/),
});

async function pemilihValidation(req, res, next) {
  try {
    const result = await pemilihRules.validateAsync(req.body, {
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

module.exports = { pemilihValidation };
