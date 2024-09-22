const Listing = require("./models/listing");
const Review = require("./models/review.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("./schema.js");


module.exports.isSignedIn = (req, res, next)=>{
    if(!req.isAuthenticated()){
      //redirect url save
      req.session.redirectUrl = req.originalUrl;
        req.flash("error","you must have to signed in to create listing!");
        return res.redirect("/signin");
      }
      next();
}


module.exports.saveredirectURL = (req, res, next) =>{
  if(req.session.redirectUrl){
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
}

module.exports.isOwner =async (req, res, next)=>{
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if(!listing.owner.equals(res.locals.currUser._id)){
    req.flash("error", "You're not the owner of this listing!");
   return  res.redirect(`/listings/${id}`);
  }
  next();
}

module.exports.validateListing = (req, res, next) => {
  let { err } = listingSchema.validate(req.body);
  if (err) {
    let { errMsg } = err.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

module.exports.validateReview = (req, res, next) => {
  let { err } = reviewSchema.validate(req.body);
  if (err) {
    let { errMsg } = err.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};


module.exports.isReviewAuthor = async (req, res, next)=>{
  let { id, reviewId } = req.params;
  let review = await Review.findById(reviewId);
  if(!review.author.equals(res.locals.currUser._id)){
    req.flash("error", "You're not the author of this review!");
   return  res.redirect(`/listings/${id}`);
  }
  next();
}