const User = require("../models/user")

module.exports.renderSignUpForm = (req, res) => {
    res.render("users/signup.ejs");
  };

module.exports.signup = async (req, res) => {
    try {
      let { username, email, password } = req.body;
      const newUser = new User({ email, username });
      const registerdUser = await User.register(newUser, password);
      console.log(registerdUser);
      req.login(registerdUser, (err) => {
        if (err) {
          return next(err);
        }
        req.flash("success", "Welcome to TripTales");
        res.redirect("/listings");
      });
    } catch (err) {
      req.flash("error", err.message);
      res.redirect("/signup");
    }
  };

  module.exports.renderSignInForm = (req, res) => {
    res.render("users/signin.ejs");
  };

module.exports.SignIn =  async (req, res) => {
    req.flash("success", "Welcome to TripTales! You're Logged in.");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
  };

  module.exports.SignOut = (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "you're signed out!");
      res.redirect("/listings");
    });
  };

module.exports.toggleWishlist = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(req.user._id);
        const index = user.wishlist.indexOf(id);
        
        let added = false;
        if (index === -1) {
            user.wishlist.push(id);
            added = true;
        } else {
            user.wishlist.splice(index, 1);
        }
        
        await user.save();
        res.json({ success: true, added });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};