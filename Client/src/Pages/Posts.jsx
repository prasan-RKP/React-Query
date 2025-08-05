import React, { useEffect, useState } from "react";
import {
  Heart,
  Save,
  Home,
  MessageCircle,
  Image as GalleryIcon,
  Search,
  User,
  LogOut,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../Store/useAuthStore";
const posts = [
  {
    id: 1,
    title: "Cute Boy",
    imgSrc:
      "https://cdn.pixabay.com/photo/2020/12/16/04/15/man-5835659_960_720.jpg",
  },
  {
    id: 2,
    title: "Adorable Kid",
    imgSrc:
      "https://cdn.pixabay.com/photo/2015/06/22/08/40/child-817373_1280.jpg",
  },
  {
    id: 3,
    title: "Beautiful Girl",
    imgSrc:
      "https://cdn.pixabay.com/photo/2016/06/06/21/53/child-1440526_1280.jpg",
  },
  {
    id: 4,
    title: "Sunrise View",
    imgSrc:
      "https://cdn.pixabay.com/photo/2014/04/05/13/05/boy-317041_960_720.jpg",
  },
];

const Posts = () => {
  const [likedPosts, setLikedPosts] = useState({});
  const { logout, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Toggle like on heart icon click
  const handleLikeClick = (id) => {
    setLikedPosts((prev) => ({
      ...prev,
      [id]: !prev[id], // Toggle like status
    }));
  };

  return (
    <div className="p-6">
      {/* Navbar */}
      <div className="bg-gray-900 text-white fixed top-0 left-0 right-0 z-10 p-4 flex flex-col shadow-lg">
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold">
            <span className="text-blue-500">My</span>App
          </div>
          <div className="flex items-center space-x-2.5">
            <Link to={"/"}>
              <button className="text-gray-300 hover:text-blue-400 transition p-2">
                <Home size={24} />
              </button>
            </Link>
            <Link to={"/chat"}>
              <button className="text-gray-300 hover:text-blue-400 transition p-2">
                <MessageCircle size={24} />
              </button>
            </Link>
            <Link to={"/posts"}>
              <button
                onClick={logout}
                className="text-gray-300 hover:text-blue-400 transition p-2"
              >
                <LogOut size={24} />
              </button>
            </Link>
            <Link to={"/profile"}>
              <button className="text-gray-300 hover:text-blue-400 transition p-2">
                <User size={24} />
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mt-24 mb-6 flex justify-center mb-24">
        <div className="relative w-2/3">
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 pl-8 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-2 text-gray-500" size={18} />
        </div>
      </div>

      {/* Posts Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {posts.map((post) => (
          <div key={post.id} className="relative group">
            <img
              src={post.imgSrc}
              alt={post.title}
              className="w-full h-64 object-cover rounded-lg shadow-lg transform transition duration-300 group-hover:scale-105 group-hover:blur-md"
            />

            {/* Title (Applies to all posts) */}
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
              <h2 className="text-gray-400 text-lg font-semibold">
                {post.title}
              </h2>
            </div>

            {/* Hover Icons */}
            <div className="absolute inset-0 flex justify-end items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                className="mr-4 p-2 rounded-full shadow-lg bg-white hover:bg-gray-200 transition"
                onClick={() => handleLikeClick(post.id)}
              >
                <Heart
                  size={20}
                  className={`transition ${
                    likedPosts[post.id]
                      ? "text-red-600 fill-red-600"
                      : "text-gray-500"
                  }`}
                />
              </button>
              <button className="text-green-500 bg-white p-2 rounded-full shadow-lg hover:bg-green-500 hover:text-white transition">
                <Save size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
