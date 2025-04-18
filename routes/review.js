const express = require("express");
const router = express.Router({ mergeParams: true }); //mergeParams use for tale id from parant routes
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {
  validateReview,
  isSignedIn,
  isReviewAuthor,
} = require("../middleware.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const reviewController = require("../controllers/reviews.js");

//Reviews
//Post Route

router.post(
  "/",
  isSignedIn,
  validateReview,
  wrapAsync(reviewController.createReview)
);

//review
//deletr route

router.delete(
  "/:reviewId",
  isSignedIn,
  isReviewAuthor,
  wrapAsync(reviewController.destroyReview)
);

module.exports = router;
