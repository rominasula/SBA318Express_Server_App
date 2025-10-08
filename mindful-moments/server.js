const express = require("express");
const app = express();
const port = 3000;

// app.get("/", (req, res) => {
//   res.send("Hello from Express Romina!");
// });

app.listen(port, () => {
  console.log(`Mindful Moments running on port ${port}.`);
});

