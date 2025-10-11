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

// GET all moments
exports.getAllMoments = (req, res) => {
  const { category, mood, api } = req.query; // new query param 'api'
  let moments = readData();

  if (category) {
    moments = moments.filter(m => m.category.toLowerCase() === category.toLowerCase());
  }
  if (mood) {
    moments = moments.filter(m => m.mood.toLowerCase() === mood.toLowerCase());
  }

  if (api === "true") {
    return res.json(moments); // API request returns JSON
  }

  // Browser request returns HTML
  res.render("layout", { body: indexPage(moments) });
};

// POST a new moment
exports.addMoment = (req, res) => {
  const moments = readData();
  const { title, category, mood, reflection, api } = req.body;

  if (!title || !reflection) return res.status(400).json({ error: "Title and reflection are required." });

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

  if (api === "true") {
    return res.status(201).json(newMoment); // API returns JSON
  }

  res.redirect("/moments"); // Browser: redirect
};

// PATCH (update) a moment
exports.updateMoment = (req, res) => {
  const moments = readData();
  const momentId = parseInt(req.params.id);
  const moment = moments.find(m => m.id === momentId);
  if (!moment) return res.status(404).json({ error: "Moment not found." });

  Object.assign(moment, req.body);
  writeData(moments);

  res.json(moment); // Always JSON for PATCH
};

// DELETE a moment
exports.deleteMoment = (req, res) => {
  let moments = readData();
  const momentId = parseInt(req.params.id);
  moments = moments.filter(m => m.id !== momentId);
  writeData(moments);

  res.json({ message: `Moment ${momentId} deleted.` }); // JSON response
};

// Show the "Add Moment" form (HTML only)
exports.showAddMomentForm = (req, res) => {
  res.render("layout", { body: addMomentPage() });
};
