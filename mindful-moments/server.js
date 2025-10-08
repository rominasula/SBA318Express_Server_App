const express = require("express");
const app = express();
const port = 3000;
const logger = require("./middleware/logger.js");
const errorHandler = require("./middleware/errorHandler.js");
const momentsRouter = require("./routes/moments.js");

app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));


// Custom middleware
app.use(logger);

// Routes
app.use("/moments", momentsRouter);

// Home redirect
app.get("/", (req, res) => res.redirect("/moments.js"));

// Error handler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Mindful Moments running on port ${port}.`);
});

