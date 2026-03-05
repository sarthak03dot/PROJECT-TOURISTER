const Booking = require("../models/booking");
const Listing = require("../models/listing");

module.exports.createBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const { checkIn, checkOut, guests } = req.body.booking;
        
        const listing = await Listing.findById(id);
        if (!listing) {
            req.flash("error", "Listing not found");
            return res.redirect("/listings");
        }

        // Simple price calculation (could be more advanced based on actual stay duration)
        const nightPrice = 150; // Dynamic price per night would be better
        const diffTime = Math.abs(new Date(checkOut) - new Date(checkIn));
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const totalPrice = (diffDays || 1) * nightPrice;

        const newBooking = new Booking({
            listing: id,
            guest: req.user._id,
            checkIn,
            checkOut,
            totalPrice
        });

        await newBooking.save();
        req.flash("success", "Reservation successful! Check your dashboard.");
        res.redirect(`/listings/${id}`);
    } catch (err) {
        console.error(err);
        req.flash("error", "Could not complete booking.");
        res.redirect(`/listings/${req.params.id}`);
    }
};

module.exports.userDashboard = async (req, res) => {
    const bookings = await Booking.find({ guest: req.user._id }).populate("listing");
    const listings = await Listing.find({ owner: req.user._id });
    res.render("users/dashboard.ejs", { bookings, listings });
};
