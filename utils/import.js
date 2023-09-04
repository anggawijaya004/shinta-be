const moment = require("moment");

const ExcelImportCreate = (rows) => {
  rows.shift();
  let users = [];

  for (let i = 0; i < rows.length; i++) {
    let user = {
      name: rows[i][0],
      noKK: rows[i][1],
      npm: rows[i][2],
      tempatLahir: rows[i][3],
      tglLahir: moment(rows[i][4], "DD-MM-YYYY").format("DD/MM/YYYY"),
      jenisKelamin: rows[i][5],
      phone: rows[i][6],
      prov: rows[i][7],
      kab: rows[i][8],
      kec: rows[i][9],
      kel: rows[i][10],
      rw: rows[i][11],
      rt: rows[i][12],
      alamat: rows[i][13],
      statusPerkawinan: rows[i][14],
      statusDisabilitas: rows[i][15],
      username: rows[i][16],
      password: rows[i][17],
    };
    users.push(user);
  }
  return { users };
};

module.exports = { ExcelImportCreate };
