const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveredirectURL } = require("../middleware.js");
const userController = require("../controllers/users.js");

router
  .route("/signup")
  .get(userController.renderSignUpForm)
  .post(wrapAsync(userController.signup));

router
  .route("/signin")
  .get(userController.renderSignInForm)
  .post(
    saveredirectURL,
    passport.authenticate("local", {
      failureRedirect: "/signin",
      failureFlash: true,
    }),
    userController.SignIn
  );

router.get("/signout", userController.SignOut);

module.exports = router;
