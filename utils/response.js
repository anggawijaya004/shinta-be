module.exports = {
  responseSuccess: function (res, data) {
    return res.status(200).json({
      code: 200,
      success: true,
      payload: data,
    });
  },
  responseError: function (res, err) {
    const status = err.status || 500;
    const message = err.message || "Internal Server Error";
    const name = err.name || "server error";
    switch (name) {
      case "SequelizeUniqueConstraintError":
        return res.status(400).json({
          code: err.code,
          success: false,
          error: {
            name: err.name,
            message: err.errors[0].message,
          },
          ...res.dataResponse,
        });
      case "duplicate":
        return res.status(400).json({
          code: err.code,
          success: false,
          error: {
            name: err.name,
            message: err.message,
          },
          ...res.dataResponse,
        });
      case "TokenExpiredError":
        return res.status(400).json({
          code: err.code,
          success: false,
          error: {
            name: err.name,
            message: err.message,
          },
          ...res.dataResponse,
        });
      case "BadRequestError":
        return res.status(400).json({
          code: err.code,
          success: false,
          error: {
            name: err.name,
            message: err.message,
          },
          ...res.dataResponse,
        });
      case "ValidationError":
        return res.status(400).json({
          code: err.code,
          success: false,
          error: {
            name: err.name,
            message: err.message,
          },
          ...res.dataResponse,
        });
      case "UnauthorizedError":
        return res.status(401).json({
          ...res.dataResponse,
          code: err.code,
          success: false,
          error: {
            name: err.name,
            message: err.message,
          },
          ...res.dataResponse,
        });
      case "ForbiddenError":
        return res.status(403).json({
          ...res.dataResponse,
          code: err.code,
          success: false,
          error: {
            name: err.name,
            message: err.message,
          },
          ...res.dataResponse,
        });
      case "NotFoundError":
        return res.status(404).json({
          code: err.code,
          success: false,
          error: {
            name: err.name,
            message: err.message,
          },
          ...res.dataResponse,
        });
      default:
        console.error(err);
        return res.status(status).json({
          code: err.status,
          success: false,
          error: {
            name: name,
            message: message,
          },
        });
    }
  },
};
