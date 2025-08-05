import express from "express";
import Message from "../model/message.model.js";
import User from "../model/user.model.js";
import { protectedRoute } from "../middleware/auth.middleware.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

const router = express.Router();

router.get("/fetchUser", protectedRoute, async (req, res) => {
  console.log("hitting the fetchUser Route....");

  const loggedInUserId = req.user._id;

  try {
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (err) {
    console.log("Error in '/fetchUsers'", err);
    res.status(404).json({ message: "Internal Server Error" });
  }
});

// sendMessage Route
router.post("/send/:id", protectedRoute, async (req, res) => {
  console.log("send route hit");

  const { text, image } = req.body;
  const senderId = req.user._id;
  const receiverId = req.params.id;

  console.log("Receivers ID", receiverId);

  let imageURL;

  try {
    if (image) {
      const maxfileSize = 10 * 1024 * 1024;
      const imageSize = Buffer.byteLength(image, "base64");

      if (imageSize > maxfileSize) {
        return res.status(404).json({ message: "File size too larger." });
      }

      const uploadResponse = await cloudinary.uploader.upload(image, {
        limits: { file_size: maxfileSize },
      });

      imageURL = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId: senderId,
      receiverId: receiverId,
      text: text,
      image: imageURL,
    });

    await newMessage.save();
    // realTime messages should display here
   const receiverSocketId = getReceiverSocketId(receiverId);
   console.log('Fetching receiver socketId', receiverSocketId);
    if(receiverSocketId){
      io.to(receiverSocketId).emit('newMessage', newMessage);
    };

    res.status(200).json(newMessage);
  } catch (error) {
    console.log("Error in message.route.js sendMessage routre");
    res.status(404).json({ message: "Internal Server Error" });
  }
});

// getMessages route

router.get(`/:id`, protectedRoute, async (req, res) => {
  const myId = req.user._id;
  const receiverId = req.params.id;

  try {
    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: receiverId },  
        { senderId: receiverId, receiverId: myId },  // ✅ Fixed field names
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in messageRoute ", error);
    res.status(500).json({ message: "Internal Server Error" });  // ✅ Use 500 for server errors
  }
});


export default router;
