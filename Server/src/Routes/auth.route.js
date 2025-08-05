import express from "express";
import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";
import { generateToken } from "../lib/utils.js";
import { protectedRoute } from "../middleware/auth.middleware.js";
import cloudinary from "../lib/cloudinary.js";

const router = express.Router();

// SignUp
router.post("/signup", async (req, res) => {
  const { username, email, contact, password } = req.body;
  try {
    if (!username || !email || !contact || !password) {
      return res.status(404).json({ message: "Fill all your credentials" });
    }

    const user = await User.findOne({ email });
    if (user) return res.json(404).json({ message: "User alredy Exist.." });

    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = new User({
      username: username,
      email: email,
      contact: contact,
      password: hashedPassword,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();
      return res.status(200).json({
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        contact: newUser.contact,
        password: newUser.password,
        profilePic: newUser.profilePic,
        
      });
    }

    if (!newUser) return res.status(404).json({ message: "User not Found.." });
  } catch (error) {}
});

// logout
router.post("/logout", (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    return res.status(200).json({ message: "LoggedOut successfully" });
  } catch (error) {
    return res.status(404).json({ message: "Internal Server Error" });
  }
});

//Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password)
      return res.status(404).json({ message: "Fill All Your Credentials" });

    const verifiedUser = await User.findOne({ email });

    if (!verifiedUser)
      return res.status(404).json({ message: "Invalid Credentials" });

    const isCorrectPassword = await bcryptjs.compare(
      password,
      verifiedUser.password
    );
    if (!isCorrectPassword)
      return res.status(404).json({ message: "Invalid Credentials" });

    generateToken(verifiedUser._id, res);
    res.status(200).json({
      message: "LoggedIn Successfully ✅",
      _id: verifiedUser._id,
      email: verifiedUser.email,
      password: isCorrectPassword,
      username: verifiedUser.username,
      profilePic: verifiedUser.profilePic,
    });
  } catch (error) {
    console.log(
      "The Error is occuring on the 'user.auth.js' catch section ",
      error
    );
    return res.status(404).json({ message: "Server Error" });
  }
});

// CheckingAuth
router.get("/check", protectedRoute, async (req, res) => {
  try {
    return res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in CheckAuth route ");
  }
});

//profilePic updation
router.put("/profile", protectedRoute, async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;

    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );

    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log("Error in auth.route.js", error);
    return res.status(404).json({ message: "Internal Server Error" });
  }
});

router.put("/addbio", protectedRoute, async(req, res)=> {

  const {bioMessage} = req.body; 
  console.log("BioMessage is ", bioMessage);
  // try {
  //   if(!bioMessage) return res.status(404).json({message: 'Please fill Your Bio..'});
  //   const userId = req.user._id;

  //   const updatedUser = await User.findByIdAndUpdate(userId, 
  //     {bio: bioMessage},
  //     {new: true}
  //   )


  // } catch (error) {
    
  // }
})



export default router;
