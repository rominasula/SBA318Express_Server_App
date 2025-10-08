function errorHandler(err, req, res, next) {
  console.error("Error:", err.message);

}

module.exports = errorHandler;
