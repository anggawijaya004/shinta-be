const { userController } = require("../controller");
const router = require("express").Router();

router
  .get("/view", userController.getUsers)
  .get("/detail/:id", userController.getUser)
  .post("/create", userController.createUser)
  .post("/delete/:id", userController.destroyUser)
  .post("/update/profile/:id", userController.updateUser)
  .post("/update/password/:id", userController.updateUserPassword);
module.exports = router;
