import { Mail, Lock, User, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { IoMdLogIn } from "react-icons/io";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import { useAuthStore } from "../Store/useAuthStore";
import ClipLoader from 'react-spinners/ClipLoader';
const Signup = () => {
  const { signUp, isSigningIn } = useAuthStore();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    contact: "",
    password: "",
  });

  const validateForm = () => {
    if (
      !formData.username.trim() &&
      !formData.email.trim() &&
      !formData.contact &&
      !formData.password.trim()
    )
      return toast.error("please fill all your credentials");
    if (!formData.username.trim()) return toast.error("Username required");
    if (!formData.email.trim()) return toast.error("E-mail required");
    if (!formData.contact.trim()) return toast.error("contact required");
    if (!formData.password.trim()) return toast.error("password required");
    if (formData.password.trim().length < 5)
      return toast.error("password must be at least 5 character");

    if (formData.contact.trim().length < 10)
      return toast.error("contact must be at least 10 digit");

    return true;
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (validateForm() === true) {
      signUp(formData);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-10 shadow-xl bg-gray-800 border border-gray-700 rounded-2xl min-h-[650px] flex flex-col justify-center"
      >
        <div className="text-center text-white text-2xl font-semibold mb-8 flex items-center justify-center">
          Sign Up <IoMdLogIn className="ml-2" />
        </div>
        <form action="" onSubmit={onFormSubmit}>
          <div className="space-y-6">
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Username"
                className="w-full pl-10 p-3 bg-gray-700 text-white border border-gray-600 rounded focus:border-primary focus:ring-0 transition duration-200 hover:bg-gray-600 hover:scale-105"
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
            </div>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              <input
                type="email"
                placeholder="Email"
                className="w-full pl-10 p-3 bg-gray-700 text-white border border-gray-600 rounded focus:border-primary focus:ring-0 transition duration-200 hover:bg-gray-600 hover:scale-105"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Contact"
                 maxLength={10}
                className="w-full pl-10 p-3 bg-gray-700 text-white border border-gray-600 rounded focus:border-primary focus:ring-0 transition duration-200 hover:bg-gray-600 hover:scale-105"
                onChange={(e) =>
                  setFormData({ ...formData, contact: (e.target.value) })
                }
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              <input
                type="password"
                placeholder="Password"
                className="w-full pl-10 p-3 bg-gray-700 text-white border border-gray-600 rounded focus:border-primary focus:ring-0 transition duration-200 hover:bg-gray-600 hover:scale-105"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
            <div className="flex items-center justify-between text-gray-400 text-sm">
              <label className="cursor-pointer flex items-center">
                <input type="checkbox" className="checkbox checkbox-primary" />
                <span className="ml-2">Remember me</span>
              </label>
              <a href="#" className="text-blue-500 hover:underline">
                Forgot password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full p-3 bg-primary text-white rounded hover:bg-primary/80 transition-all duration-200 flex justify-center items-center gap-2"
            >
              {isSigningIn ? (
                <div className="flex items-center gap-2">
                  <ClipLoader color="white" size={20} />
                  <span>Loading...</span>
                </div>
              ) : (
                "Sign Up"
              )}
            </button>

            <p className="text-center text-sm text-gray-400">
              Already have an account?
              <Link to="/login" className="text-blue-500 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Signup;
