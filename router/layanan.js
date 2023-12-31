const { layananController } = require("../controller");
const router = require("express").Router();

router
  .get("/view", layananController.getLayanans)
  .get("/view-opt", layananController.getOptLayanans)
  .post("/create", layananController.createLayanan)
  .post("/delete/:id", layananController.destroyLayanan)
  .post("/update/:id", layananController.updateLayanan)
module.exports = router;
