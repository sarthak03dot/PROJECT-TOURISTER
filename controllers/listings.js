const Listing = require("../models/listing");

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
    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url, filename};
    await newListing.save();
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
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
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


  module.exports.searchListings = async(req, res) => {
    const query = req.query.query.trim().toLowerCase();

    if(!query){
      return res.redirect('/listings');
    }
    try{
      const allListings = await Listing.find({
        $or:[
          { title: {$regex : query, $options : 'i'}},
          { location: {$regex : query, $options : 'i'}},
          { category: {$regex : query, $options : 'i'}},
        ],
      });
      res.render('listings', {allListings, query});
    }catch (err) {
      console.log(err);
      res.status(500).send('Server Error.');
    }
  };