const express = require("express");
const router = express.Router();
const momentController = require("../controllers/momentController");

router.get("/", momentController.getAllMoments);
router.post("/", momentController.addMoment);
router.patch("/:id", momentController.updateMoment);
router.delete("/:id", momentController.deleteMoment);

// Show add moment form
router.get("/new", momentController.showAddMomentForm);

module.exports = router;