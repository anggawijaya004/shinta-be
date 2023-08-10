const rateLimit = require("express-rate-limit");
const isDev = process.env.NODE_ENV === "dev" ? true : false;

const createLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 mnt
  max: isDev ? 100 : 5, // Limit each IP to 100 create account requests per `window`
  message:
    "Anda Sudah 3 kali gagal, tunggu 1 menit kemudian dan coba login kembali",
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

module.exports = { createLimiter };
