class ErrorHandler extends Error {
  constructor (statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

const handleError = (err, req, res, next) => {
  res.status(err.statusCode).json({
    message: err.message,
    status: "error",
    data: null
  });
};

module.exports = { ErrorHandler, handleError };