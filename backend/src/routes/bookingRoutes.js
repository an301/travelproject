const express = require("express");
const { getFlightOptions, getHotelOptions } = require("../controllers/bookingController");

const router = express.Router();

// Flight Booking
router.get("/flights", getFlightOptions);

// Hotel Booking
router.get("/hotels", getHotelOptions);

module.exports = router;
