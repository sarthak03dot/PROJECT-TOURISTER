const Listing = require("../models/listing");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async (req, res) => {
  const allListings = await Listing.find({}).populate("owner");;
  res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListing =  async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
      .populate({ path: "reviews", populate: { path: "author" } })
      .populate("owner");
    if (!listing) {
      req.flash("error", "Listing you requested for dose not exist!");
      res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
  };


  module.exports.createListings = async (req, res, next) => {
    let response = await geocodingClient
      .forwardGeocode({
        query: req.body.listing.location,
        limit: 1,
      })
      .send();

    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url, filename};

    newListing.geometry = response.body.features[0].geometry;

    let savedListing = await newListing.save();
    console.log(savedListing);
    req.flash("success", "New listing Created!");
    res.redirect("/listings");
  };

  module.exports.editlistings = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    req.flash("success", "Listing Edited!");
    if (!listing) {
      req.flash("error", "Listing you requested for dose not exist!");
      res.redirect("/listings");
    }
    let OriginalImageUrl = listing.image.url;
    OriginalImageUrl = OriginalImageUrl.replace("/upload","/upload/w_250");
    res.render("listings/edit.ejs", { listing , OriginalImageUrl});
  };



  
  module.exports.updateListings = async (req, res) => {
    let { id } = req.params;
    
    // Check if location changed to update geometry
    let oldListing = await Listing.findById(id);
    let listingData = { ...req.body.listing };

    if (oldListing.location !== listingData.location) {
        let response = await geocodingClient
            .forwardGeocode({
                query: listingData.location,
                limit: 1,
            })
            .send();
        listingData.geometry = response.body.features[0].geometry;
    }

    let listing = await Listing.findByIdAndUpdate(id, listingData);
    if(typeof(req.file) !== "undefined" )  {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = {url, filename};
    await listing.save();
    }
    
    req.flash("success", "Listing Update successfully!");
    res.redirect(`/listings/${id}`);
  };

  module.exports.destroyListings = async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
  };


  module.exports.searchListings = async (req, res) => {
    let { query, category } = req.query;
    let filter = {};

    if (query && query.trim() !== "") {
        const regex = new RegExp(query.trim(), "i");
        filter.$or = [
            { title: regex },
            { location: regex },
            { country: regex },
        ];
    }

    if (category && category !== "all") {
        filter.category = category;
    }

    try {
        const allListings = await Listing.find(filter).populate("owner");
        res.render("listings/index.ejs", { allListings, searchQuery: query, selectedCategory: category });
    } catch (err) {
        console.error(err);
        req.flash("error", "Search failed. Please try again.");
        res.redirect("/listings");
    }
  };