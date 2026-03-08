if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const userRouter = require("./routes/user.js");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const db_URL = process.env.ATLASDB_URL;
const url = process.env.M_URL;

// Helmet with relaxed CSP for EJS-Mate/Bootstrap/FontAwesome
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(mongoSanitize());

async function main() {
  const maxRetries = 5;
  let retryCount = 0;

  const connectWithRetry = async () => {
    try {
      await mongoose.connect(db_URL, {
        serverSelectionTimeoutMS: 5000,
        connectTimeoutMS: 10000,
        socketTimeoutMS: 45000,
      });
      console.log("Connected to DB");
    } catch (err) {
      console.error(`Failed to connect to DB (attempt ${retryCount + 1}/${maxRetries}):`, err.message);
      retryCount++;
      if (retryCount < maxRetries) {
        console.log(`Retrying in 5 seconds...`);
        setTimeout(connectWithRetry, 5000);
      } else {
        console.error("Max retries reached. Could not connect to DB. Check your network or Atlas IP whitelist.");
      }
    }
  };

  connectWithRetry();
}
main();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

const sessionSecret = process.env.SECRET || "thisshouldbeabettersecret";

const store = MongoStore.create({
  mongoUrl: db_URL,
  touchAfter: 24 * 60 * 60,
  collectionName: "sessions_v3", // Fresh start without crypto complexity
});

store.on("error", (err) => {
  console.log("ERROR in MONGO SESSION STORE", err);
});

const sessionOption = {
  store: store,
  secret: sessionSecret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
  },
};

app.use(session(sessionOption));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const bookingRouter = require("./routes/booking.js");
const bookingController = require("./controllers/bookings.js");
const wrapAsync = require("./utils/wrapAsync.js");
const { isSignedIn } = require("./middleware.js");

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user || null;
  console.log("Auth State:", req.isAuthenticated() ? `User: ${req.user.username}` : "Guest");
  res.locals.mapToken = process.env.MAP_TOKEN;
  res.locals.selectedCategory = null;
  next();
});

app.get("/", (req, res) => {
  res.redirect("/listings");
});

app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews", reviewsRouter);
app.use("/listings/:id/bookings", bookingRouter);
app.get("/dashboard", isSignedIn, wrapAsync(bookingController.userDashboard));
app.use("/", userRouter);

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found!"));
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something is wrong!" } = err;
  console.error("SERVER ERROR:", err);
  res.status(statusCode).render("listings/Error.ejs", { err: { statusCode, message } });
});

app.listen(8080, () => {
  console.log("server is listening to port : 8080");
});
