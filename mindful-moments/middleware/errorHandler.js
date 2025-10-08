function errorHandler(err, req, res, next) {
  console.error("Error:", err.message);
  res.status(500).send("Something went wrong. Please try again later.");
}

module.exports = errorHandler;
