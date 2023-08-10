const multer = require("multer");

const storageImage = multer.diskStorage({
  destination: "./public/image/",
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-IMAGE-" + file.originalname);
  },
});

const storageImagePemilih = multer.diskStorage({
  destination: "./public/image/pemilih/",
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-IMAGE-" + file.originalname);
  },
});

const storageImageBanner = multer.diskStorage({
  destination: "./public/image/banner/",
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-IMAGE-" + file.originalname);
  },
});

const storageImageSebaran= multer.diskStorage({
  destination: "./public/image/sebaranlogistik/",
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-IMAGE-" + file.originalname);
  },
});

const storageImageRelawan = multer.diskStorage({
  destination: "./public/image/relawan/",
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-IMAGE-" + file.originalname);
  },
});

const storageImageWa = multer.diskStorage({
  destination: "./public/image/wa/",
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-IMAGE-" + file.originalname);
  },
});

const storageFile = multer.diskStorage({
  destination: "./public/file/",
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-File-" + file.originalname);
  },
});

const storageImageQc = multer.diskStorage({
  destination: "./public/image/qc/",
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

const uploadPemilih = multer({
  storage: storageImagePemilih,
  // limits: { fileSize: 1048576 },
}).single("photo");

const uploadRelawan = multer({
  storage: storageImageRelawan,
  // limits: { fileSize: 1048576 },
}).single("photo");

const uploadQc = multer({
  storage: storageImageQc,
  // limits: { fileSize: 1048576 },
}).single("photo");

const uploadWa = multer({
  storage: storageImageWa,
  // limits: { fileSize: 1048576 },
}).single("photo");

const uploadBanner = multer({
  storage: storageImageBanner,
  // limits: { fileSize: 1048576 },
}).single("photo");

const uploadSebaran = multer({
  storage: storageImageSebaran,
  // limits: { fileSize: 1048576 },
}).single("photo");

const uploadDoc = multer({
  storage: storageFile,
  // limits: { fileSize: 1048576 },
}).single("file");

module.exports = {
  upload,
  uploadWa,
  uploadPemilih,
  uploadRelawan,
  uploadQc,
  uploadFileExcel,
  uploadDoc,
  uploadBanner,
  uploadSebaran
};
