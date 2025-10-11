const fs = require("fs");
const path = require("path");
const indexPage = require("../views/index");
const addMomentPage = require("../views/addMoment");
const filePath = path.join(__dirname, "../data/moments.json");

// Safe read: returns [] if file missing or empty
function readData() {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (err) {
    return [];
  }
}

function writeData(data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Error writing data:", err);
  }
}

// GET all moments
// GET all moments
exports.getAllMoments = (req, res) => {
  const { category, mood, api } = req.query;
  let moments = readData();

  // Remove duplicates based on title + date
  moments = [...new Map(moments.map(m => [m.title + m.date, m])).values()];

  if (category) {
    moments = moments.filter(m => m.category.toLowerCase() === category.toLowerCase());
  }
  if (mood) {
    moments = moments.filter(m => m.mood.toLowerCase() === mood.toLowerCase());
  }

  if (api === "true") return res.json(moments); // API JSON response

  res.render("layout", { body: indexPage(moments) }); // Browser HTML
};


// POST a new moment
exports.addMoment = (req, res) => {
  const moments = readData();
  const { title, category, mood, reflection, api } = req.body;

  if (!title || !reflection) {
    if (api === "true") return res.status(400).json({ error: "Title and reflection are required." });
    return res.status(400).send("Title and reflection are required.");
  }

  // Prevent duplicate moments on the same date
  const today = new Date().toLocaleDateString();
  const exists = moments.some(m => m.title === title && m.date === today);
  if (exists) {
    if (api === "true") return res.status(409).json({ error: "This moment already exists today." });
    return res.status(409).send("This moment already exists today.");
  }

  const newMoment = {
    id: moments.length ? moments[moments.length - 1].id + 1 : 1,
    title,
    category: category || "General",
    mood: mood || "Neutral",
    reflection,
    date: today,
  };

  moments.push(newMoment);
  writeData(moments);

  if (api === "true") return res.status(201).json(newMoment); // JSON for API

  res.redirect("/moments"); // Browser redirect
};

// PATCH (update) a moment
exports.updateMoment = (req, res) => {
  const moments = readData();
  const momentId = parseInt(req.params.id);
  const moment = moments.find(m => m.id === momentId);

  if (!moment) return res.status(404).json({ error: "Moment not found." });

  // Only update allowed fields
  const { title, category, mood, reflection } = req.body;
  if (title) moment.title = title;
  if (category) moment.category = category;
  if (mood) moment.mood = mood;
  if (reflection) moment.reflection = reflection;

  writeData(moments);

  res.json(moment);
};

// DELETE a moment
exports.deleteMoment = (req, res) => {
  let moments = readData();
  const momentId = parseInt(req.params.id);

  const deleted = moments.find(m => m.id === momentId);
  if (!deleted) return res.status(404).json({ error: "Moment not found." });

  moments = moments.filter(m => m.id !== momentId);
  writeData(moments);

  res.json({ message: `Moment ${momentId} deleted.` });
};

// Show the "Add Moment" form (HTML only)
exports.showAddMomentForm = (req, res) => {
  res.render("layout", { body: addMomentPage() });
};
