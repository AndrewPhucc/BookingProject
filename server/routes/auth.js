const router = require("express").Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const multer = require("multer")

const User = require("../models/User")
// configuration Multer for the file upload

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,"public/uploads/")
    },
    filename: function(req,file,cb){
        cb(null, file.originalname)
    }
}) 
const upload = multer({storage})

// user register
router.post("/register", upload.single('profileImage'), async(req,res)=>{
    try{
    // take all the in4 from the form
    const {firstName,email,password} = req.body
    // the upload file is available as req.file
    const profileImage = req.file
    if (!profileImage){
        return res.status(400).send("No file uploaded")
    }
    // path to the upload profile photo
    const profileImagePath = profileImage.path
    
    // check if user exists
    const existingUser = await User.findOne({email})
    if (existingUser){
        return res.status(400).json({message: "Email đã tồn tại!"})
    }
    // Hass the password
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password,salt)
    
    // create a new user
    const newUser = new User({
        firstName,
        email,
        password: hashedPassword,
        profileImagePath,

    });
    // save the new user
    await newUser.save()
    // send a succesful mess
    res.status(200).json({message:"Đăng kí thành công!", user: newUser})
    }catch(err){
        console.log(err)
        res.status(500).json({message: "Đăng kí thất bại!", error: err.message})
    }
});

// USER LOGIN

router.post("/login", async(req,res) => {
    try{
        // take the in4 from the form
        const {email,password} = req.body
        // check if user exits
        const user = await User.findOne({email})
        if (!user){
            return res.status(400).json({message: "Người dùng không tồn tại!" })
        }
        // compare the password with the hash password
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch){
            return res.status(400).json({message:"Mật khẩu không hợp lệ"});
        }
        // generate JWT token
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
        delete user.password
        res.status(200).json({token,user})

    }
        catch(err){
            console.log(err)
            res.status(500).json({error: err.message})
        }
})


module.exports = router;