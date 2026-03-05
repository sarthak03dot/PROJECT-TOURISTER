const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync");
const { isSignedIn } = require("../middleware");
const bookingController = require("../controllers/bookings");

// Create Booking
router.post("/", isSignedIn, wrapAsync(bookingController.createBooking));

module.exports = router;
