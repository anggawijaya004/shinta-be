const multer = require("multer");

const storageImage = multer.diskStorage({
  destination: "./public/image/",
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-IMAGE-" + file.originalname);
  },
});

const storageExcel = multer.diskStorage({
  destination: "./public/file/excel",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-EXCEL-" + file.originalname);
  },
});

const uploadFileExcel = multer({
  storage: storageExcel,
  // fileFilter: excelFilter,
  // limits: { fileSize: 1048576 },
});

const upload = multer({
  storage: storageImage,
  // limits: { fileSize: 1048576 },
}).single("photo");
const uploadDoc = multer({
  storage: storageImage,
  // limits: { fileSize: 1048576 },
}).single("file");

module.exports = {
  upload,
  uploadDoc,
  uploadFileExcel
};
