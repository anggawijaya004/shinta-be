const { authAdminController } = require("../controller");
const { authentication } = require("../middlewares/auth");
const { createLimiter } = require("../middlewares/rateLimiter");
const router = require("express").Router();

router
  .get("/profile", authentication, authAdminController.userProfil)
  .post("/login", createLimiter, authAdminController.login);
// .post("/logout", authController.logout);

module.exports = router;
