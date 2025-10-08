const fs = require("fs");
const path = require("path");
const indexPage = require("../views/index");
const addMomentPage = require("../views/addMoment");
const filePath = path.join(__dirname, "../data/moments.json");

function readData() {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeData(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}



