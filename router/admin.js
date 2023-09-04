const { adminController } = require("../controller");
const router = require("express").Router();

router
  .get("/view-opt", adminController.getOptAdmins)
  .get("/view", adminController.getAdmins)
  .get("/detail/:id", adminController.getAdmin)
  .post("/create", adminController.createAdmin)
  .post("/delete/:id", adminController.destroyAdmin)
  .post("/update/profile/:id", adminController.updateAdmin)
  .post("/update/password/:id", adminController.updateAdminPassword);
module.exports = router;
