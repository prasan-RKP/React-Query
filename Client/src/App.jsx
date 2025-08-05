import React, { useEffect } from "react";
import HomePage from "./Pages/HomePage";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
//import Profile from "./Pages/Profile";
import { useAuthStore } from "./Store/useAuthStore";
import { Toaster } from "sonner";
import ClipLoader from "react-spinners/ClipLoader";
import Posts from "./Pages/Posts";
import Profile from "./Pages/Profile";
import ChatContainer from "./Pages/ChatContainer";
import TodoList from "./assets/TodoList";

const App = () => {
  const { authUser, isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-gray-900 to-gray-700">
        {/* Animated PNG Loader */}

        <ClipLoader color="white" size={90} />
        {/* Typing Effect for Loading Text */}
        <p className="mt-6 text-lg text-white tracking-widest animate-typing overflow-hidden border-r-4 border-white whitespace-nowrap">
          Loading... Please wait
        </p>
      </div>
    );
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/todo" element={<TodoList />} />
        <Route
          path="/login"
          element={!authUser ? <Login /> : <Navigate to={"/profile"} replace />}
        />
        <Route
          path="/signup"
          element={
            !authUser ? <Signup /> : <Navigate to={"/profile"} replace />
          }
        />
        <Route
          path="/profile"
          element={authUser ? <Profile /> : <Navigate to={"/login"} replace />}
        />

        <Route
          path="/posts"
          element={authUser ? <Posts /> : <Navigate to={"/login"} replace />}
        />

        <Route
          path="/chat"
          element={authUser ? <ChatContainer /> : <Navigate to={"/login"} replace />}
        />
      </Routes>
      <Toaster richColors position="top-right" />
    </div>
  );
};

export default App;
