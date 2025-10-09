const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "../data/moods.json");

function readData() {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}
function writeData(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

exports.getAllMoods = (req, res) => {
  const moods = readData();
  res.json(moods);
};

exports.addMood = (req, res) => {
  const moods = readData();
  const { mood } = req.body;

  if (!mood) return res.status(400).send("Mood is required.");

  const newMood = {
    id: moods.length ? moods[moods.length - 1].id + 1 : 1,
    mood,
  };
  moods.push(newMood);
  writeData(moods);
  res.status(201).json(newMood);
};
