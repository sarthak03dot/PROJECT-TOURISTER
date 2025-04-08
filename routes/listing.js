const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isSignedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const Multer = require("multer");
const { storage } = require("../cloudconfig.js");
const upload = Multer({ storage });

// search
router.get("/search", wrapAsync(listingController.searchListings));

router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isSignedIn,
    validateListing,
    upload.single("listing[image]"),
    wrapAsync(listingController.createListings)
  );

//new route
router.get("/new", isSignedIn, listingController.renderNewForm);

router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isSignedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListings)
  )
  .delete(isSignedIn, isOwner, wrapAsync(listingController.destroyListings));

//edit route
router.get(
  "/:id/edit",
  isSignedIn,
  isOwner,
  validateListing,
  wrapAsync(listingController.editlistings)
);

module.exports = router;