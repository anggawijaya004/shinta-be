const moment = require("moment");

const ExcelImportCreate = (rows) => {
  rows.shift();
  let pemilihs = [];
  let dataForUpdate = [];
  // rows.forEach((row) => {

  for (let i = 0; i < rows.length; i++) {
    let pemilih = {
      nik: rows[i][0],
      namaLengkap: rows[i][1],
      tanggalLahir:moment(rows[i][2]).format("DD/MM/YYYY"),
      jenisKelamin:rows[i][3],
      alamat: rows[i][4],
      idTps: rows[i][5],
      idKecamatan: rows[i][6],
      idKelurahan: rows[i][7],
      noWa: rows[i][8],
      statusPernikahan: rows[i][9],
      referensi: rows[i][10],
      motivasi: rows[i][11],
      kedekatan: rows[i][12],
      tandemProv: rows[i][13],
      tandemKab: rows[i][14],
      status: 0,
      };
    // const finddata = dataPemilihs.find(({ nik }) => nik == pemilih.nik);
    // if (finddata) {
    //   // console.log("data sudah ada");
    //   dataForUpdate.push(pemilih);
    // } else {
    // console.log("data belum ada");
    pemilihs.push(pemilih);
    // }
  }
  return { pemilihs, dataForUpdate };
};

const ExcelImportUpdate = (dataForUpdate, Pemilih) => {
  for (i = 0; i < dataForUpdate.length; i++) {
    Pemilih.update(
      {
        nik: dataForUpdate[i].nik,
        noKk: dataForUpdate[i].noKk,
        disabilitas: dataForUpdate[i].disabilitas,
        namaLengkap: dataForUpdate[i].namaLengkap,
        tempatLahir: dataForUpdate[i].tempatLahir,
        tanggalLahir: dataForUpdate[i].tanggalLahir,
        jenisKelamin: dataForUpdate[i].jenisKelamin,
        alamat: dataForUpdate[i].alamat,
        rt: dataForUpdate[i].rt,
        rw: dataForUpdate[i].rw,
        tps: dataForUpdate[i].tps,
        kecamatan: dataForUpdate[i].kecamatan,
        kelurahan: dataForUpdate[i].kelurahan,
        kodeRt: dataForUpdate[i].kodeRt,
        kodeRw: dataForUpdate[i].kodeRw,
        kodeTps: dataForUpdate[i].kodeTps,
        kodeKecamatan: dataForUpdate[i].kodeKecamatan,
        kodeKelurahan: dataForUpdate[i].kodeKelurahan,
        noWa: dataForUpdate[i].noWa,
        statusPerkawinan: dataForUpdate[i].statusPerkawinan,
        keterangan: dataForUpdate[i].keterangan,
      },
      {
        where: {
          nik: dataForUpdate[i].nik,
        },
      }
    );
  }
};

module.exports = { ExcelImportCreate, ExcelImportUpdate };
