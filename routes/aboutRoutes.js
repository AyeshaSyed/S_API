// ScholiumAPP/ScholiumAPI/routes / aboutRoutes.js
const express = require("express");
const router = express.Router();
const aboutController = require("../controllers/aboutController");

// Define the route for submitting the contact form
router.post("/contact", aboutController.submitContactForm);

module.exports = router;
