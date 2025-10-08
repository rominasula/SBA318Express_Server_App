const express = require("express");
const app = express();
const port = 3000;
const logger = require("./middleware/logger.js");
const errorHandler = require("./middleware/errorHandler.js");
const momentsRouter = require("./routes/moments.js");

// Home redirect
app.get("/", (req, res) => res.redirect("/moments.js"));


app.listen(port, () => {
  console.log(`Mindful Moments running on port ${port}.`);
});

