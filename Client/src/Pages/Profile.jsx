import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Edit,
  Mail,
  Camera,
  LogOut,
  Home,
  MessageCircle,
  Image,
  Linkedin,
  Twitter,
} from "lucide-react";
import { ImGithub } from "react-icons/im";
import { useAuthStore } from "../Store/useAuthStore";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const Profile = () => {
  const { logout, checkAuth, updateProfile, authUser, isUpdatingProfile, bioUpdating,  setBio} =
    useAuthStore();
  const [selectedImage, setSelectedImage] = useState(null);


  //console.log("UserBio value is", userBio);

  const handleUserBio = () => {
    const bioValue = window.prompt("Enter your Bio:")
    if (bioValue !== null && bioValue.trim() !== "") { // Update bio only if input is not empty
       setBio(bioValue.trim());
    }
  }

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log("Authuser value", authUser);

  useEffect(() => {
    if (selectedImage) {
      //console.log("The base64Image value is:", selectedImage);
    }
  }, [selectedImage]); // Logs the updated image when it changes

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (!file) return; // Return early if no file is selected

    const reader = new FileReader();
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImage(base64Image);
      updateProfile({ profilePic: base64Image }); // Save it to the backend
    };
    reader.readAsDataURL(file);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-gray-900 via-gray-700 to-gray-800 text-white relative">
      {/* Floating Action Buttons */}
      <div className="absolute top-6 right-6 flex flex-col gap-3">
        <motion.button
          className="bg-gray-700 p-3 rounded-full shadow-md transition duration-300 flex items-center justify-center"
          whileHover={{ scale: 1.1, backgroundColor: "#E53E3E" }}
          transition={{ duration: 0.2 }}
          title="Logout"
          onClick={handleLogout}
        >
          <LogOut className="text-white w-6 h-6" />
        </motion.button>

        <Link to={"/"}>
          <motion.button
            className="bg-gray-700 p-3 rounded-full shadow-md transition duration-300 flex items-center justify-center"
            whileHover={{ scale: 1.1, backgroundColor: "#4F46E5" }}
            transition={{ duration: 0.2 }}
            title="Home"
          >
            <Home className="text-white w-6 h-6" />
          </motion.button>
        </Link>

        <Link to={"/chat"}>
          <motion.button
            className="bg-gray-700 p-3 rounded-full shadow-md transition duration-300 flex items-center justify-center"
            whileHover={{ scale: 1.1, backgroundColor: "#38B2AC" }}
            transition={{ duration: 0.2 }}
            title="Chat"
          >
            <MessageCircle className="text-white w-6 h-6" />
          </motion.button>
        </Link>

        <Link to={"/posts"}>
          <motion.button
            className="bg-gray-700 p-3 rounded-full shadow-md transition duration-300 flex items-center justify-center"
            whileHover={{ scale: 1.1, backgroundColor: "#F59E0B" }}
            transition={{ duration: 0.2 }}
            title="Gallery"
          >
            <Image className="text-white w-6 h-6" />
          </motion.button>
        </Link>
      </div>

      {/* Profile Content */}
      <div className="flex justify-center items-center flex-grow">
        <motion.div
          className="max-w-lg w-full bg-gray-800 p-8 rounded-xl shadow-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Profile Picture Section */}
          <motion.div
            className="flex justify-center mb-8 relative group"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-400 flex justify-center items-center border-4 border-gray-500 shadow-xl relative">
              {isUpdatingProfile ? (
                <ClipLoader color="white" size={32} />
              ) : (
                <>
                  <img
                    src={
                      selectedImage ||
                      authUser.profilePic ||
                      "https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg"
                    }
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </>
              )}

              {/* Camera Button */}

             {isUpdatingProfile ? "" : <motion.button
                className="absolute bottom-2 right-2 bg-gray-700 p-2 rounded-full shadow-lg hover:bg-gray-600 transition duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100"
                whileHover={{ scale: 1.2 }}
                onClick={() => document.getElementById("fileInput").click()}
              >
                <Camera className="text-white w-5 h-5" />
                
              </motion.button>}

              
            </div>

            <input
              type="file"
              accept="image/*"
              id="fileInput"
              style={{ display: "none" }}
              onChange={handleFileInputChange}
            />
          </motion.div>

          {/* Name Section */}
          <motion.h2
            className="text-3xl font-semibold text-center mb-2"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            {authUser.username || "John Doe"}
          </motion.h2>
          <p className="text-center mb-4">
            {authUser.bio || `Web Developer | ${authUser.email}`}
          </p>

          {/* Bio Section */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Bio</h3>
            <p className="text-gray-300">
              {authUser.bio ||
                "A passionate web developer focused on modern web applications using JavaScript, React, and Node.js."}
            </p>
          </div>

          {/* Contact Section */}
          <div className="flex justify-evenly mt-4 mb-10">
            <motion.a
              href={`mailto:${authUser.email || "johndoe@example.com"}`}
              className="flex items-center gap-2"
              whileHover={{ scale: 1.1, color: "#4F46E5" }}
              transition={{ duration: 0.2 }}
            >
              <Mail />
              <span>Email</span>
            </motion.a>

            <motion.a
              href={`mailto:${authUser.email || "johndoe@example.com"}`}
              className="flex items-center gap-2"
              whileHover={{ scale: 1.1, color: "#4F46E5" }}
              transition={{ duration: 0.2 }}
            >
              <Linkedin /> 
              <span>linkedIn</span>
            </motion.a>

            <motion.a
              href={`mailto:${authUser.email || "johndoe@example.com"}`}
              className="flex items-center gap-2"
              whileHover={{ scale: 1.1, color: "#4F46E5" }}
              transition={{ duration: 0.2 }}
            >
              <Twitter /> 
              <span>Twitter</span>
            </motion.a>

            <motion.a
              href={authUser.github || "https://github.com/Prasan-Kumar"}
              target="_blank"
              className="flex items-center gap-2"
              whileHover={{ scale: 1.1, color: "#4F46E5" }}
              transition={{ duration: 0.2 }}
            >
              <ImGithub />
              <span>GitHub</span>
            </motion.a>
          </div>

          {/* Edit Button */}
          <motion.div
            className="flex justify-center"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            <button onClick={handleUserBio} className="btn btn-outline btn-primary px-8 py-2 rounded-full text-lg font-semibold flex items-center gap-2">
              <Edit />
              Add Bio 😎
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
