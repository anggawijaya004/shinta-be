const router = require("express").Router();
const userRoute = require("./user");
const adminRoute = require("./admin");
const authAdmin = require("./authAdmin");
const authUser = require("./authUser");
const layananRoute = require("./layanan");
const appoinmentRoute = require("./appoinment");

const { authentication, key } = require("../middlewares/auth");

router
  .use(key)
  .get("/", (req, res) => res.send("server is connected"))
  .use("/auth-admin", authAdmin)
  .use("/auth-user", authUser)
  .use(authentication)
  .use("/admin", adminRoute)
  .use("/user", userRoute)
  .use("/layanan", layananRoute)
  .use("/appoinment", appoinmentRoute);

module.exports = router;
