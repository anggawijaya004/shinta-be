const { userController } = require("../controller");
const { upload, uploadFileExcel } = require("../middlewares/multer");
const router = require("express").Router();

router
  .get("/view", userController.getUsers)
  .get("/detail/:id", userController.getUser)
  .post(
    "/import-data",
    uploadFileExcel.single("file"),
    userController.importData
  )
  .post("/create", userController.createUser)
  .post("/delete/:id", userController.destroyUser)
  .post("/update/profile/:id", userController.updateUser)
  .post("/update/photo", upload, userController.updatePhoto)
  .post("/update/password/:id", userController.updateUserPassword);
module.exports = router;
