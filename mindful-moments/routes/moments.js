const express = require("express");
const router = express.Router();
const momentController = require("../controllers/momentController");


// Show add moment form
router.get("/new", momentController.showAddMomentForm);

module.exports = router;