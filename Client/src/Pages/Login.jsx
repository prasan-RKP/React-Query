import { Mail, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { IoMdLogIn } from "react-icons/io";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import { useAuthStore } from "../Store/useAuthStore";
import ClipLoader from "react-spinners/ClipLoader";

const Login = () => {
  const { login, isLoggingIn } = useAuthStore();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const validateForm = () => {
    if (!formData.email.trim() && !formData.password.trim())
      return toast.error("Fill all your credentials");
    if (!formData.email.trim()) return toast.error("E-mail required");
    if (!formData.password.trim()) return toast.error("Password required");
    // if(!formData.password.trim().length < 5) return toast.error('password must be at least 5 character');
    if (formData.password.trim().length < 5)
      return toast.error("Password must be at least 5 characters");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm() === true) {
      login(formData);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-10 shadow-xl bg-gray-800 border border-gray-700 rounded-2xl min-h-[570px] flex flex-col justify-center"
      >
        <div className="text-center text-white text-2xl font-semibold mb-8 flex items-center justify-center">
          Login <IoMdLogIn className="ml-2" />
        </div>
        <form action="" onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full pl-10 p-3 bg-gray-700 text-white border border-gray-600 rounded focus:border-primary focus:ring-0"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full pl-10 p-3 bg-gray-700 text-white border border-gray-600 rounded focus:border-primary focus:ring-0"
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
              {isLoggingIn ? (
                <div className="flex items-center gap-2">
                  <ClipLoader color="white" size={20} />
                  <span>Loading...</span>
                </div>
              ) : (
                "LogIn"
              )}
            </button>
            <p className="text-center text-sm text-gray-400">
              Don’t have an account?
              <Link to="/signup" className="text-blue-500 hover:underline">
                SignUp
              </Link>
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
