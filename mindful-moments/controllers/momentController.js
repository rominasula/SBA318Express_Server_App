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

exports.getAllMoments = (req, res) => {
  const { category, mood } = req.query;
  let moments = readData();

  if (category) {
    moments = moments.filter(m => m.category.toLowerCase() === category.toLowerCase());
  }
  if (mood) {
    moments = moments.filter(m => m.mood.toLowerCase() === mood.toLowerCase());
  }

  res.render("layout", { body: indexPage(moments) });
};

exports.addMoment = (req, res) => {
  const moments = readData();
  const { title, category, mood, reflection } = req.body;

  if (!title || !reflection) return res.status(400).send("Title and reflection are required.");

  const newMoment = {
    id: moments.length ? moments[moments.length - 1].id + 1 : 1,
    title,
    category: category || "General",
    mood: mood || "Neutral",
    reflection,
    date: new Date().toLocaleDateString(),
  };

  moments.push(newMoment);
  writeData(moments);
  res.redirect("/moments");
};

exports.updateMoment = (req, res) => {
  const moments = readData();
  const momentId = parseInt(req.params.id);
  const moment = moments.find(m => m.id === momentId);
  if (!moment) return res.status(404).send("Moment not found.");

  Object.assign(moment, req.body);
  writeData(moments);
  res.json(moment);
};

exports.deleteMoment = (req, res) => {
  let moments = readData();
  const momentId = parseInt(req.params.id);
  moments = moments.filter(m => m.id !== momentId);
  writeData(moments);
  res.json({ message: "Moment deleted successfully." });
};

exports.showAddMomentForm = (req, res) => {
  res.render("layout", { body: addMomentPage() });
};
