const express = require("express");
const router = express.Router();
const momentController = require("../controllers/momentController");

// View all moments
router.get("/", momentController.getAllMoments);

// Add a new moment
router.post("/", momentController.addMoment);

// Update a moment
router.patch("/:id", momentController.updateMoment);

// Delete a moment
router.delete("/:id", momentController.deleteMoment);

// Show the "Add Moment" form
router.get("/new", momentController.showAddMomentForm);

module.exports = router;
