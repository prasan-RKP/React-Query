import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },

    contact: {
      type: Number,
      required: true,
      unique: true,
    },

    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 5,
    },

    profilePic: {
      type: String,
      default: "",
    },

    bio: {
      type: String,
      default: '',
      unique: true
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
