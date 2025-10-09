const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "../data/users.json");

function readData() {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}
function writeData(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

exports.getAllUsers = (req, res) => {
  const users = readData();
  res.json(users);
};

exports.addUser = (req, res) => {
  const users = readData();
  const { name, email } = req.body;

  if (!name || !email)
    return res.status(400).send("Name and email are required.");

  const newUser = {
    id: users.length ? users[users.length - 1].id + 1 : 1,
    name,
    email,
  };
  users.push(newUser);
  writeData(users);
  res.status(201).json(newUser);
};
