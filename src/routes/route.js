const express = require('express');
const route = express.Router();

const mainController = require("../controller/mainController");

// Route to handle the original ID and redirect to encoded URL
route.get("/staff-original/:name", mainController.redirectToEncoded);

// Existing routes
route.get("/", mainController.index);
route.get("/staff/:name", mainController.staff);

module.exports = route;
