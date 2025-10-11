const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const logger = require("./middleware/logger.js");
const errorHandler = require("./middleware/errorHandler.js");
const momentsRouter = require("./routes/moments");
const usersRouter = require("./routes/users");
const moodsRouter = require("./routes/moods");
const methodOverride = require('method-override');

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/users", usersRouter);
app.use("/moods", moodsRouter);
app.use(methodOverride('_method'));

// Custom middleware
app.use(logger);

// Routes
app.use("/moments", momentsRouter);

// Home redirect
app.get("/", (req, res) => res.redirect("/moments"));


// Error handler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Mindful Moments running on port ${port}.`);
});

