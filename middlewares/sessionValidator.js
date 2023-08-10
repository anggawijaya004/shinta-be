const { isSessionExists } = require("../controllers/wa/whatsapp");
const { responseError } = require("../utils/response");

const validate = (req, res, next) => {
  const sessionId = req.query.id ?? req.params.id;

  if (!isSessionExists(sessionId)) {
    return responseError(res, {
      status: 404,
      name: "sessionError",
      message: "Session not found",
    });
  }

  res.locals.sessionId = sessionId;
  next();
};

module.exports = validate;
