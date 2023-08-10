//  = require('../models')
const filter = (filterValue) => {
  let res = {};
  for (key in filterValue) {
    if (filterValue[key]) res[key] = filterValue[key];
  }
  return res;
};

const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};

const getPagingDataPemilih = (data, page, limit) => {
  const { count: totalItems, rows: pemilihs } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, pemilihs, totalPages, currentPage };
};

module.exports = { getPagination, getPagingDataPemilih, filter };
