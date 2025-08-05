import React, { useState } from "react";
import {
  Search,
  Menu,
  Contact,
  MessageCircle,
  User,
  FileText,
  X,
  Bell,
} from "lucide-react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col relative">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-gray-900 p-4 flex justify-between items-center shadow-md">
        <div className="flex items-center space-x-4">
          <Menu className="w-6 h-6 cursor-pointer" onClick={toggleSidebar} />
          <h1 className="text-xl font-bold">My Website</h1>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search..."
            className="px-3 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
          />
          <Search className="w-6 h-6 text-gray-400" />
        </div>
      </nav>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } w-64 z-50`}
      >
        <div className="p-4 flex justify-between items-center border-b border-gray-700">
          <h2 className="text-xl font-bold">Menu</h2>
          <X className="w-6 h-6 cursor-pointer" onClick={toggleSidebar} />
        </div>
        <ul className="space-y-4 px-4 py-6">
          <Link to={"/contact"}>
            <li className="flex items-center space-x-3 cursor-pointer p-2 rounded-md transition-colors hover:bg-blue-600">
              <Contact className="w-5 h-5" />
              <span>Contact</span>
            </li>
          </Link>
          <Link to={"/chat"}>
            <li className="flex items-center space-x-3 cursor-pointer p-2 rounded-md transition-colors hover:bg-green-600">
              <MessageCircle className="w-5 h-5" />
              <span>Chat</span>
            </li>
          </Link>
          <Link to={"/profile"}>
            <li className="flex items-center space-x-3 cursor-pointer p-2 rounded-md transition-colors hover:bg-purple-600">
              <User className="w-5 h-5" />
              <span>Profile</span>
            </li>
          </Link>
          <Link to={"/posts"}>
            <li className="flex items-center space-x-3 cursor-pointer p-2 rounded-md transition-colors hover:bg-red-600">
              <FileText className="w-5 h-5" />
              <span>Posts</span>
            </li>
          </Link>
          <Link to={"/notifications"}>
            <li className="flex items-center space-x-3 cursor-pointer p-2 rounded-md transition-colors hover:bg-yellow-600">
              <Bell className="w-5 h-5" />
              <span>Notifications</span>
            </li>
          </Link>
        </ul>
      </aside>

      {/* Hero Section */}
      <header className="py-20 text-center">
        <h1 className="text-5xl font-bold mb-4 animate-fade-in">
          Welcome to Our Platform
        </h1>
        <p className="text-lg opacity-90">
          Connecting you to the best experience
        </p>
        <div className="mt-6">
          <button className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-xl text-lg shadow-xl transition-all">
            Get Started
          </button>
          <button className="ml-4 px-6 py-3 bg-transparent border border-white rounded-xl text-lg shadow-xl hover:bg-white hover:text-black transition-all">
            Learn More
          </button>
        </div>
      </header>

      {/* Main Section */}
      <main className="px-10 py-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <h2 className="text-2xl font-bold mb-2">
            Discover Stunning Features
          </h2>
          <p className="text-gray-400 mb-4">
            Explore a world of possibilities with our cutting-edge platform
            designed to simplify your life.
          </p>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md">
            Explore Now
          </button>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <h2 className="text-2xl font-bold mb-2">Join Our Community</h2>
          <p className="text-gray-400 mb-4">
            Be part of a thriving community where innovation meets
            collaboration.
          </p>
          <button className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-md">
            Join Today
          </button>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <h2 className="text-2xl font-bold mb-2">Track Your Progress</h2>
          <p className="text-gray-400 mb-4">
            Monitor your growth and achieve your goals with our intuitive tools.
          </p>
          <button className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-md">
            Start Tracking
          </button>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <h2 className="text-2xl font-bold mb-2">Stay Updated</h2>
          <p className="text-gray-400 mb-4">
            Never miss out on the latest updates and trends in the industry.
          </p>
          <button className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-md">
            Subscribe Now
          </button>
        </div>
      </main>

      {/* Login and Sign Up Buttons */}
      <div className="flex justify-center space-x-4 py-10">
        <Link
          to={"/login"}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-md transition-transform transform hover:scale-105"
        >
          Login
        </Link>
        <Link
          to={"/signup"}
          className="px-6 py-3 bg-green-600 hover:bg-green-500 text-white rounded-md transition-transform transform hover:scale-105"
        >
          Sign Up
        </Link>
      </div>

      {/* Footer Section */}
      <footer className="mt-auto py-6 text-center bg-gray-900 text-gray-400">
        <p>&copy; 2025 Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
