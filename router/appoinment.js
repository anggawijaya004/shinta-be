const { appoinmentController } = require("../controller");
const router = require("express").Router();

router
  .get("/view", appoinmentController.getAppoinments)
  .post("/create", appoinmentController.createAppoinment)
  .post("/delete/:id", appoinmentController.destroyAppoinment)
  .post("/update/:id", appoinmentController.updateAppoinment)
module.exports = router;
