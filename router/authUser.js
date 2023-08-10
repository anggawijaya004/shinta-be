const { authUserController } = require("../controller");
const { authentication } = require("../middlewares/auth");
const { createLimiter } = require("../middlewares/rateLimiter");
const router = require("express").Router();

router
  .get("/profile", authentication, authUserController.userProfil)
  .post("/login", createLimiter, authUserController.login);
// .post("/logout", authController.logout);

module.exports = router;
