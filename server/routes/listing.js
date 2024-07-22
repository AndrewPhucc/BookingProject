const router = require('express').Router()
const multer = require("multer")
const Listing = require("../models/Listing")
const User = require("../models/User")

/* configuration multer for file uploads */

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads/")
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage })

/* create listing */
router.post("/create", upload.array("listingPhotos"), async (req, res) => {
    try {
        // take the in4 from the form
        const { creator,
            category,
            type,
            streetAddress,
            aptSuite,
            city,
            province,
            guestCount,
            bedroomCount,
            bedCount,
            bathroomCount,
            amenities,
            // listingPhotoPaths,
            title,
            description,
            highlight,
            price } = req.body

        const listingPhotos = req.files
        if (!listingPhotos) {
            return res.status(400).send("No file uploaded.")
        }
        const listingPhotoPaths = listingPhotos.map((file) => file.path)

        const newListing = new Listing({
            creator,
            category,
            type,
            streetAddress,
            aptSuite,
            city,
            province,
            guestCount,
            bedroomCount,
            bedCount,
            bathroomCount,
            amenities,
            listingPhotoPaths,
            title,
            description,
            highlight,
            price
        })

        await newListing.save()
        res.status(200).json(newListing)
    } catch (err) {
        res.status(409).json({message:"Fail to creating Listing", error: err.message})
        console.log(err)
    }
})

// get listing by category
router.get("/", async (req,res) => {
    const qCategory = req.query.category
    try {
        let listings 
        if(qCategory){
            listings = await Listing.find({ category: qCategory}).populate("creator")
        }
        else{
            listings = await Listing.find().populate("creator")
        }
        res.status(200).json(listings)
    }catch(err){
        res.status(404).json({message:"Fail to feth listings", error: err.message})
        console.log(err)
    }
})



/* GET LISTINGS BY SEARCH */
router.get("/search/:search", async (req, res) => {
    const { search } = req.params
  
    try {
      let listings = []
  
      if (search === "all") {
        listings = await Listing.find().populate("creator")
      } else {
        // Sử dụng regex để tìm kiếm tiếng Việt có dấu
        const vietnameseSearch = new RegExp(search, "i")
  
        listings = await Listing.find({
          $or: [
            { category: { $regex: vietnameseSearch } },
            { title: { $regex: vietnameseSearch } },
            { city: { $regex: vietnameseSearch } },
            { province: { $regex: vietnameseSearch } },
            { type: { $regex: vietnameseSearch } },
          ]
        }).populate("creator")
      }
  
      res.status(200).json(listings)
    } catch (err) {
      res.status(404).json({ message: "Fail to fetch listings", error: err.message })
      console.log(err)
    }
  })
  


/* LISTING DETAILS */

router.get("/:listingId", async (req, res) => {
    try {
        const { listingId } = req.params;
        const listing = await Listing.findById(listingId).populate("creator");
        if (!listing) {
            return res.status(404).json({ message: "Listing not found" });
        }
        res.status(200).json(listing);
    } catch (err) {
        res.status(404).json({ message: "Failed to fetch listing", error: err.message });
        console.log(err);
    }
});


module.exports = router;