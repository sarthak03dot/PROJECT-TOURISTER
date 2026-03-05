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

        const nightPrice = listing.price || 150; 
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
    // Refresh user to get latest wishlist
    const user = await require("../models/user").findById(req.user._id).populate("wishlist");
    
    // My listings (as a host)
    const listings = await Listing.find({ owner: req.user._id });
    
    // Bookings people made for my listings (as a host)
    let incomingBookingsRaw = await Booking.find({ 
        listing: { $in: listings.map(l => l._id) } 
    }).populate("listing").populate("guest");

    // Filter out bookings where the listing might have been deleted
    const bookings = (await Booking.find({ guest: req.user._id }).populate("listing"))
        .filter(b => b.listing !== null);
    
    const incomingBookings = incomingBookingsRaw.filter(b => b.listing !== null);

    res.render("users/dashboard.ejs", { bookings, listings, incomingBookings, wishlist: user.wishlist });
};
